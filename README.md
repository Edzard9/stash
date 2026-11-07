# skill-vault

**A curated warehouse of AI agent skills, from one builder's real work.**

Skills for AI agents (Claude Code, opencode, and friends), organized by
shelf: coding, design, study, video, ops, writing. Every skill here earned
its place by being used and proven, not by being collected.

> Status: under construction. The first shelves are being stocked.

## How to use a skill

Copy the skill's folder into your agent's skills directory (for example
`~/.config/opencode/skills/` for opencode, or your Claude Code skills
folder), then just ask your agent for the thing the skill does. Each skill
is self-contained: one folder, one `SKILL.md`, copy it without taking
anything else from this repo.

## Start here: vault-router

Install `skills/vault-router` alongside any other skills from this repo.
It reads your prompt, works out which vault skill the task belongs to,
and follows that skill for you, so you never need to remember skill
names. Its catalog knows every skill below; when you add a skill to your
setup, it can only route to the ones you actually installed.

## Catalog

### Video — `skills/video/`

| Skill | What it does | Proof |
|---|---|---|
| `html-video` | Turns a text brief into a rendered MP4: the agent writes one deterministic HTML animation, Playwright captures every frame, FFmpeg encodes it. No video-generation model, no quota, no region lock. | Demo in production |

### Coding — `skills/coding/`

Being stocked. First resident: a concise-code skill from the maintainer's
own daily setup.

### Design — `skills/design/`

Being stocked. First resident: a UI design skill from the maintainer's own
daily setup.

### Study — `skills/study/`

Empty shelf, waiting for its first proven skill.

### Ops — `skills/ops/`

Empty shelf, waiting for its first proven skill.

### Writing — `skills/writing/`

Empty shelf, waiting for its first proven skill.

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

Cara pakai: salin folder skill yang kamu mau ke folder skills agenmu
(misalnya `~/.config/opencode/skills/`), lalu minta saja ke agenmu. Setiap
skill berdiri sendiri: satu folder, satu `SKILL.md`.

Aturan kurasi: skill hanya masuk katalog bila ada bukti jalannya (demo,
contoh output, atau catatan uji yang jujur). Satu PR menambah satu skill.
Kalau AI membantumu menulis kontribusi, ungkapkan di deskripsi PR (agen
apa, model apa, bagaimana manusia mengujinya). Commit tanpa co-author AI.

Soal memakai skill orang lain, repo ini mengikuti empat tingkat: buatan
sendiri bebas; terinspirasi dan menulis ulang dengan kata sendiri tidak
perlu izin (tautkan sumbernya sebagai etiket); menyalin hanya dari sumber
berlisensi permisif (MIT/Apache/BSD) dengan lisensi asli dan kredit
disertakan; tanpa lisensi yang jelas, jangan salin — cukup tautkan atau
minta izin pembuatnya. Lisensi repo ini MIT.
