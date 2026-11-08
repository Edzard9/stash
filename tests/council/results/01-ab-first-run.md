# Council test run — 2026-11-08

Model: rvr/zai-org/GLM-5.3-Flash via http://100.76.240.40:3780/v1
Cases: 8
Mode: A/B (raw baseline vs with-skill)

### Case 1 [raw] — Factual lookup must be refused

Expect: form=refuse, prd=no
Result: announce=false, form=false, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2382, completion 4, total 2386

<details><summary>Raw output</summary>

Paris.

</details>

### Case 1 [skill] — Factual lookup must be refused

Expect: form=refuse, prd=no
Result: announce=true, form=true, anatomy=false, prdGate=true -> PASS
Tokens: prompt 4750, completion 84, total 4834

<details><summary>Raw output</summary>

Paris.

No council needed — this is a fact lookup, not a decision.

</details>

### Case 2 [raw] — Cheap reversible choice runs lite

Expect: form=lite, prd=no
Result: announce=false, form=false, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2399, completion 284, total 2683

<details><summary>Raw output</summary>

Bullets. Faster to write live, easier to scan when reviewing, and they force you to compress instead of transcribing.

`ponytail:` you lose the "connecting ideas" benefit of paragraphs — fix that by writing one summary paragraph *after* class per topic, only if the course is conceptual. Don't switch mid-notes; pick one per session.

</details>

### Case 2 [skill] — Cheap reversible choice runs lite

Expect: form=lite, prd=no
Result: announce=true, form=true, anatomy=true, prdGate=true -> PASS
Tokens: prompt 4767, completion 2764, total 7531

<details><summary>Raw output</summary>

Running the **lite council** on this — the decision is cheap to reverse, so three lenses, no cross-review.

**Frame:** Bullets vs. short paragraphs for tomorrow's class notes. Options: bullets / paragraphs (a mix is possible). Constraints: switchable any time, near-zero cost to change. Stakes: how well the notes support review. Deadline: tomorrow. Assumption: subject type unknown — reasoning without it.

**A — The Skeptic**
- **Verdict:** bullets — but only if they force thinking, not transcribing.
- **Strongest:** bullets block verbatim slide-copying; they're scannable at revision time; a topic you can't compress into bullets exposes exactly where you're lost.
- **Biggest risk:** bullet soup — 40 disconnected fragments that reconstruct nothing a week later.
- **Flip condition:** an argument-driven subject (history, philosophy, lit) where the causal chain *is* the content.

**B — The Reframer**
- **Verdict:** wrong question. Notes have two jobs — capture live, retrieve later — and the format should follow the material, not be fixed in advance.
- **Strongest:** "I can switch any time" means the cost of choosing wrong is near zero, so this decision deserves almost no deliberation; the hybrid (bullets for facts, one short paragraph per section for the *why*) beats either pure form.
- **Biggest risk:** fiddling with note format becomes a socially acceptable way to procrastinate on studying.
- **Flip condition:** none needed — the choice is reversible.

**C — The Operator**
- **Verdict:** bullets in class, one sentence per topic in the evening.
- **Strongest:** crafting a paragraph mid-lecture costs you the next three sentences; the evening conversion is free retrieval practice; total added effort ~10 minutes.
- **Biggest risk:** the evening pass never happens and the bullets stay fragments forever.
- **Flip condition:** if you never revisit notes the same day, at least write the connecting sentence during class for anything you didn't follow.

**Chairman's verdict**
- **Where they agree:** bullets win for in-class capture; something must preserve the connections between facts.
- **Where they clash:** whether this decision matters at all. The Reframer says reversibility makes it near-weightless; the Operator says the real lever is the 10-minute evening pass, not the format.
- **Recommendation:** bullets per topic during class, then convert each topic to 1–2 sentences the same evening. **Confidence: high.**
- **Deciding factor:** reversibility — the switch-any-time you already have is worth more than either format.
- **Flip condition:** argument-chain subject → lead with the short paragraph instead.
- **Next step (now):** nothing to prepare tonight. Tomorrow: bullets in class, one two-line summary under each heading afterward.

Not build-shaped (study habit, not a product), so no PRD — the verdict plus next step is the deliverable.

*Disclosure: single-model fallback mode, lenses run independently in order (Skeptic → Reframer → Operator); lite form, so no cross-review.*

</details>

### Case 3 [raw] — Small reversible build runs lite, PRD allowed

Expect: form=lite, prd=either
Result: announce=false, form=false, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2405, completion 494, total 2899

<details><summary>Raw output</summary>

**No toggle.** Zero users have asked; a toggle is JS + localStorage + a no-flash script to prevent the wrong-theme blink. YAGNI.

If you want dark mode at all, the platform already ships it — a media query, no JS:

```css
:root { --bg: #fff; --fg: #111; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #111; --fg: #eee; }
}
body { background: var(--bg); color: var(--fg); }
```

