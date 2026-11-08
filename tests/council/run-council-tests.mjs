#!/usr/bin/env node
// Council skill end-to-end test harness.
//
// Runs standardized decision cases through the council SKILL.md on a real
// model (direct OpenAI-compatible calls, e.g. 9Router), then scores the
// outputs structurally: form choice (lite/full/refuse), verdict anatomy
// (confidence, deciding factor, flip condition), and the PRD gate
// (PRD present exactly when it should be). Also sums token usage per case
// from the API responses, so the run doubles as the token measurement.
//
// Usage (key stays in env, never in this file):
//   NINEROUTER_KEY=<key> node tests/run-council-tests.mjs
//   NINEROUTER_KEY=<key> node tests/run-council-tests.mjs --ab
// Optional env:
//   NINEROUTER_BASE  default http://100.76.240.40:3780/v1
//   MODEL            default 9router-style id rvr/zai-org/GLM-5.3-Flash
//   ONLY             comma-separated case ids to run a subset, e.g. ONLY=1,4
//
// --ab mode: every case runs TWICE, once with no skill installed (raw
// prompt, the baseline) and once with the council skill as system prompt.
// The report then compares tokens and structural scores side by side:
// what the skill costs at decision time, and what it buys (form choice,
// verdict anatomy, PRD artifact). Project-level build savings (PRD reuse
// across briefs) are NOT captured by single calls; read the README notes
// in the report before quoting percentages.
//
// Output: console table + tests/results-<date>.md report.
// Structural checks are heuristics; borderline verdicts still need a human
// read. The report keeps the full raw outputs for that read.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.NINEROUTER_BASE || "http://100.76.240.40:3780/v1";
const KEY = process.env.NINEROUTER_KEY || "";
const MODEL = process.env.MODEL || "rvr/zai-org/GLM-5.3-Flash";

if (!KEY) {
  console.error("NINEROUTER_KEY is not set. Export the 9Router API key first.");
  process.exit(1);
}

const skill = readFileSync(`${here}/../../skills/council/SKILL.md`, "utf8");

// expect: { form: "refuse"|"lite"|"full"|"any", prd: "yes"|"no"|"either" }
const CASES = [
  {
    id: 1,
    name: "Factual lookup must be refused",
    prompt: "What is the capital of France?",
    expect: { form: "refuse", prd: "no" },
  },
  {
    id: 2,
    name: "Cheap reversible choice runs lite",
    prompt:
      "For my class notes tomorrow, should I write summaries as bullet points or as short paragraphs? I can switch any time.",
    expect: { form: "lite", prd: "no" },
  },
  {
    id: 3,
    name: "Small reversible build runs lite, PRD allowed",
    prompt:
      "Should I add a dark-mode toggle to my small static portfolio page? It is a weekend-sized change and easy to remove later. Decide for me.",
    expect: { form: "lite", prd: "either" },
  },
  {
    id: 4,
    name: "High-stakes time commitment runs full",
    prompt:
      "I have exactly 3 free weeks before the new semester. Should I spend them building a brand-new SaaS tool from scratch, or contributing to open source to strengthen my portfolio for internships? This decides my whole break.",
    expect: { form: "full", prd: "no" },
  },
  {
    id: 5,
    name: "Build-shaped money decision runs full and produces a PRD",
    prompt:
      "Decide the monetization for my free web-tools site: freemium (some tools paid) versus a one-time unlock for all tools. Whichever wins, I will build it next month, so spec it.",
    expect: { form: "full", prd: "yes" },
  },
  {
    id: 6,
    name: "Single product idea: mini-PRD frame, then council",
    prompt:
      "Pressure-test my product idea: an app that reminds university students about assignment deadlines through WhatsApp messages, with a small dashboard for lecturers.",
    expect: { form: "any", prd: "either" },
  },
  {
    id: 7,
    name: "Pricing decision: verdict only, no PRD",
    prompt:
      "I freelance landing pages for local shops. Should I price a package at 300k or 500k IDR? I need the call today.",
    expect: { form: "any", prd: "no" },
  },
  {
    id: 8,
    name: "Missing key fact: one question or labeled assumptions",
    prompt:
      "Should I migrate my project from a VPS to a big cloud provider? Decide.",
    expect: { form: "any", prd: "no" },
  },
];

