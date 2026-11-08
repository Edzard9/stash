// One council run: system = council SKILL.md, user = prompt file.
// Streams the response (long generations fail non-streamed on this
// gateway: first-byte timeout). Assembles content + usage from chunks.
// Usage: NINEROUTER_KEY=... MODEL=... node council-once.mjs <skill.md> <prompt.txt> <out.md>
import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.env.NINEROUTER_BASE || "http://100.76.240.40:3780/v1";
const MODEL = process.env.MODEL || "rvr/zai-org/GLM-5.3-Flash";
const KEY = process.env.NINEROUTER_KEY;
const [skillPath, promptPath, outPath] = process.argv.slice(2);

const messages = [
  {
    role: "system",
    content:
      "You are an agent that has the following skill installed. Follow it exactly for the user request that follows.\n\n" +
      readFileSync(skillPath, "utf8"),
  },
  { role: "user", content: readFileSync(promptPath, "utf8") },
];

async function attempt() {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: MODEL, stream: true, messages }),
    signal: AbortSignal.timeout(600_000),
  });
  if (!res.ok) {
    console.log("HTTP", res.status, (await res.text()).slice(0, 200));
    return { text: "", usage: null };
  }
  const raw = await res.text();
  let text = "";
  let usage = null;
  for (const line of raw.split("\n")) {
    const s = line.trim();
    if (!s.startsWith("data:")) continue;
    const payload = s.slice(5).trim();
    if (payload === "[DONE]") continue;
    try {
      const o = JSON.parse(payload);
      const ch = o?.choices?.[0];
      if (ch?.delta?.content) text += ch.delta.content;
      if (ch?.message?.content) text = ch.message.content;
      if (o.usage) usage = o.usage;
    } catch { /* keep scanning */ }
  }
  return { text, usage };
}

let out = { text: "", usage: null };
for (let i = 1; i <= 3 && !out.text; i++) {
  out = await attempt();
  console.log(`attempt ${i}: chars ${out.text.length}`);
  if (!out.text && i < 3) await new Promise((r) => setTimeout(r, 8000));
}
writeFileSync(outPath, out.text);
console.log("usage:", JSON.stringify(out.usage), "chars:", out.text.length);