→ skipped: toggle, persistence, no-flash script; add the toggle the first time someone actually asks for it (visitor preference overrides OS default — that's the trigger, not "it'd be nice").

</details>

### Case 3 [skill] — Small reversible build runs lite, PRD allowed

Expect: form=lite, prd=either
Result: announce=false, form=false, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 4773, completion 1345, total 6118

<details><summary>Raw output</summary>

This doesn't need a council — it doesn't even meet the convening bar (cheap to reverse, nothing real at stake, few similar options). Deciding directly.

**Decision: no toggle.** If you want dark mode at all, do it with the platform feature — zero JS, zero button, zero state to persist:

```css
:root { color-scheme: light dark; }

@media (prefers-color-scheme: dark) {
  /* dark palette vars */
}
```

A toggle is a JS state machine + localStorage + a styled, focusable button — for a page visitors read for seconds before hitting "contact." Their OS already told you what they prefer; honoring it is rung 3 on the ladder (native over manual). Portfolio visitors who genuinely care about a theme toggle are approximately zero.

skipped: manual toggle; add when someone actually asks for it — likely never.

</details>

### Case 4 [raw] — High-stakes time commitment runs full

Expect: form=full, prd=no
Result: announce=false, form=false, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2420, completion 1803, total 4223

<details><summary>Raw output</summary>

**Open source, scoped tight.** The ladder decides this:

- "New SaaS from scratch" fails rung 1: nobody asked for it. Three weeks buys you mostly auth, billing, and deploy boilerplate — exactly the code that should never be written. An abandoned SaaS is the worst portfolio artifact there is.
- Open source hits rung 4: contribute to tools you *already use*. Context pre-installed, bugs already found in the wild, and merged PRs with maintainer review comments are the actual signal internship reviewers look for.

Plan:
- **Week 1:** setup + one tiny PR (docs or test fix is fine — you're buying the contribution pipeline, learning to survive code review).
- **Weeks 2–3:** one real bug fix you hit yourself while using the tool. Not browsing "good first issue" labels.

`ponytail:` if nothing is landable by end of week 1 (frozen repo, slow maintainer), pivot to a one-feature tool — one screen, no auth, no payments. Add accounts when a second human asks for one.

And no, this doesn't "decide your whole break." Two merged PRs beat either option half-done. Finishing is the decision; the choice barely matters.

</details>

### Case 4 [skill] — High-stakes time commitment runs full

Expect: form=full, prd=no
Result: announce=true, form=true, anatomy=true, prdGate=false -> NEEDS REVIEW
Tokens: prompt 4788, completion 6934, total 11722

<details><summary>Raw output</summary>

Running the **full council** for this — it commits three whole weeks, so it gets the whole table. Single-model mode (no other models available to seat), lenses run independently in sequence.

## Frame

**Decision:** Where do the 3 free weeks go — A: build a new SaaS from scratch, or B: contribute to open source for the internship portfolio?
**Constraints:** 3 weeks, solo, semester start is immovable.
**Stakes:** the entire break, plus the internship narrative going into recruiting season.
**Assumptions (labeled, not verified):** software internships are the target; no meaningful merged-PR history exists yet; the SaaS is an idea, nothing started; ~20–30 usable hrs/week.

---

## Independent analyses

**1. The Skeptic**
- **Verdict:** Open source — the SaaS carries a flaw nobody's pricing in.
- **Strongest points:** (1) Three-week SaaS projects reliably die in auth, billing, and deploy plumbing; an unshipped half-repo is a *negative* portfolio item. (2) "From scratch" means zero leverage — you re-solve solved problems solo. (3) The OSS risk is shallow drive-by PR-farming, which reviewers discount.
- **Biggest risk:** Day 20 of 21: an unshipped login screen and a semester starting.
- **Flip condition:** The SaaS is scoping down to a core you can demo live by day 5.

**2. The Reframer**
- **Verdict:** You're deciding the wrong thing. The real question: what produces a legible signal and a true interview story in 21 days?
- **Strongest points:** (1) Internships are judged on legibility — a merged PR in a known org is a recognized currency; a private SaaS signals nothing unless *shipped and used*, and "used" is out of your control. (2) The artifact matters less than the story it lets you tell with proof. (3) OSS gives you real code review against real engineers — that's the interview material.
- **Biggest risk:** Three weeks of invisible work.
- **Flip condition:** Target companies demonstrably weight shipped products over repo history.

**3. The Opportunist**
- **Verdict:** The hybrid nobody named: contribute to open source you'd actually *use* — the SaaS isn't killed, it's de-risked and deferred.
- **Strongest points:** (1) Contributing to a tool your future SaaS would sit on is a double payoff — portfolio now, prepared foundations next term. (2) Three weeks of deep use while fixing bugs tells you whether the SaaS is worth building at all. (3) Undervalued move: pick repos run by companies you're applying to.
- **Biggest risk:** Chasing famous repos where first-PR latency eats the entire window.
- **Flip condition:** The idea serves a niche you personally own and could get 5 users in 3 weeks.

**4. The Operator**
- **Verdict:** Open source, on schedule math.
- **Strongest points:** (1) ~120 solo hours minus auth/billing/deploy ≈ 50% burned on plumbing that produces zero interview signal. (2) In OSS, the repo absorbs the infra; your hours land ~100% as visible commits. (3) OSS survives interruption — the semester can't kill a PR the way it kills an 80%-finished app.
- **Biggest risk:** Week 3 arrives, the SaaS is at 80%, semester starts, the 80% is abandoned forever.
- **Flip condition:** You've shipped complete products solo before and know your real velocity.

**5. The Stranger**
- **Verdict:** Open source — until someone shows me recruiters read the other one.
- **Strongest points:** (1) Has anyone at the internships you want actually said what they weigh? Nobody checked. (2) Is the break really 25 free hours a week, or does ambition say 70 and reality say 10? (3) Is the SaaS an idea, or a problem a real person has told you they have?
- **Biggest risk:** Optimizing for an imagined judge.
- **Flip condition:** A maintainer or recruiter in your target industry says shipped products matter more.

---

## Cross-review (anonymized, A–E)

- **A:** C's first-PR-latency warning is the strongest argument on the table; D and A independently landed on the same failure mode (the 80% abandonment), which makes it load-bearing.
- **B:** D's schedule math is the strongest. A overclaims — an honest WIP repo isn't fatal, just weak. E's "ask recruiters" is right but doesn't decide today.
- **C:** B and E attack the premise from different angles (who's judging vs. what's the goal) — compatible, not clashing. C's hybrid hides extra risk D never priced.
- **D:** E's hours question is genuinely unresolved — nobody verified the real time budget. Flag it. D's verdict survives as long as ≥15 hrs/week is real.
- **E:** One shaky claim across the set: C's "contributing de-risks the SaaS" is plausible but unverified — treat as assumption. Note that A and C reach the same recommendation from opposite temperaments, which raises confidence.

## Chairman's verdict

- **Where they agree:** Four of five converge on open source as the primary use of the three weeks — even the Opportunist's hybrid routes through it first. Ground truth: merged PRs are legible to strangers; a three-week from-scratch SaaS usually isn't.
- **Where they clash:** The real fight is between the Skeptic and the Opportunist over the SaaS itself — dead weight that will burn the break, versus a deferred idea that this break should de-risk.
- **Recommendation:** **Contribute to open source.** Confidence: **medium** — it depends on landing a real PR inside maintainer latency you don't control, and on the unverified assumptions above.
- **Deciding factor:** The asymmetry. The SaaS must succeed *twice* to pay off — it has to ship and get users. OSS pays off on the *first* merge. When you must choose under uncertainty, pick the option that pays on first success.
- **Flip condition:** You already have merged PRs in recognizable repos (then marginal signal = a shipped product), or the SaaS cores down to something demonstrable live by day 5.
- **Next step:** Today — pick **one** repo you personally use, read its contributing guide, claim one real open issue (not a typo), and open the PR before the end of week 1.

*Disclosure: full council, single-model mode. The five lenses were run independently in sequence by one model; cross-review done anonymously; no external models called.*

---

## One-page plan (PRD hand-off)

**Problem:** 3 uncommitted weeks before the semester; need an internship-portfolio signal that survives a skeptical screener.
**Target user:** Internship screeners and interviewers (gatekeepers: maintainers).
**Decision recap:** OSS over from-scratch SaaS. Deciding factor: OSS pays on first merge, SaaS must pay twice. Flip condition: existing merged PRs, or a day-5-demonstrable SaaS core.
**Scope in:** 1–2 repos you actually use; one small merged PR + one substantial PR; a written log of each exchange.
**Scope out:** The SaaS (parked, documented, revisited as a weekend build *on top of* whatever you contributed to); good-first-issue token farming; learning a new stack just for this.
**Core features (milestones):**
1. Day 1: repo chosen, contributing guide read, one real issue claimed.
2. Week 1: small PR merged — proves workflow, CI, review etiquette.
3. Days 8–18: one substantial PR open — bug fix with tests or a small feature.
4. 10-line log per PR (what, why, link) — this *is* the interview story.
5. Any PR silent >5 days: move to a second repo, don't wait.
6. End of week 3: one portfolio line + interview paragraph per PR.
7. One page parking the SaaS idea so it survives the semester.
**Constraints:** Solo; no new frameworks; maintainer latency is an external unknown; semester start is immovable.
**Success criteria:** ≥1 merged PR and ≥1 substantial PR opened; you can narrate one real code-review exchange from memory; the SaaS idea exists as a document, not a memory.

*This isn't a product being built, so the PRD is a plan of work, not a spec — if you want, I can break it into small ordered briefs next, but only say the word.*

</details>

### Case 5 [raw] — Build-shaped money decision runs full and produces a PRD

Expect: form=full, prd=yes
Result: announce=false, form=false, anatomy=false, prdGate=false -> NEEDS REVIEW
Tokens: prompt 2419, completion 3673, total 6092

<details><summary>Raw output</summary>

**Winner: one-time unlock.** Reasons in three lines:
- Free tools are an SEO funnel — gating *any* tool kills the funnel; a cap keeps every page fully usable.
- One gate, one constant; freemium means maintaining a free/paid catalog and per-tool gating forever.
- Zero marginal cost per tool — subscriptions demand recurring value you don't deliver monthly. Churn guaranteed.

**The model:** everything free, capped at 20 tool runs/day; one $19 payment lifts all caps forever. Tools must hit your API (client-only tools can't be gated — keep those free permanently).

## Spec

**1. Quota middleware** (API routes only). Cookie `q=<day>:<count>`, HMAC-signed with server secret:

```js
const sign = s => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');
const today = () => new Date().toISOString().slice(0, 10);

// middleware
const [day, count] = (req.cookies.q || '').split(':');
const next = day === today() ? +count : 0;
if (req.cookies.unlocked !== sign('unlocked') && next >= 20)
  return res.status(402).json({pay: true});
res.cookie('q', `${today()}:${next + 1}:${sign(`${today()}:${next + 1}`)}`);
next();
```

**2. Unlock.** No checkout code. Create a Stripe **Payment Link** (+ your SMTP email) in dashboards. Handler:

```js
app.get('/unlocked', async (req, res) => {
  const s = await stripe.checkout.sessions.retrieve(req.query.session_id); // server-verified
  if (s.payment_status !== 'paid') return res.redirect('/');
  res.cookie('unlocked', sign('unlocked'), {maxAge: 10 * 365 * 864e5, httpOnly: true});
  const key = sign(s.customer_details.email);
  smtpSend(s.customer_details.email, 'Your unlock key', key); // key = HMAC(secret, email)
  res.redirect('/?unlocked=1');
});
```

**3. Restore form** (`email` + `key` → `key === sign(email)` → set same cookie, 4 lines). Client: a `fetch` wrapper that opens one modal with the payment link on any `402`.

**4. Test** (`quota.test.js`, `node quota.test.js`):
```js
assert(sign('unlocked') + '1' && !verifyCookie(sign('a') + 'X')); // tampered rejected
assert(sign('a@b.c') === sign('a@b.c'));                          // key matches restore
```
Plus one server check: 21st run returns 402, 1st run next day passes.

**Build time:** one afternoon. No database, no webhooks, no accounts, no plan matrix.

- skipped: webhook for tab-closed payments → key in email covers it; revisit at support ticket #2.
- skipped: DB-backed licenses (revOK/refunds keep working via HMAC key) → migrate when you sell enough to need revocation.
- skipped: per-tool paid tier → revisit only if analytics show 3 tools drive 90% of usage.

</details>

### Case 5 [skill] — Build-shaped money decision runs full and produces a PRD

Expect: form=full, prd=yes
Result: announce=true, form=true, anatomy=true, prdGate=true -> PASS
Tokens: prompt 4787, completion 8576, total 13363

<details><summary>Raw output</summary>

**Running the full council** — this locks in a pricing model and a month of work; hard to reverse once real users pay one way.

## Step 1 — Frame

> **Decision:** How to monetize a free web-tools site.
> **Options:** A) Freemium — gate some tools behind a paid tier. B) One-time unlock — single payment unlocks everything, forever.
> **Constraints:** Solo builder, ~1 month. *(Assumptions: traffic is SEO-driven, no accounts exist yet, no payment infrastructure yet — none of this was stated.)*
> **Stakes:** Migrating paying users between models later is painful and angering.
> **Deadline:** Build starts next month.

No single missing fact flips every answer, so proceeding on labeled assumptions.

## Step 2 — Independent analysis

*(Single-model mode: lenses run one at a time, previous conclusions discarded before each.)*

**The Skeptic**
- **Verdict:** One-time unlock — but I'd rather not ship either until one fact exists.
- **Strongest points:** 1) Freemium's hidden tax: paywalling tools poisons your acquisition. Free tools rank because they're free and complete; locked pages get pogo-sticked back to Google, rankings slip, and the funnel that would feed paying users dries up. 2) Ten free clones exist for every tool you have; neither option has proven a single person will pay. Optimizing paywall *shape* before the first sale is rearranging chairs. 3) Stated honestly: lifetime unlocks cap revenue and front-load refund/support noise.
- **Biggest risk:** Shipping a month of gating logic to discover the ceiling is $30/month total.
- **Flip condition:** Evidence of repeat work-shaped usage (someone running invoices weekly) changes me.

