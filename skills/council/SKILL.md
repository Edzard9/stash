---
name: council
description: Pressure-test a hard decision before committing to it. Use when the user faces a real choice with stakes (pick a stack, launch or kill a project, pricing, a pivot, a big purchase, two credible options) and asks to decide, compare options, get a second opinion, or says "council this", "pressure-test this", "should I X or Y", "which one should I pick", "help me decide", "aku harus pilih yang mana", "minta pendapat kedua", "uji keputusanku". Five advisor lenses analyze independently, cross-review each other anonymously, and a chairman delivers one synthesized verdict. When the verdict's confidence is medium or high and the winning option is something to build, it then drafts a one-page PRD automatically; on low confidence it withholds the PRD and names what must be resolved first. Do NOT use for factual questions, lookups, writing tasks, summaries, or choices with one obviously right answer.
license: MIT
---

# Council

One mind answering its own question has one blind spot: itself. This skill
convenes five advisors that think in deliberately clashing ways, keeps them
independent so they cannot herd, lets them attack each other's reasoning,
and ends with a single verdict you can act on.

## When to convene (and when not to)

Convene only when ALL of these hold:

- There is a genuine decision with at least two credible options.
- Being wrong costs something real: money, weeks of work, reputation.
- The user wants judgment, not information or production.

Refuse politely, and just answer or do the task directly, when the request
is a fact lookup, a summary, a writing/creation task, or a choice whose
answer is already determined by a constraint the user stated.

## The five lenses

Each advisor is a thinking style, not a persona. Keep all five; their
tension is the point.

1. **The Skeptic**, assumes the plan has a fatal flaw and hunts for it.
   Asks the questions the user is avoiding. Not a pessimist: the friend who
   stops a bad deal.
2. **The Reframer**, ignores the surface question and asks what problem is
   actually being solved. Strips assumptions, rebuilds from the ground.
   Its best output is often "you are deciding the wrong thing."
3. **The Opportunist**, hunts upside the others miss: the bigger version,
   the adjacent win, the undervalued option. Does not weigh risk; that is
   the Skeptic's job.
4. **The Operator**, execution reality only: real cost, real time, skills
   on hand, reversibility. A brilliant plan you cannot finish this month
   scores low here.
5. **The Stranger**, knows none of the history and asks the plain
   questions an outsider asks in the first five minutes. Catches the
   assumptions everyone inside the project stopped seeing.

## Procedure

### Step 1 (core): Frame the decision

Write a frame of at most six lines: the decision in one sentence, the
options, the hard constraints, what is at stake, and the deadline if any.
If one missing fact would change every answer, ask the user exactly one
question before continuing. Otherwise proceed on stated assumptions and
label them as assumptions.

Single-idea case: if the user brings ONE product idea to pressure-test
rather than competing options, do not debate the abstraction. First draft
a one-page mini-PRD as the frame artifact (problem, target user, scope in,
scope out, core features, constraints, success criteria), then run the
council on that PRD: the options become "ship as written", "ship smaller",
and "do not build", and every lens attacks the document's specifics.

### Step 2 (core): Independent analysis

Each lens analyzes the frame WITHOUT seeing the other lenses' work.
Independence is not decoration: advisors who read each other first produce
one opinion wearing five hats.

Two modes, use the best one your environment supports:

- **Multi-model mode (preferred when you can call other models):** assign
  each lens to a different model. Fast, cheap model tiers are fine for
  advisors; diversity of models matters more than raw power. Reserve the
  strongest available model for the chairman in step 4.
- **Single-model mode (fallback):** run the lenses one at a time, in the
  order above, discarding the previous lens's conclusions before starting
  the next. State in the final output which mode was used.

Every advisor returns the same shape, at most ~250 words:

- **Verdict:** one line, a clear leaning.
- **Strongest points:** the 3 best arguments from this lens.
- **Biggest risk:** the one failure this lens fears most.
- **Flip condition:** what evidence would change this verdict.

### Step 3 (optional, recommended): Anonymous cross-review

Strip the lens names; label the five analyses A through E. Each advisor
(or the chairman wearing each lens, in single-model mode) reviews the set:
which argument is strongest, which is weakest or factually shaky, and
where two advisors are talking past each other. One short paragraph per
reviewer is enough.

Skip this step only when the user asks for a fast answer; say that you
skipped it.

### Step 4 (core): The chairman's verdict

Synthesize. Do not average votes and do not crown the majority; weigh the
arguments. The verdict must contain:

- **Where they agree**, the closest thing to ground truth you have.
- **Where they clash**, name the real disagreement, not a summary of all
  five.
- **Recommendation**, one option, stated plainly, with a confidence level
  (low / medium / high) that the evidence honestly supports.
