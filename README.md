# stash

**A curated warehouse of AI agent skills, from one builder's real work.**

Skills for AI agents (Claude Code, opencode, and friends), organized by
shelf: coding, design, study, video, ops, writing. Every skill here earned
its place by being used and proven, not by being collected.

> Status: under construction. The first shelves are being stocked.

## How to use a skill

One command, with the open [skills CLI](https://skills.sh) (it detects
your agent: opencode, Claude Code, Codex, Cursor, and 70+ more, and puts
every skill in the right place):

```
npx skills add Edzard9/stash
```

Add `-g` to install for all your projects instead of only the current
one, or take a single skill, for example
`npx skills add Edzard9/stash --skill council`. Then just ask your agent
for the thing the skill does.

Manual install works too: each skill is self-contained (one folder, one
`SKILL.md`). Clone this repo and copy the folders you want into your
agent's skills directory, `~/.config/opencode/skills` for opencode or
`~/.claude/skills` for Claude Code:

```
git clone https://github.com/Edzard9/stash
mkdir -p ~/.config/opencode/skills
cp -r stash/skills/vault-router stash/skills/council ~/.config/opencode/skills/
cp -r stash/skills/video/html-video stash/skills/coding/oss-contributor ~/.config/opencode/skills/
```

## Start here: vault-router

Install `skills/vault-router` alongside any other skills from this repo.
It reads your prompt, works out which vault skill the task belongs to,
and follows that skill for you, so you never need to remember skill
names. Its catalog knows every skill below; when you add a skill to your
setup, it can only route to the ones you actually installed.

## Also at the top level: council

`skills/council` pressure-tests a hard decision: five advisor lenses
(Skeptic, Reframer, Opportunist, Operator, Stranger) analyze independently,
cross-review each other anonymously, and a chairman delivers one verdict
with its deciding factor and flip condition; when confidence lands at
medium or better and the winner is something to build, a one-page PRD is
drafted automatically as the hand-off. Where multiple models are
callable, each lens can be a genuinely different model instead of one model
wearing five hats. Written from scratch for this repo, inspired by the LLM
Council methodology (see the credits inside the skill).

The full flow, start to finish:

```
prompt -> frame (or mini-PRD for a single idea) -> 5 independent lenses
-> anonymous cross-review -> chairman verdict + confidence
-> confidence medium/high and build-shaped? PRD drafted automatically
-> confidence low? no PRD, only the list of what to resolve first
-> PRD -> small briefs -> build piece by piece -> ship
```

The step-by-step explanation lives in `skills/council/README.md`.

**Measured, not promised** (full data, raw outputs, and the runnable
suite: [skills/council/EVIDENCE.md](skills/council/EVIDENCE.md), tests
in `tests/council/`):

- Decision discipline, 8 cases, same model with and without the skill:
  0/8 passed raw, **8/8 with the skill**, at 2.4x the decision-stage
  tokens, about 10k per decision. Comparable multi-agent systems run
  5-15x at that stage.
- Full build A/B, one real tool built both ways from the same start:
  the council + PRD arm used **35.2% fewer tokens end to end**
  (724,494 vs 1,117,504) at equal measured quality, because the
  builder needed 16 steps instead of 31.

## Catalog

### Video: `skills/video/`

| Skill | What it does | Proof |
|---|---|---|
| `html-video` | Turns a text brief into a rendered MP4: the agent writes one deterministic HTML animation, Playwright captures every frame, FFmpeg encodes it. No video-generation model, no quota, no region lock. | Demo shipped in `html-video/examples/vlan-explainer/`: the 30s VLAN explainer with prompt, animation source, GIF, and a byte-identical deterministic replay check |
| `manim-explainer` | Math and science explainers in Python Manim: concept to beats, low-quality timing pass, TeX-free scenes for small servers, frame-verified delivery. | A rendered and probe-verified concept animation (binary place value), see the skill's test notes |

### Coding: `skills/coding/`