**The Reframer**
- **Verdict:** You're deciding the wrong thing.
- **Strongest points:** 1) Both options are ~90% the same build: payment provider, an entitlement flag, tools that read it. The only real fork is "what does the flag key on" — one global key vs. a tier matrix — and that's a *config decision* you should make with data, not up front. 2) The unbuilt-able part is the payment rail; pick that. 3) You have zero data on willingness to pay, usage-per-visitor, or which tools carry intent. Build the rail, sell the top package first, let receipts reframe this in 90 days.
- **Biggest risk:** Burning the month on tier curation ("which tools are paid") — editorial decisions with no evidence.
- **Flip condition:** If analytics already show a bimodal audience (casual vs. daily users), the fork is worth taking now.

**The Opportunist**
- **Verdict:** One-time unlock, positioned as a limited founding-price launch — then raise.
- **Strongest points:** 1) "Unlock everything, forever, founding price" is the cleanest first ask: one number, whole-site value, built-in urgency. 2) The launch spike funds and validates; afterwards the unlock *becomes* your top tier — you can add subscriptions for new tools and grandfather founders. The two options aren't enemies; unlock is freemium's cheapest first version. 3) Freemium's higher ceiling only exists if you know which tools are the whales. You don't yet.
- **Biggest risk:** Founding price quietly becomes the permanent price — discount creep without the spike.
- **Flip condition:** One tool with clear business value (produces documents clients get billed for) → per-tool premium at $19–39 could out-earn site-wide.

