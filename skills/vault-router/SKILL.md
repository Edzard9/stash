---
name: vault-router
description: Entry point for the skill-vault collection. Use FIRST whenever a user makes a task request and any skill-vault skills are installed: read the request, analyze what the actual task and deliverable are, then route to the one matching vault skill and follow it. Also use when the user asks which skill can do something, or when a request does not obviously belong to any single skill.
license: MIT
---

# Vault Router

You are the front door of the skill-vault. The user should never have to
know skill names. They describe what they want; you figure out which vault
skill does it, load that skill, and follow it.

## How to route

1. **Read the whole request first.** Identify the task by its verb, its
   object, and above all its final deliverable (a file, a video, a PR, a
   deployed service). The deliverable is the strongest routing signal,
   stronger than any single keyword.
2. **Match against the catalog below.** Each row lists a skill, what it
   produces, and typical signal phrases in English and Indonesian.
3. **Check it is actually installed.** Route only to skills present in the
   current environment (your available-skills list, or sibling folders in
   the skills directory). The catalog lists the whole vault; the user may
   have installed only some of it.
4. **Load and follow.** Open the matched skill's `SKILL.md` in full and do
   the task by its instructions. Tell the user in one short line which
   skill you picked, for example: "Routing to lab-report for this."
5. **Stay in the routed skill** until the task is done or it clearly hands
   off to another one.

## Catalog

| Skill | Produces | Signals (EN / ID) |
|---|---|---|
| `lean-code` | Code written or refactored to be concise | code, refactor, clean up / rapikan kode, bikin ringkas |
| `oss-contributor` | A contribution to someone else's repo: screened claim, PR, disclosure | contribute, external PR, good first issue / kontribusi, klaim issue, PR ke repo orang |
| `small-briefs` | A big build split into small verified briefs for a coding agent | break this down, briefs / pecah tugas, delegasikan, brief untuk opencode |
| `cloudflare-worker` | Cloudflare Workers + D1 apps and fixes | cloudflare, wrangler, D1, worker / deploy worker, migrasi D1 |
| `ui-craft` | UI and interface design work | design, UI, layout, landing page / desain tampilan, bikin UI |
| `title-card` | Title cards and thumbnails as PNG images | thumbnail, title card, cover image / thumbnail, cover video |
| `lab-report` | A practicum report in the owner's house format | lab report, practicum / laporan praktikum, hasil pengamatan |
| `interactive-figure` | A clickable HTML figure for a study concept | interactive diagram, simulation / figur interaktif, diagram bisa diklik, simulasi konsep |
| `net-lab` | Networking lab configs and validation, module-faithful | VLAN, routing, Packet Tracer, subnet / jarkom, konfigurasi switch, praktikum jaringan |
| `study-notes` | Study notes and flashcards from slides or PDFs | summarize, flashcards, notes / rangkum materi, catatan belajar, flashcard |
| `html-video` | A rendered MP4 video from a text brief | video, MP4, shorts, reels, explainer / buatkan video, video penjelasan |
| `manim-explainer` | Math and science animations in Manim | manim, math animation / animasi matematika, animasi rumus |
| `vps-deploy` | An app deployed to a VPS: systemd, Tailscale-only, preview | deploy, VPS, server, systemd / deploy ke VPS, online-kan, pasang di server |
| `repo-audit` | A security audit of the user's own public repos | audit my repos, leaked secrets / audit repo, cek kebocoran, secret bocor |
| `caption-craft` | Social media captions and carousel text, ID/EN | caption, carousel, post text / caption IG, teks carousel |
| `proofread-id` | Formal Indonesian proofreading | proofread, spelling / cek ejaan, rapikan bahasa, periksa tulisan |

## Edge cases

- **Two skills fit.** Route to the one that owns the FINAL deliverable as
  primary; use the other as a supporting reference and say so in one line.
  Example: "a VLAN explainer video" routes to `html-video` (deliverable:
  MP4) with `net-lab` consulted for technical correctness. "Deploy my
  Workers app" routes to `cloudflare-worker` for the app and `vps-deploy`
  only if a server is actually involved.
- **Interactive figure vs video.** If the user wants to click and explore,
  it is `interactive-figure`. If they want a file that plays, it is
  `html-video` or `manim-explainer`. When genuinely ambiguous, this is the
  one case worth a single short question.
- **The right skill is not installed.** Do not invent it and do not fake
  its workflow. Name the skill, point to its path in the skill-vault repo,
  and either use the closest installed skill or do the task unaided,
  saying which you are doing.
- **Nothing matches.** Say plainly that the vault has no skill for this
  yet. Do the task normally if you can. If the request smells repeatable,
  close by suggesting it as a new vault skill: a name (English, cool,
  simple), its shelf, and one line on what it would do. The vault grows
  exactly this way.
- **The user names a skill directly.** Skip routing and follow it.

## What not to do

- Do not route based on one keyword while ignoring the deliverable.
- Do not load two full skills "just in case"; route, then chain only on a
  real hand-off.
- Do not mention this router's mechanics at length. One routing line to
  the user is enough; then get to work.

## Maintaining this file

When a skill is added to or removed from the vault, add or remove its row
in the catalog above in the same change. A router pointing at skills that
do not exist is worse than no router.