- **The deciding factor**, the single argument that tipped it.
- **Flip condition**, what would have to be true for the other option to
  win.
- **Next step**, one concrete action the user can take now.

Close with one disclosure line: the mode used and, in multi-model mode,
which models sat as advisors and chairman.

### Step 5 (core): PRD hand-off

A verdict that stays in the chat evaporates. Convert it:

- **Confidence medium or high, and the winning option is something to
  build** (a product or feature that will be built and shipped):
  immediately draft the PRD, without waiting to be asked. One page, no more. Sections: Problem,
  Target user, Decision recap (the verdict, the deciding factor, the flip
  condition), Scope in, Scope out, Core features (numbered, at most 7),
  Constraints, Success criteria. In the single-idea case this step REVISES
  the mini-PRD from step 1 into its final form instead of starting over.
- **Confidence low:** do NOT draft a PRD. End with the short list of what
  must be resolved or learned before the decision can carry one. A PRD
  built on a shaky verdict is fiction with headings.
- **Not build-shaped** (pricing, timing, positioning, a pivot call):
  skip the PRD, say so in one line, and let the verdict plus its next
  step be the deliverable.
- **A plan of work is not build-shaped.** Contributing to open source, a
  study plan, a schedule, a learning or hiring commitment: these are
  projects in the loose sense, but nothing is being built and shipped,
  so they get NO PRD. The verdict's next step may carry a plain
  checklist of actions; never label it a PRD or a PRD hand-off.

### After the PRD: where the chain continues

The PRD is a document, not a product. When the user wants to proceed, the
natural continuation is: break the PRD into small, ordered build briefs
(the vault's `small-briefs` skill exists for exactly this), build piece by
piece with verification per piece, then ship. Offer that hand-off in one
line at the end; do not start building unasked.

## Guardrails

- Never invent facts to fill the frame. Mark unknowns as unknowns; if the
  decision turns on live data (prices, availability, someone's reply), say
  the council is reasoning without it.
- Keep each advisor inside its lens. A Skeptic arguing upside is a wasted
  seat.
- The verdict may recommend against the user's stated preference. That is
  the service being asked for; deliver it straight, without softening it
  into agreement.
- Cost control: use the forms and the choosing rule below; never silently
  run the expensive form on a small decision, and never silently run the
  cheap form on an expensive one.

## Forms: full and lite, and who chooses

**Full council:** all five lenses, cross-review, chairman's verdict, PRD
gate as written above.

**Lite council:** three lenses only (Skeptic, Reframer, Operator), NO
cross-review, the running agent synthesizes the verdict itself. The PRD
gate still applies unchanged.

**Who chooses: the agent does, by rule, the user should never need to
know the forms exist.** Judge on stakes, reversibility, and blast radius:

- **The floor: lite is the minimum, never zero.** If the request clears
  the convening bar (a genuine decision with at least two credible
  options), some form of council ALWAYS runs. "Cheap to reverse" argues
  for lite, never for skipping the council and deciding directly. Answer
  directly only for the refuse cases above: a fact, a summary, a
  production task, or an answer fully determined by a constraint the user
  stated.
- Run **lite** when the decision is cheap to reverse, the options are few
  and similar, or an answer is needed fast.
- Run **full** when being wrong is expensive, the choice is hard to
  reverse, or it commits weeks of work or real money.
- **Escalation:** if the three lite lenses disagree sharply, or the
  Operator flags the decision as irreversible or high-cost, upgrade to the
  full council mid-run (add Opportunist and Stranger, then cross-review)
  and say that you did. Disagreement is the signal that the decision
  deserves the whole table.
- **User override always wins:** "lite", "ringan aja" forces lite; "full
  council", "seriusin", "pakai dewan penuh" forces full.
- Either way, announce the form in one line at the start ("Running the
  lite council for this, it's cheap to reverse"), so the choice is never
  invisible.

## Verification gate

Before delivering the verdict, check:

- [ ] Every advisor stayed in its own lens and did not read the others first.
- [ ] No factual claim in the frame or the analyses is invented or unchecked.
- [ ] The verdict names a real clash and a deciding factor, not a blend.
- [ ] A flip condition and one next step are present.
- [ ] The disclosure line states the mode (and models, if any).
- [ ] The PRD rule was honored: drafted when confidence was medium or high
      and the decision was build-shaped; withheld, with reasons, otherwise.

## Credits

Inspired by the LLM Council methodology popularized by Andrej Karpathy
(github.com/karpathy/llm-council) and by Ole Lehmann's skill adaptation of
it (github.com/aiwithremy/claude-skills-llm-council). Neither source carries
an open license, so nothing here is copied or closely adapted from them:
the lens set, procedure, and every word of this file are original to this
repo, written from the general idea that independent advisors plus
anonymous peer review plus synthesis beats a single answer.