**The Operator**
- **Verdict:** One-time unlock, decisively.
- **Strongest points:** 1) Build diff: unlock = hosted checkout with built-in license keys + one redemption page + one `isPro()` check. A week or two. Freemium needs accounts (or at least email+session), a per-tool entitlement matrix you curate forever, and locked-preview UI per tool — that does not fit one month clean. 2) One SKU = one support script, one refund policy. 3) Migration direction: unlock buyers → future subscription is a friendly upsell; asking per-tool subscribers to buy lifetime is hostile.
- **Biggest risk:** Talking yourself into a license-verification server because client-side checks are bypassable. The audience is freebie-seekers, not pirates.
- **Flip condition:** If auth already exists, freemium's diff shrinks and it becomes a fair fight.

**The Stranger**
- **Verdict:** I don't understand what's being sold.
- **Strongest points:** 1) What does a paying user get that ten free sites don't? 2) Are visitors one-and-done from search, or do they return weekly? The answer picks the model for us. 3) Is the traffic 500 people or 50,000? The math is everything. "Unlock all tools" can sound like buying a fork when soup is free at every table in town.
- **Biggest risk:** You install the memory "this site asks for money" in users before you have anything worth locking.
- **Flip condition:** Name one tool whose paid version is obviously worth $20 to a named person.

## Step 3 — Anonymous cross-review

