# Build A/B: raw brief vs council + PRD (8 Nov 2026)

Does the council's decision-stage cost pay for itself downstream? One
real task, built twice from the same repo snapshot, same model
(GLM-5.3-Flash via 9Router), same builder (opencode), serial runs.

**Task:** PerkakasID issue #2, Kalkulator IPK dan SKS (GPA calculator,
tool id `kalkulator-ipk`, category `kuliah`) — dynamic course rows,
grade scale A=4..E=0, live GPA, optional cumulative mode from previous
GPA + previous credits, bilingual, no dependencies.

- **Arm A (raw):** opencode received the issue text verbatim plus
  "follow CONTRIBUTING.md". Nothing else.
- **Arm B (skill chain):** one council run on the build decisions
  (verdict: build as written, confidence high, four rulings, PRD with
  two counting rules and test vectors), then opencode received the
  verdict + PRD as its only brief.

Costs are prompt+completion tokens summed from the 9Router
usageHistory rows inside each arm's window (the gateway's `tokens`
column was empty; the council call's usage was gateway-estimated).

| | Arm A (raw) | Arm B (council + PRD) |
|---|---|---|
| Council | 0 | 23,134 tok (1 call) |
| Build | 1,117,504 tok (31 calls) | 701,360 tok (16 calls) |
| Fix rounds needed | 0 | 0 |
| **Total** | **1,117,504** | **724,494** |
| Build wall time | 270 s | 195 s (+ ~120 s council) |

**Net: arm B used 393,010 fewer tokens (−35.2%)** for the same
deliverable. The saving came from step count, not step size: 16 build
calls against 31. With the approach pinned (structure mirroring an
existing tool, counting rules, scope-out list), the builder went
nearly straight-line instead of exploring and iterating.

## Quality: same 10-point checklist, same vectors, both arms

Checklist written before any build (see CHECKLIST.md). Functional
vectors driven in a headless browser against each arm's own DOM.

| # | Check | A | B |
|---|---|---|---|
| 1 | Registers id/kategori/fields | pass | pass |
| 2 | index.html + sw.js BERKAS + cache bump | pass (v4) | partial: registered, cache NOT bumped (stayed v3) |
| 3 | (3 SKS A) + (2 SKS B) = 3.60 | pass | pass ("3,60", ID locale) |
| 4 | Real-time updates | pass | pass |
| 5 | Add/remove rows | pass | pass |
| 6 | Cumulative 40 @ 3.00 + above = 3.07 | pass | pass |
| 7 | No NaN in empty state | pass | pass |
| 8 | EN language switch re-labels | pass | pass |
| 9 | AB = 3.5 (single row = 3.50); BC = 2.5 in code | pass | pass |
| 10 | No console errors; no em-dash | pass | pass |

Neither arm fell into the overbuild trap the issue invites (no
semester storage or history was built by either). Arm B's single miss
is housekeeping: the PRD never mentioned the cache-version bump and
the builder did not invent it.

## Caveats

- One task, one run per arm, one model. Agentic build cost varies
  between runs; treat −35% as a first measurement, not a constant.
- The task is small and its issue text is unusually complete. The
  expected council advantage grows with ambiguity; it may vanish for
  trivial tasks (which is what the lite form and the convening bar
  exist for).
- Infra note: during this experiment the gateway began refusing long
  non-streamed generations (HTTP 503, first-byte timeout) while
  streamed calls and short calls kept working. The council call was
  therefore made with streaming enabled; prompts and model unchanged.