const only = (process.env.ONLY || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map(Number);
const cases = only.length ? CASES.filter((c) => only.includes(c.id)) : CASES;

const AB = process.argv.includes("--ab");

// Tolerant completion parser. Some router routes return clean JSON; under
// load the same route has been seen returning concatenated chunk objects.
// Recover the content either way instead of dying on JSON.parse.
function parseCompletion(raw) {
  try {
    const d = JSON.parse(raw);
    return {
      text: d.choices?.[0]?.message?.content || "",
      usage: d.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    };
  } catch { /* fall through to the object scanner */ }
  let text = "", usage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
  let i = 0;
  while (i < raw.length) {
    const start = raw.indexOf("{", i);
    if (start < 0) break;
    let depth = 0, inStr = false, esc = false, end = -1;
    for (let j = start; j < raw.length; j++) {
      const c = raw[j];
      if (esc) { esc = false; continue; }
      if (c === "\\") { esc = true; continue; }
      if (c === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (c === "{") depth++;
      if (c === "}" && --depth === 0) { end = j; break; }
    }
    if (end < 0) break;
    try {
      const o = JSON.parse(raw.slice(start, end + 1));
      const ch = o.choices?.[0];
      if (ch?.delta?.content) text += ch.delta.content;
      if (ch?.message?.content) text = ch.message.content;
      if (o.usage) usage = o.usage;
    } catch { /* not a JSON object, keep scanning */ }
    i = end + 1;
  }
  return { text, usage };
}

async function callModelRaw(userPrompt, withSkill) {
  const messages = [];
  if (withSkill) {
    messages.push({
      role: "system",
      content:
        "You are an agent that has the following skill installed. Follow it exactly for the user request that follows.\n\n" +
        skill,
    });
  }
  messages.push({ role: "user", content: userPrompt });
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({ model: MODEL, stream: false, messages }),
    signal: AbortSignal.timeout(300_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return parseCompletion(await res.text());
}

async function callModel(userPrompt, withSkill) {
  const r = await callModelRaw(userPrompt, withSkill);
  if (r.text.trim()) return r;
  // Reasoning models sometimes spend the whole budget thinking and return
  // empty visible content. One retry is honest; two empties is a result.
  console.log("  (jawaban kosong, retry 1x)");
  return callModelRaw(userPrompt, withSkill);
}

const has = (text, re) => re.test(text);
const checks = {
  announcesForm: (t) =>
    has(t, /\b(lite|full)\s+council\b/i) || has(t, /dewan\s+(ringan|penuh)/i),
  pickedLite: (t) => has(t, /\blite\b/i) && !has(t, /\bfull council\b/i),
  pickedFull: (t) => has(t, /\bfull\b/i) || has(t, /all five|kelima lensa/i),
  refused: (t) =>
    has(t, /not a council|bukan (urusan|untuk) dewan|no council needed|tidak perlu dewan|just answer|langsung saja/i),
  hasConfidence: (t) =>
    has(t, /confidence/i) && has(t, /\b(low|medium|high)\b/i),
  hasDecidingFactor: (t) => has(t, /deciding factor|faktor penentu/i),
  hasFlip: (t) => has(t, /flip condition|would flip|berbalik jika|syarat berbalik/i),
  hasPRD: (t) =>
    has(t, /scope in/i) && has(t, /scope out/i) && has(t, /success criteria/i),
  asksOrAssumes: (t) =>
    has(t, /\?\s*$/m) || has(t, /assumption|asumsi/i),
};

function score(c, text) {
  const r = {};
  r.announcesForm = checks.announcesForm(text) || checks.refused(text);
  r.verdictAnatomy =
    checks.hasConfidence(text) && checks.hasDecidingFactor(text) && checks.hasFlip(text);
  const prd = checks.hasPRD(text);
  r.prdGate =
    c.expect.prd === "either" ? true : c.expect.prd === "yes" ? prd : !prd;
  if (c.expect.form === "refuse") r.form = checks.refused(text);
  else if (c.expect.form === "lite") r.form = checks.pickedLite(text);
  else if (c.expect.form === "full") r.form = checks.pickedFull(text);
  else r.form = true;
  if (c.id === 8) r.verdictAnatomy = checks.asksOrAssumes(text) || r.verdictAnatomy;
  r.pass = r.announcesForm && r.form && r.prdGate && (c.expect.form === "refuse" ? true : r.verdictAnatomy);
  return r;
}

const today = new Date().toISOString().slice(0, 10);
mkdirSync(`${here}/results`, { recursive: true });
let report = `# Council test run — ${today}\n\nModel: ${MODEL} via ${BASE}\nCases: ${cases.length}\nMode: ${AB ? "A/B (raw baseline vs with-skill)" : "with-skill only"}\n\n`;
const totals = { raw: 0, skill: 0 };
const passes = { raw: 0, skill: 0 };
const runs = { raw: 0, skill: 0 };

async function runOne(c, mode) {
  const withSkill = mode === "skill";
  const { text, usage } = await callModel(c.prompt, withSkill);
  const r = score(c, text);
  totals[mode] += usage.total_tokens || 0;
  runs[mode]++;
  if (r.pass) passes[mode]++;
  report += `### Case ${c.id} [${mode}] — ${c.name}\n\nExpect: form=${c.expect.form}, prd=${c.expect.prd}\nResult: announce=${r.announcesForm}, form=${r.form}, anatomy=${r.verdictAnatomy}, prdGate=${r.prdGate} -> ${r.pass ? "PASS" : "NEEDS REVIEW"}\nTokens: prompt ${usage.prompt_tokens}, completion ${usage.completion_tokens}, total ${usage.total_tokens}\n\n<details><summary>Raw output</summary>\n\n${text}\n\n</details>\n\n`;
  return { r, usage };
}

for (const c of cases) {
  if (AB) {
    process.stdout.write(`Case ${c.id}: ${c.name} [raw] ... `);
    try {
      const a = await runOne(c, "raw");
      console.log(`${a.r.pass ? "PASS" : "CHECK"} (${a.usage.total_tokens || 0} tok)`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      report += `### Case ${c.id} [raw]\n\nERROR: ${e.message}\n\n`;
    }
  }
  process.stdout.write(`Case ${c.id}: ${c.name} [skill] ... `);
  try {
    const b = await runOne(c, "skill");
    console.log(`${b.r.pass ? "PASS" : "CHECK"} (${b.usage.total_tokens || 0} tok)`);
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    report += `### Case ${c.id} [skill]\n\nERROR: ${e.message}\n\n`;
  }
}

if (AB) {
  const delta =
    totals.raw > 0
      ? (((totals.skill - totals.raw) / totals.raw) * 100).toFixed(1)
      : "n/a";
  report += `\n## A/B summary\n\n| Mode | Auto-passed | Total tokens |\n|---|---|---|\n| raw (no skill) | ${passes.raw}/${runs.raw} | ${totals.raw} |\n| with council skill | ${passes.skill}/${runs.skill} | ${totals.skill} |\n\nSkill mode token delta vs raw at decision time: ${delta}%.\n\nReading this honestly: the skill SPENDS more tokens on the decision itself (five lenses, review, verdict, sometimes a PRD) and buys structure, consistency, and a reusable PRD artifact. The saving this repo claims lives downstream, across the build (PRD reused by small briefs instead of re-explaining in long sessions), which single calls cannot measure. Do not quote the delta above as the project-level figure.\n`;
  console.log(
    `\nA/B: raw ${passes.raw}/${runs.raw} passed, ${totals.raw} tokens | skill ${passes.skill}/${runs.skill} passed, ${totals.skill} tokens (delta ${delta}%).`
  );
} else {
  report += `\n**Summary: ${passes.skill}/${runs.skill} auto-passed. Total tokens: ${totals.skill}.**\n`;
  console.log(`\n${passes.skill}/${runs.skill} auto-passed. Total tokens: ${totals.skill}.`);
}
const out = `${here}/results/council-${today}${AB ? "-ab" : ""}.md`;
writeFileSync(out, report);
console.log(`Report written to ${out} (raw outputs inside, for the human read).`);