**A:** E's "what is being sold" is the strongest argument on the table; B assumes it in silence. C's launch-spike plan is persuasive but depends on an audience size nobody stated. **B:** D's build-diff argument is strongest because it's checkable, not speculative. A's SEO point and D's point are the same argument (don't gate the funnel) in different hats. **C:** B is talking past the question — the user asked which monetization to build, and B answered "build a cashier." But B's shared-rail observation is correct and dissolves half the debate. **D:** A's SEO point wins: it's the only one that damages the *existing asset* rather than merely failing to add. E is asking discovery questions the owner should have answered long ago — right questions, wrong meeting. **E:** C's LTD play is the weakest unless an email list exists — urgency without a channel to announce it is theater. D's "a week" is optimistic; two is honest.

## Step 4 — Chairman's verdict

- **Where they agree:** Both options need the same payment rail. Gating live tools threatens the SEO funnel. Willingness-to-pay is unproven. No-account, single-flag simplicity wins at this stage.
- **Where they clash:** The real disagreement is build-shape vs. revenue-shape: the Operator's "ship the small thing now" against the Opportunist's "freemium has the higher ceiling." The Stranger hangs a warning on both.
- **Recommendation:** **One-time unlock.** Confidence: **medium**.
- **The deciding factor:** Freemium spends the month's build on tier curation and account plumbing whose value is unproven — and its mechanism (gating some tools) attacks the SEO traffic everyone agrees is the asset. Unlock spends the budget on one SKU that leaves every tool free to Google and starts collecting the receipts that will *actually* answer this question.
- **Flip condition:** If analytics show a few tools with heavy, repeat, work-shaped usage, freemium per-tool wins. Pull that data before writing a line of code.
- **Next step:** This week: check per-tool analytics on your top 10 tools (repeat rate, return visits) and set the founding price. That's the only unknown that can still flip the pick.

*Disclosure: single-model mode — all five lenses and the chairman were run by me, no external models.*

## Step 5 — PRD

Pricing calls normally skip the PRD — but the winning option is a month-long build and you explicitly asked for the spec, so here it is.

---

# PRD: Pro Unlock

**Problem:** Site draws steady traffic with zero revenue; monetization must go live next month without damaging the free/SEO funnel.

**Target user:** Repeat visitors using tools for real work — freelancers, small-biz operators. *(Assumed — verify against analytics in next step.)*

**Decision recap:** Council verdict: one-time unlock over freemium (medium confidence). Deciding factor: one SKU, no accounts, tools stay free and indexable; freemium's tier curation is build-heavy and unproven. Flip condition: heavy repeat work-usage concentrated in a few tools → switch to per-tool freemium.

**Scope in:**
- One SKU: "Pro unlock," founding price (e.g., $29) via hosted checkout with provider-native license keys (Lemon Squeezy / Gumroad; Stripe Payment Link + webhook only if you must keep keys in-house).
- `/redeem` page: paste key → validate → `localStorage.pro = true`.
- One `isPro()` helper all tools consult.
- Pro value per tool: **exactly one capability each** (batch mode, raised limits, saved settings, watermark-free export). Fill the per-tool list from your top 10 before building — don't pick from your desk chair either.

**Scope out:** Accounts, email capture, subscriptions, tier matrix, per-tool pricing, API/team licenses, refund automation (manual — volume will be small), server-side license verification.

**Core features:**
1. Checkout + automatic key delivery (provider-native).
2. `/redeem` page: key entry, provider-API validation, local flag.
3. `isPro()` gate wired into every tool.
4. One pro capability per tool (top-10 list).
5. Locked-state UI: pro controls visible + "Pro" badge → checkout link.
6. Activation cap (provider license-usage setting).
7. Launch page: founding-price limited offer + one announcement.

**Constraints:** 1 month, solo. Free tools stay free and fully indexable. No backend to host if avoidable.
`ponytail:` client-side unlock is nuisance protection only, not security; upgrade path is server-side key verification when revenue justifies it.

**Success criteria:**
1. Purchase → redeem → unlock works end-to-end in a real browser.
2. ≥5 sales per 1k sessions within 30 days of launch.
3. ≥40% of buyers use ≥3 distinct tools (validates site-wide vs. per-tool thesis).
4. If checkout CTA click-through <0.1% after 30 days, revisit the pricing shape with that data.

---

Want to proceed? I can split this PRD into small ordered build briefs (the vault's `small-briefs` skill) and we build piece by piece with a check per piece.

</details>

### Case 6 [raw] — Single product idea: mini-PRD frame, then council

Expect: form=any, prd=either
Result: announce=false, form=true, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2402, completion 3267, total 5669

<details><summary>Raw output</summary>

**Verdict:** the tech is a weekend. The risk is that two free incumbents already do this, and one half of your product is scaffolding.

**What kills it as pitched:**

1. **The incumbent is a WhatsApp group the lecturer already runs.** In the markets where this idea makes sense (India, Kenya, Nigeria, Brazil…), lecturers already post deadlines in course groups. Your competitor is typing a message into a group that already exists. Zero cost, zero adoption friction.
2. **The LMS is the second incumbent.** Moodle/Canvas/Blackboard send deadline notifications for free, and your deadlines are already in there. The board question is "why pay you to notify what the system we already bought notifies?" — and you need an answer better than "open rates."
3. **The dashboard is the wrong half.** You're asking lecturers to enter deadlines a second time. They won't. Delete it; ingest instead — LMS calendar/API feed → reminders. Zero lecturer adoption burden. (Rung 4 applied to products: a Moodle WhatsApp-notification plugin may already exist. Check before building.)
4. **WhatsApp Business API realities:** opt-in required per student, per-template approval, ~$0.06/message for utility sends outside the 24h window, and one platform-policy change ends the product. Fine at small scale; it's your cost base and single point of failure.
5. **Who pays?** Students: no. Lecturers: no. Universities: maybe — but they buy *retention outcomes*, not reminders, and nudge studies show real-but-marginal effects. You can't invoice "students felt informed."

**What survives: the student-side wedge.** Skip lecturers entirely. Student forwards the assignment brief / course outline screenshot to a bot → parse deadline → remind at T-24h and T-2h. Opt-in is one message per student, no institutional deal, no dashboard. Second-cheapest version: cron reading the LMS's public calendar feed → WhatsApp template. If that's the whole product, decide honestly whether it's a company or a plugin.

**Pressure-test questions, answers they'll likely give:**
- 30 students: "show me where your deadlines live" → most will open the app and find nothing. Reminders only win if seen rate × uptake beats overheard-in-the-group.
- 10 lecturers: "enter deadlines in a second place?" → no. Confirms the dashboard is dead.
- Opt-in is the real metric: one class of ~100 invited to a reminder broadcast. If <30% join in a week, distribution failed, nothing else matters.

**Cheapest test (no code, rung 1):** concierge one course for two assignment cycles — students join a group, you personally send reminder messages, compare late-submission rate against a control course. If the late rate doesn't move, kill it. If it moves, build the bot, then the LMS bridge, and only ship a dashboard if lecturers demand it unprompted, twice.

→ skipped: lecturer dashboard, student app, multi-channel fallback — add when the concierge test moves late-submission numbers.

</details>

### Case 6 [skill] — Single product idea: mini-PRD frame, then council

Expect: form=any, prd=either
Result: announce=true, form=true, anatomy=true, prdGate=true -> PASS
Tokens: prompt 4770, completion 8449, total 13219

<details><summary>Raw output</summary>

Running the **full council** — this commits weeks of build time and real money (WhatsApp API costs), so all five seats plus cross-review.

## Frame

**Decision:** Build/not build, and in what shape: WhatsApp deadline-reminder app for university students, small lecturer dashboard.
**Options:** (1) ship as written — app + dashboard, (2) ship smaller, (3) do not build.
**Constraints:** solo builder, no funding mentioned, no university contract yet.
**Stakes:** weeks of work + API fees + one term's window for the pilot.
**Deadline:** none stated; assumed one term.
**Assumptions (labeled, not verified):** WhatsApp Business Cloud API — requires opt-in, approved message templates, per-conversation fees (pricing varies by market, not checked); no LMS access; payer unidentified.

**Mini-PRD (frame artifact, rev 1):** Problem — deadlines scattered across syllabi/LMS/class groups, students miss them. Target user — undergrads. Scope in — reminder messages, lecturer dashboard. Scope out — LMS integration, payments. Core features — deadline CRUD, reminder scheduler, dashboard. Success criteria — students opt in and no deadline missed. *This gets revised in Step 5.*

## Step 2: Independent analysis (single-model mode, lenses run in order, prior conclusions discarded before each)

**The Skeptic**
- **Verdict:** Do not build as written — the funnel has a hole at the front.
- **Strongest points:** (1) Business-initiated WhatsApp requires opt-in plus an approved template; the students who opt in are the organized ones, the chronically-late target audience ignores another signup link. (2) The lecturer dashboard asks the least-motivated user to do the most work — lecturers already have an LMS and a class group, zero pull. (3) Platform dependency: Meta can slow your template approval, raise pricing, or ban your number; you own none of the channel.
- **Biggest risk:** Launch → 20% opt-in → reminders land in the same noisy inbox as the 50 group messages they're meant to beat → muted → dead product, a term wasted.
- **Flip condition:** A pilot showing ≥60% of one class opts in and stays opted in.

**The Reframer**
- **Verdict:** You're deciding the wrong thing. Reminders are a commodity — a cron job and any channel. The hard, valuable problem is **deadline capture**.
- **Strongest points:** (1) Value = getting deadlines out of screenshots, syllabi, and students' heads into one system; whoever owns capture owns the product. (2) The dashboard is a capture mechanism assigned to the worst-capturing user; students already receive the deadlines — let them **forward** the syllabus or a screenshot. (3) Ship smaller: capture via forward + confirm, reminders via WhatsApp, and the "dashboard" is a Google Sheet, not a product.
- **Biggest risk:** Building the seller side nobody asked for while the buyer side — capture — stays unvalidated.
- **Flip condition:** 3+ lecturers spontaneously entering deadlines weekly without prompting makes lecturer-side capture viable.

**The Opportunist**
- **Verdict:** Ship smaller — but keep eyes on the bigger game.
- **Strongest points:** (1) The real asset is an opted-in WhatsApp list of a student cohort; universities bleed on email open rates and would pay for a channel that actually reaches students (exam changes, fee deadlines, campus notices). Deadline reminders are the wedge to channel status. (2) Incumbent channels (LMS notifications, email) are unloved; WhatsApp notifications get opened in this demographic. (3) The syllabus-capture pipeline compounds — same machinery later ingests timetables and exam schedules.
- **Biggest risk:** The wedge stays a cute reminder toy and never converts into a university-wide channel agreement.
- **Flip condition:** A faculty offers official channel adoption early — then skip the student wedge and go institution-first.

**The Operator**
- **Verdict:** Ship smaller. The as-written version is 4–8 weeks; the wedge is 1–2 weekends with a human in the loop.
- **Strongest points:** (1) Real costs first: Meta business verification takes days-to-weeks, template approval is a gate before any message, per-conversation fees eat a free product's budget. (2) A dashboard buys auth, roles, CRUD — pure cost, zero learning. A shared Sheet + a form is the lazy dashboard. (3) Concierge first: one operator pasting deadlines into a script proves value before software exists.
- **Biggest risk:** Month one spent on dashboard auth while zero reminders have been sent.
- **Flip condition:** Past ~500 students on the list, manual ops breaks and real tooling starts earning its cost.

**The Stranger**
- **Verdict:** Plain questions before code: why would a student trust a message from an unknown business number, and who pays?
- **Strongest points:** (1) An unrecognized WhatsApp Business sender reads as spam; trust has to be imported from somewhere — a lecturer's one-time announcement in the class group is the cheapest source. (2) No payer exists in this plan: students won't pay for reminders, universities are slow sales; a pilot must surface the wallet, not just usage. (3) Students' phones already have reminder apps that are free — the missing behavior must be named precisely or this is a vitamin, not a painkiller.
- **Biggest risk:** "Who pays" goes unanswered and the product dies of funding ambiguity after a warm pilot.
- **Flip condition:** One department willing to sponsor an official pilot resolves trust and payment simultaneously.

## Step 3: Anonymous cross-review (set A–E: A=Skeptic, B=Reframer, C=Opportunist, D=Operator, E=Stranger)

**Reviewer 1:** Strongest argument in the set is B's capture reframe — the entire plan rests on it and no other lens contradicts it. Weakest: C's institutional-channel ambition assumes a sales motion that doesn't exist yet. Worth noting A and B are closer than they look: both specifically kill the dashboard.
**Reviewer 2:** Strongest is D's concierge plan — it converts B's abstraction into an actual test this month. Weakest: E's "phones already have reminder apps" understates the capture friction; B already answered that. A and D are talking past each other about the same template-approval funnel — A fears it, D prices it as a task.
**Reviewer 3:** Strongest is B again — capture as the wedge explains why reminders alone feel thin. Weakest: A's "do not build" overshoots; every fatal flaw A lists is solved by the smaller version rather than non-existence. That A-vs-C tension is the set's real fault line.
**Reviewer 4:** Strongest is A's hard operational reality — verification and template approval are the one concrete plan-changer; schedule around them from day one. Weakest: B's screenshot-parsing as written; don't promise magic parsing at pilot scale — human confirmation in the loop, automate later.
**Reviewer 5:** Strongest remains B's capture point; weakest is C's university-wide channel story — premature with zero institutional contacts. The unresolved clash worth carrying into the verdict: C wants institution-first eventually, E says institutions are unreachable today. Both can be true sequentially.

## Step 4: Chairman's verdict

**Where they agree:** Four of five seats (A, B, C, D) independently pointed at the same defect: the lecturer dashboard. That's the closest thing to ground truth this council has — it is adoption cost on the least-motivated user, bought before any value is proven.

**Where they clash:** A says the opt-in funnel is fatal enough to not build; C says the same funnel is the prize and should be built for. That is the genuine disagreement — is 60% class opt-in achievable by an unknown sender? The second clash (C vs E) on institutional ambition now vs later is real but sequential, not either/or.

**Recommendation:** **Ship smaller** — a student-side deadline-capture + WhatsApp reminder MVP for exactly one course. No dashboard. Confidence: **medium**.

**Deciding factor:** Removing the dashboard removes the two-sided cold start. Every lens's argument gets stronger in the smaller version: capture happens on the side that already holds the deadlines (students forward the syllabus), trust is imported via one lecturer announcement, and manual ops tests the whole premise in weeks, not months.

**Flip condition:** If 3+ lecturers actively commit to entering deadlines weekly in a trial, the original two-sided version with the dashboard wins — because lecturer-side capture beats student-side friction.

**Next step:** Pick one course this term. Get the lecturer to post one opt-in link in the class WhatsApp group. Run deadlines from a Google Sheet through WhatsApp Cloud API template messages for 4 weeks.

**Disclosure:** Single-model mode — no external models available to call; all five lenses and the chairman were run by this model, lenses executed sequentially without shared context, cross-review anonymized.

**Gate:** lenses stayed in-role; no pricing figures invented (marked unverified); clash + deciding factor named; flip condition and next step present; PRD rule honored below (medium confidence, build-shaped).

## Step 5: Revised PRD (final form)

**PRD — Deadline WhatsApp Pilot**

- **Problem:** Assignment deadlines live scattered across syllabi, LMS pages, and class groups; reminders fail because the deadlines were never captured in one place.
- **Target user:** Undergraduates in one pilot course. Lecturer = announcer only, not a user.
- **Decision recap:** Ship smaller: capture from students via forwarding, reminders via WhatsApp, no dashboard. Deciding factor: eliminates two-sided cold start. Flip condition: 3+ lecturers self-reporting weekly deadline entry reopens dashboard scope.
- **Scope in:** Opt-in link with class code; deadline capture (typed entry or forwarded screenshot, human-confirmed); reminder dispatch; admin Sheet; pilot metrics.
- **Scope out:** Lecturer dashboard, user accounts/auth, syllabus OCR/LLM automation, LMS integration, multi-course/multi-university support, payments.
- **Core features:**
  1. Opt-in link (one per class; records number + course).
  2. Deadline entry: type it or forward the syllabus screenshot; confirm parsed rows before saving. `ponytail:` human-in-the-loop parsing — ceiling ~50 deadlines/week; upgrade when volume justifies an LLM parse step.
  3. Reminder dispatcher: cron sends approved template at D-3, D-1, morning-of.
  4. Opt-out (platform "STOP" handling; no custom code).
  5. Google Sheet as system of record and "dashboard" replacement. `ponytail:` ceiling ~500 students / 3 courses; upgrade to a real admin view when load demands it.
  6. Pilot log: opt-in rate, delivery rate, exit survey.
- **Constraints:** Solo builder; Meta business verification + template approval completed before launch; per-conversation API fees budgeted (current pricing unverified — check before commit); phone numbers never shared.
- **Success criteria:** ≥60% of class opted in within 2 weeks; ≥90% delivery rate; ≥50% of respondents at pilot end say a reminder saved a deadline; opt-ins retained at week 4.

---

When you want to proceed, I can break this into small ordered build briefs and build it piece by piece — say the word.

</details>

### Case 7 [raw] — Pricing decision: verdict only, no PRD

Expect: form=any, prd=no
Result: announce=false, form=true, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2404, completion 952, total 3356

<details><summary>Raw output</summary>

**500k.**

- 300k (~$19) dies on revisions + WhatsApp back-and-forth — you'll be working below minimum wage. 500k is still impulse-buy cheap for a shop owner.
- Price is a quality signal. Local shops read 300k as "template dump."
- If they hesitate: don't cut the price, add value — WhatsApp button, Google Business setup, 1 month of minor fixes included, still 500k. Keeps your anchor for the next client.
- One exception: zero portfolio? Then 300k *as an explicit one-time launch price* for the first 1–2 clients, traded for a testimonial.

→ skipped: tiered packages, add when clients start asking for extras (menus, booking forms).

</details>

### Case 7 [skill] — Pricing decision: verdict only, no PRD

Expect: form=any, prd=no
Result: announce=true, form=true, anatomy=true, prdGate=true -> PASS
Tokens: prompt 4772, completion 3916, total 8688

<details><summary>Raw output</summary>

Running the **lite council** for this — small money, and your price is reversible with the next client.

**Frame:** Price one landing-page package for local shops at 300k or 500k IDR. Needed today, on a live call. Stakes: ~200k per sale, plus what your first price anchors every future referral to. Assumptions (marked, not knowns): a typical page takes ~5 hours of your time; package contents, your portfolio strength, and which type of shop is calling are unknown.

**The Skeptic** — Verdict: 500k, reluctantly.
- 300k on a 5-hour page is 60k/hour. And that's *if* revisions stay sane — you eat the loss when they don't.
- Cheap doesn't buy gratitude, it buys the clients who negotiate hardest after paying least.
- The question you're avoiding: what does one un-capped revision round cost you in hours?
- Biggest risk: selling a package at 300k you can't deliver profitably once they edit three times.
- Flip condition: if contents are genuinely ~2 hours (one template, user pastes own text), 300k is fair.

**The Reframer** — Verdict: you're deciding the wrong thing; 300 vs 500 is two different customers.
- 300k serves the small warung that wants "a Facebook page with a domain." 500k serves the clinic or distributor where one new customer pays it back in a day. Match price to what a lead is worth to *that* shop.
- Price is a filter, not just a number — it selects who calls you back.
- The assumption to kill: one flat package. A "starter" and a "business" tier answers every future call without deciding today at all.
- Biggest risk: one number, pitched at the wrong shop, losing both segments.
- Flip condition: if you only ever get one shop type, segmentation dies and it's a straight number call.

**The Operator** — Verdict: 500k, in writing.
- Hours math: ~5 hrs/page → 500k ≈ 100k/hr, 300k ≈ 60k/hr. At 300k, any other gig beats it.
- Asymmetry: on today's call you can come *down* from 500k with a reason ("portfolio price, this once"). You can never go *up* from an opening 300k.
- Gratis work in disguise: verbally agreed 500k with no written scope becomes "the landing page turned into a website."
- Biggest risk: no revision cap → hours balloon past anything 300k covers.
- Flip condition: empty portfolio where the referral asset itself is the payment — then go cheap *on purpose*, in writing.

---

**Verdict**
- **Where they agree:** 300k underprices the real work, and whatever you charge first is what every referred client expects after.
- **Where they clash:** fixed single price (Skeptic, Operator) vs. price matched to who's on the call (Reframer).
- **Recommendation:** quote **500k** today, with the scope written down: one page, client supplies text/photos, max 2 revision rounds. Confidence: **medium** — honest, since local rates and your portfolio are unknowns the council reasoned without.
- **Deciding factor:** concession asymmetry — from 500k you can drop when justified; from 300k you can't climb.
- **Flip condition:** if the caller is clearly a tiny single-outlet shop, open 500k and deliberately (not apologetically) offer a 300k starter tier — that folds the Reframer's insight into one call.
- **Next step:** before dialing, write the one-paragraph scope (deliverable, 2 revisions, timeline). Say the number, then be quiet.

Not build-shaped (pricing), so no PRD — the verdict plus that scope paragraph is the deliverable.

*Mode: single-model lite council (Skeptic, Reframer, Operator; cross-review skipped per the form), verdict synthesized here.*

</details>

### Case 8 [raw] — Missing key fact: one question or labeled assumptions

Expect: form=any, prd=no
Result: announce=false, form=true, anatomy=false, prdGate=true -> NEEDS REVIEW
Tokens: prompt 2392, completion 576, total 2968

<details><summary>Raw output</summary>

**No. Stay on the VPS.**

Migration is weeks of work, higher cost (egress bites), and lock-in — for zero user-visible gain. Your VPS is the boring option, and boring wins.

Flip to cloud only when one of these becomes true:
- You need autoscaling for real traffic spikes (not hypothetical ones)
- You need a managed service you'd otherwise babysit: DB replicas, queues, multi-region failover
- Compliance/SOC2 requires attestations you can't get self-hosting
- You're paged about infra more than once a month

→ skipped: migration cost/benefit analysis spreadsheet; when one flip condition above actually hits, revisit that week with real numbers (traffic, egress, hours lost).

</details>

### Case 8 [skill] — Missing key fact: one question or labeled assumptions

Expect: form=any, prd=no
Result: announce=false, form=true, anatomy=true, prdGate=true -> NEEDS REVIEW
Tokens: prompt 4760, completion 4031, total 8791

<details><summary>Raw output</summary>

Council material for sure — but Step 1 gates it: there's one missing fact that flips the verdict in either direction, so you get exactly one question before I convene.

**The one question: what's actually pushing you to move?**

Specifically — is something *hurting* right now (cloud bill anxiety, traffic growth the box can't absorb, outages, a customer/enterprise demanding SOC 2 or similar), or is this preemptive "future-proofing"?

Stated assumptions for everything else: solo dev or small team, one or a few VPSes, steady moderate traffic, no hard deadline.

Reply with one line — "costs", "traffic", "compliance", "nothing really, just wondering" — and the council runs and you get a single verdict immediately. Or say "assume defaults" and I'll decide on the labeled assumptions above, confidence marked accordingly.

</details>


## A/B summary

| Mode | Auto-passed | Total tokens |
|---|---|---|
| raw (no skill) | 0/8 | 30276 |
| with council skill | 5/8 | 74266 |

Skill mode token delta vs raw at decision time: 145.3%.

Reading this honestly: the skill SPENDS more tokens on the decision itself (five lenses, review, verdict, sometimes a PRD) and buys structure, consistency, and a reusable PRD artifact. The saving this repo claims lives downstream, across the build (PRD reused by small briefs instead of re-explaining in long sessions), which single calls cannot measure. Do not quote the delta above as the project-level figure.
