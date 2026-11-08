# Council: before/after evidence

Honest test notes for the `council` skill, from its first full test day.
Every number below comes from real API usage fields and saved raw
outputs, not estimates. Where a checker was too naive, that is said.

- **When:** 8 Nov 2026
- **Where:** the maintainer's VPS, through his 9Router instance
- **Suite:** 8 fixed cases (factual refusal, lite choice, lite build,
  full commitment, full build + PRD, single-idea mini-PRD, pricing with
  PRD forbidden, missing-fact question)
- **Scoring:** structural auto-checks per case (announced form, lens
  form, verdict anatomy, PRD gate), then a human read of every case the
  auto-checker left undecided

## The headline: same model, with and without the skill

GLM-5.3-Flash, all 8 cases, run serially:

| Mode | Auto-passed | Human-judged | Total tokens |
|---|---|---|---|
| No skill (raw) | 0/8 | 0/8 | 30,276 |
| With council skill | 5/8 | **6/8** | 74,266 |

The raw mode answered every case; it passed nothing, because the checks
measure the skill's discipline (announcing a form, framing, labeled
assumptions, verdict anatomy, the PRD gate), and free-form prose has
none of it. The skill costs +145% tokens at decision time. That buys
structure and a reusable PRD; the claimed saving lives downstream in
the build and is NOT measured by these single calls.

## Side by side: case 7, pricing (PRD forbidden)

**Without the skill** (complete answer, 3,356 tokens):

> **500k.**
> - 300k (~$19) dies on revisions + WhatsApp back-and-forth, you'll be
>   working below minimum wage. 500k is still impulse-buy cheap for a
>   shop owner.
> - Price is a quality signal. Local shops read 300k as "template dump."
> - If they hesitate: don't cut the price, add value...

Good advice, no frame, no stated assumptions, no confidence, no flip
condition. Nothing to audit.

**With the skill** (lite council announced, excerpt):

> Running the **lite council** for this, small money, and your price is
> reversible with the next client.
> **Frame:** Price one landing-page package for local shops at 300k or
> 500k IDR... Assumptions (marked, not knowns): a typical page takes
> ~5 hours of your time; package contents, your portfolio strength, and
> which type of shop is calling are unknown.
> **The Skeptic** — Verdict: 500k, reluctantly. ... Flip condition: if
> contents are genuinely ~2 hours, 300k is fair.
> **The Reframer** — Verdict: you're deciding the wrong thing; 300 vs
> 500 is two different customers...

Same recommendation, reached auditable: the assumptions are on the
table, two lenses disagree productively, and the verdict carries the
conditions under which it flips.

## Side by side: case 1, a fact ("What is the capital of France?")

- Without: `Paris.`
- With: `Paris.` plus one line: "No council needed, this is a fact
  lookup, not a decision."

Both correct. The skill's contribution is that the routing decision is
explicit instead of silent.

## Per-case results, skill mode (GLM)

| # | Case | Auto | Human verdict |
|---|---|---|---|
| 1 | Factual lookup refused | PASS | PASS |
| 2 | Cheap reversible runs lite | PASS | PASS |
| 3 | Small build runs lite, PRD allowed | review | **FAIL: decided directly, no lite council ran** |
| 4 | High-stakes commitment runs full, no PRD | review | **FAIL: superb full council, but a PRD was produced anyway** |
| 5 | Build + money runs full, PRD required | PASS | PASS |
| 6 | Single idea: mini-PRD frame | PASS | PASS |
| 7 | Pricing: verdict only, no PRD | PASS | PASS |
| 8 | Missing fact: one question or labeled assumptions | review | PASS (asked exactly one question, assumptions labeled; the auto-checker's announcement regex was too rigid) |

Both failures were discipline failures, not reasoning failures, and
each produced one exact fix to this SKILL.md:

1. Case 3 fix, added to Forms: **"The floor: lite is the minimum, never
   zero... 'Cheap to reverse' argues for lite, never for skipping the
   council and deciding directly."**
2. Case 4 fix, added to Step 5: build-shaped narrowed to "a product or
   feature that will be built and shipped", plus **"A plan of work is
   not build-shaped"** (contributing to open source, study plans,
   schedules get no PRD).

## Regression after the fixes

The identical suite, re-run the same day against the fixed SKILL.md
(same model, same route, serial):

| Run | Raw mode | Skill mode | Skill tokens |
|---|---|---|---|
| Before the fixes | 0/8 auto (30,276 tok) | 5/8 auto, 6/8 human | 74,266 |
| After the fixes | 0/8 auto (32,569 tok) | **8/8 auto** | 79,703 |

The two repaired cases, in the model's own words this time:

- **Case 3** now opens: "Running the **lite council** for this, cheap
  to reverse, two similar options, so Skeptic / Reframer / Operator
  only, no cross-review," followed by a labeled frame. The floor held.
- **Case 4** now closes its verdict with: "**PRD gate:** withheld. The
  verdict is a work plan, a time-allocation and collaboration
  commitment, which gets no PRD by rule," and offers a "Checklist
  follows, not a PRD." The narrowed build definition held, and the
  model cited the rule while applying it.

Both passes were spot-checked by a human read of the raw outputs, not
just the auto-checker.

## Cross-model notes (same day)

- **Gemini 2.5 Flash** (via the clv route): completed all 8 cases,
  3/8 auto-passed, 63,183 tokens.
- **Multi-model council** (five lenses as five different models, plus
  anonymous cross-review, GLM chairman): all 11 calls succeeded,
  50,241 tokens total for one full council. The chairman stage first
  returned empty (reasoning budget), then, re-run alone from the saved
  analyses, produced a complete verdict with confidence HIGH and the
  PRD correctly withheld (the winning action was a paste, not a build).
- Four models routed through one provider connection (DeepSeek, Kimi,
  Qwen, MiniMax) could not be measured: the connection itself timed out
  repeatedly, even serially. Their partial numbers are route failures,
  not model scores, and are not quoted here as results.

## Same tokens, leaner text: a compression experiment

Question asked the same day: can the skill get the same quality for
fewer tokens by compressing its own text (23% fewer words), capping
each lens at ~120 words, frame-only inputs, explicit token budgets, a
convergence exit, and one worked example? A prototype was written and
run on cases 3 and 5, same model, same route:

| Case | Current skill | Lean prototype | Quality |
|---|---|---|---|
| 3 (lite) | 11,489 tok, PASS | 11,314 tok | Substance PASS (the form was announced as "Council: lite form", which the announcement regex did not match) |
| 5 (full + PRD) | 12,654 tok, PASS | 13,039 tok, PASS | PASS, PRD produced, gate reasoning intact |
| Total | 24,143 | 24,353 (+0.9%) | Held |

Findings, stated plainly:

- Prompt tokens fell exactly as designed (about 470 per call, the
  shorter skill text). Completion tokens rose by roughly the same
  amount. In single-call mode the spend is dominated by the model's
  own generation, which varies more between runs than the saving.
- **Compressing the instructions did not save tokens.** Quality per
  token held, which is worth something, but no honest saving can be
  claimed from this lever in this mode.
- The two levers that could still cut real spend remain UNTESTED:
  multi-call mode, where frame-only inputs and the convergence exit
  remove whole calls (the 50,241-token council above is the target),
  and the downstream build, where a pinned PRD is supposed to prevent
  wrong-direction building.

## What this does not prove

- No downstream saving is measured; that needs a real project run with
  and without the full chain (council, PRD, small briefs, build).
- One run per case per model. Variance exists; treat scores as a first
  reading, not a ranking.
