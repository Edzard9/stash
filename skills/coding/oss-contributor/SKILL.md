---
name: oss-contributor
description: Contribute to someone else's open-source repo the way a maintainer would want. Read the house rules first, screen the claim before touching code, mirror the repo's own accepted patterns, test honestly, and open a clean PR. Use when the user wants to contribute to an external repo, claim or fix a GitHub issue that is not theirs, open an external pull request, or says "contribute to", "claim this issue", "fix this upstream", "kontribusi ke repo", "klaim issue ini", "PR ke repo orang". Do NOT use for work in the user's own repos.
license: MIT
---

# OSS Contributor

A merged PR is a reputation event, not a code dump. Maintainers merge
people they trust, and trust is built by following their house rules
before, during, and after the code. This skill is that discipline, in
order. It was distilled from real contributions that got merged; every
step below exists because skipping it once caused a real problem.

## Ground rules (never bend)

- The human owner approves every push and every PR opening. Nothing goes
  upstream on an agent's own initiative.
- Commits are authored by the human. No AI co-author line, no AI mention
  in commit messages or code, unless the repo's own policy explicitly
  requires disclosure there (then it goes in the PR description, exactly
  where their template asks).
- If the repo's rules forbid AI-assisted contributions, stop and say so.
  Their house, their rules.

## Phase 1 (core): Read the house rules first

Before any code, read: `CONTRIBUTING.md`, the PR template, the issue
templates, and the last few merged PRs from outsiders. Extract, in
writing, before proceeding:

- Claim etiquette: is claiming done by comment, by assignment, or is
  starting work directly allowed (e.g. a "ready for agent" label)?
- Branch naming and commit message conventions.
- PR title format and required body sections (some repos require extras
  like release notes or a changeset; missing them fails CI or review).
- Required checks: tests, lint, typecheck, formatting, and how to run
  them.
- Any AI disclosure policy.

If the repo gates work behind assignment (you must be assigned before
opening a PR), that gate outranks everything else in this skill.

## Phase 2 (core): Screen the claim, three layers

Never start coding on an issue until all three layers are checked:

1. **Assignees.** Is anyone already assigned? Assigned means taken, even
   if no code exists yet.
2. **Every comment.** Read all of them, not the first few. Claims are
   often made in prose ("I'm working on this"), and maintainers often
   leave scope rulings that redefine the issue.
3. **Related PRs, open AND closed.** Search PRs that mention the issue.
   An open one means a race you may already be losing. A closed one in an
   assignment-gated repo is a trap signal: the work exists but was blocked
   by process, and claiming now means trampling someone else's finished
   work.

Verdicts: **claimable** (all layers clear), **claimed** (someone holds
it, walk away or pick another issue), **gated** (post the claim comment
and wait for assignment), **trap** (work done but process-blocked, walk
away and note why).

## Phase 3 (core): Mirror the repo's own patterns

Find how this codebase already solved a similar problem, an earlier fix
for a sibling bug is the strongest style guide that exists. Match its
structure, naming, and test shape. A fix that follows the repo's own
accepted pattern beats a cleverer original one; in a real duplicate race,
the pattern-faithful PR was the one the review bot rated stronger.

## Phase 4 (core): Build and test honestly

- Make the smallest change that fixes the issue. Scope creep in a first
  contribution reads as noise.
- Run the repo's own checks for the touched area, and add tests in the
  repo's existing test style when the fix warrants them.
- **Distinguish baseline from blame.** If the suite shows failures, run
  the same suite on a clean checkout of the base branch. Failures that
  exist there too are environment baseline, not your regression, say so,
  with that evidence, instead of either panicking or hiding them.
- Report exactly what you ran. "The 33 tests around this change pass;
  the full suite has 56 pre-existing failures, identical on clean main"
  is a claim a maintainer can trust. "All tests pass" when you ran a
  subset is not.

## Phase 5 (core): Commit and PR

- Branch per the house convention, from an up-to-date base.
- Commit messages in the repo's convention, authored by the human, clean
  of AI co-authorship.
- PR body: what changed and why, the test evidence from Phase 4, and the
  issue link with its closing keyword (`Fixes #123` / `Closes #123`)
  **in the PR body itself**, a keyword buried in a changeset or a commit
  message does not trigger auto-close, and claiming it does is a known,
  embarrassing error. After opening, re-read the PR page and confirm the
  issue is actually linked.
- Fill every section of their PR template, including AI disclosure where
  asked.

## Phase 6 (core): After the PR is open

- Do not lobby, do not ping early, do not argue with review bots. Silence
  from maintainers means busy, not hostile; outcomes arrive by
  notification and email on their own.
- If you discover a duplicate of your PR (opened minutes apart happens),
  do not attack it and do not withdraw in a huff. Leave the choice to the
  maintainers; a graceful line in your own PR noting both exist is enough.
- Answer review with fixes, not defenses. If a review point is wrong,
  answer with evidence (a test, a doc quote), once, politely.
- A maintainer merging with zero comments is a complete sentence. Thank
  them in one line if the repo culture does that, then stop.

## Verification gate

Before telling the user the contribution is ready or open, check:

- [ ] House rules read and their checklist (format, tests, extras) met.
- [ ] Claim screen: all three layers checked, verdict stated.
- [ ] The change mirrors an existing in-repo pattern, or says why none fit.
- [ ] Test report separates baseline failures from regressions, exactly.
- [ ] Closing keyword verified in the PR body on the live PR page.
- [ ] No AI co-author anywhere in commits; disclosure placed where the
      repo's policy wants it.