| Skill | What it does | Proof |
|---|---|---|
| `oss-contributor` | Contribute to someone else's repo the way maintainers want: house rules first, a three-layer claim screen (assignees, every comment, related PRs open and closed), mirror the repo's own patterns, honest test reporting that separates baseline failures from regressions, clean PRs, patient follow-up. | Distilled from 11 merged PRs in two days, including a refactor a maintainer then made the enforced lint standard |
| `small-briefs` | Split a big build into small, self-contained briefs for a coding agent, run them in sequence, and verify each piece's finish line before sending the next. Batch ceilings for bulk work, supervised launches, and honest stall handling. | Born from a documented failure: 100+ tasks in one brief stalled silently, twice in a day; the same work in small briefs finished. Worked example inside, from a real five-brief video build |

| `cloudflare-worker` | Workers + D1 in the shape that survived production: route-based structure, migrations applied and probed (the "no such table" trap), secrets as secrets, defensive email parsing that decodes on intake and on read. | Distilled from grmail, a temp-mail service running in production on Workers + D1; a minimal worker built with the skill is in its examples |
| `laravel-patterns` | Laravel architecture as numbered steps: thin controllers, services and actions, scoped bindings, eager loading, form requests, one response envelope, and a verification gate. | Adapted from affaan-m/ECC (MIT); model test results in the skill's README |
| `laravel-security` | The Laravel hardening checklist: production config, token abilities, policies, the mass-assignment and raw-SQL never-dos, CSRF/XSS rules, rate limits, upload and secret hygiene. | Adapted from affaan-m/ECC (MIT); model test results in the skill's README |
| `react-patterns` | React 18/19 discipline: pure render, hooks rules, a state-location decision tree, server/client boundaries, Suspense placement, accessibility first. | Adapted from affaan-m/ECC (MIT); model test results in the skill's README |
| `nextjs-turbopack` | Next.js 16+ and Turbopack: the default dev bundler, cache behavior, slow-start diagnosis, and the proxy.ts rule reviewers keep getting wrong. | Adapted from affaan-m/ECC (MIT); model test results in the skill's README |

Still being stocked: a concise-code skill from the maintainer's own daily
setup (`lean-code`, fetched from his machine).

### Design: `skills/design/`

| Skill | What it does | Proof |
|---|---|---|
| `title-card` | Static title cards and thumbnails from HTML templates rendered to PNG, frame 0 of the same deterministic capture path html-video uses. | Three templates ship in the skill; a real card for the VLAN video was rendered and size-checked with it |

Still being stocked: a UI design skill from the maintainer's own daily
setup (`ui-craft`, fetched from his machine).

### Study: `skills/study/`

| Skill | What it does | Proof |
|---|---|---|
| `lab-report` | Practicum reports in one fixed house format: identity header, per-point observations each with a one-line "what it means", a short conclusion, the observation table, and Q&A-style evaluation answers. Never invents an observation, copies numbers exactly, and checks the draft against the rubric as text. | The format of the maintainer's real submitted practicum reports; worked example inside the skill, from a real Inter-VLAN Routing practicum |
| `net-lab` | The networking practicum companion: the module outranks every other guide, one device per short paste block, interface names in full, a validation per stage, calm at harmless paste accidents. | Distilled from accompanied sessions that closed at 0% packet loss (Inter-VLAN routing, EtherChannel UTS), including one retracted misdiagnosis recorded in its example |
| `study-notes` | Lecture material into compact notes plus question=answer flashcards, one pair per line, paste-ready for quiz tools. Works only from the material provided. | Worked example from real Jarkom II material inside the skill |
| `interactive-figure` | Single-file HTML figures a student can click, break, and watch respond, with a live readout and a reset. | A wired template plus a finished VLAN isolation figure, both click-tested headlessly; see the skill |
| `anatomy` | The isometric-figure method: explain a concept as a real physical object built from many small precise parts, four-tone shading, painter's order, a framed card with a live readout. | Universal adaptation of wheresryan22/anatomy (MIT), condensed to the method; a test figure built with it is recorded in the skill's README |
| `cisco-ios-patterns` | Cisco IOS review patterns: read-only collection, wildcard masks, ACL placement questions, interface hygiene, change-window verification. | Adapted from the ECC collection (MIT); model test results in the skill's README |

### Ops: `skills/ops/`

| Skill | What it does | Proof |
|---|---|---|
| `vps-deploy` | The house VPS pattern: one systemd unit per app, bound to the Tailscale address only, one recorded port per app, disk as desk and cloud storage as warehouse. | The pattern behind a dozen live services on the maintainer's VPS; a fresh service was deployed with it as its worked proof |
| `repo-audit` | Audit your own public repos: files plus full commit history for secret shapes, then the quiet exposures (author emails, README screenshots, issue text). | The method of a real 15-repo audit (clean on secrets, two metadata findings), summarized inside the skill |
| `homelab-vlan-segmentation` | Home network segmentation: the five-VLAN design table, trunk/access rules, SSID mapping, and the firewall rule order that makes isolation real. | Adapted from the ECC collection (MIT); model test results in the skill's README |

### Writing: `skills/writing/`

| Skill | What it does | Proof |
|---|---|---|
| `caption-craft` | Bilingual ID/EN captions and carousel text for showing work: a concrete hook, an honest middle with the numbers, a real close. No hype, no engagement bait. | A ready-to-paste launch caption set ships in the skill's examples |
| `proofread-id` | Formal Indonesian proofreading that touches language only: EYD spelling, the di- prefix traps, effective sentences, standard terms, and a grouped change list. | A real pass over this repo's own README (4 edits, applied), recorded in the skill's examples |

## The curation rule

A skill enters this catalog only with evidence it works: a demo, a sample
output, or honest test notes. One pull request adds one skill (or improves
one). If AI helped write your contribution, disclose it in the PR
description: which agent, which model, and how a human tested it. Commits
carry no AI co-authors.

## Source policy (using other people's skills)

Ideas are free; text has owners. This repo follows four tiers:

1. **Original work**: no obligations.
2. **Inspired by**: read a skill, learn its shape, write your own words.
   No permission needed. Linking the inspiration is good manners.
3. **Copied or closely adapted**: only from permissively licensed sources
   (MIT, Apache-2.0, BSD), with the original license and copyright kept
   inside the skill folder and credit plus a link in that skill's README.
   Check the source repo's LICENSE file before copying, never guess.
4. **No clear license**: do not copy. Link it in a recommendations list, or
   ask the author for written permission.

## License

MIT

---

## Bahasa Indonesia

**Kumpulan skill agen AI yang dikurasi dari pekerjaan nyata satu builder.**

Skill untuk agen AI (Claude Code, opencode, dan sejenisnya), disusun per
rak: coding, design, study, video, ops, writing. Setiap skill di sini masuk
karena sudah dipakai dan terbukti, bukan karena dikumpulkan.

Cara pakai: salin folder skill yang kamu inginkan ke folder skills agenmu
(misalnya `~/.config/opencode/skills/`), lalu minta saja ke agenmu. Setiap
skill berdiri sendiri: satu folder, satu `SKILL.md`.

Aturan kurasi: skill hanya masuk katalog bila ada bukti jalannya (demo,
contoh output, atau catatan uji yang jujur). Satu PR menambah satu skill.
Kalau AI membantumu menulis kontribusi, ungkapkan di deskripsi PR (agen
apa, model apa, bagaimana manusia mengujinya). Commit ditulis tanpa co-author AI.

Terkait penggunaan skill orang lain, repo ini mengikuti empat tingkat ketentuan: buatan
sendiri bebas; terinspirasi dan menulis ulang dengan kata sendiri tidak
perlu izin (tautkan sumbernya sebagai bentuk atribusi); menyalin hanya dari sumber
berlisensi permisif (MIT/Apache/BSD) dengan lisensi asli dan kredit
disertakan; tanpa lisensi yang jelas, jangan salin, cukup tautkan atau
minta izin pembuatnya. Lisensi repo ini MIT.
