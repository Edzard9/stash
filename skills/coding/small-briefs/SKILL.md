---
name: small-briefs
description: Split a big build into small, self-contained briefs for a coding agent, run them in sequence, and verify each piece before sending the next. Use when delegating a multi-part build to a coding agent (opencode, Claude Code, Codex), when a task has many steps or many files, or when the user says "break this down", "pecah tugas ini", "delegasikan", "brief untuk opencode", "kerjakan bertahap". Do NOT use for a single small change that fits in one instruction.
license: MIT
---

# Small Briefs

A coding agent given one giant brief does not fail loudly. It stalls:
the process looks alive, the log looks calm, and nothing comes out.
This happened twice in one day on a real project, on a run of 100+
generation tasks handed over at once. The same work, split into small
sequential briefs with a check after each one, finished the same
evening. This skill is that splitting discipline. It exists because
the giant brief is the most expensive way to discover it.

## The rule

One brief, one outcome, one verification. A brief is done when its
finish line is visible in the real artifact, not when the runner
reports healthy signals.

## What a brief contains

Every brief is self-contained. The agent receiving it has none of your
conversation, so each brief carries:

1. **The outcome**, in the user's terms: what exists when this piece
   is finished.
2. **The exact constraints**: paths, ports, names, versions, limits,
   the choices already made. Nothing the agent would have to guess.
3. **The finish line**: the check that proves it worked, for example a
   file that exists with specific content, an endpoint that answers, a
   test that passes, a number that matches.
4. **What is out of scope** for this piece, so the agent does not
   wander into the next piece or rebuild a finished one.

Long briefs go in a file the agent reads, not pasted as a wall of
text. Anything a human must copy by hand stays short and single-line.

## How to split

- **Cut at verification seams.** Each brief ends somewhere you can
  check independently: a scaffold that runs, one feature that works,
  one batch of assets that exists. If you cannot describe the check,
  the cut is in the wrong place.
- **Batch size is a safety limit, not a target.** For bulk generation
  (assets, files, near-identical items), about 20 per brief is the
  proven ceiling in this workflow; 100+ in one brief is the documented
  stall. When a run stalls, do not resend the same brief bigger or
  louder. Halve it.
- **Order by dependency, run in sequence.** Brief N+1 is written after
  brief N's check passes, and may depend on what N actually produced,
  which is often not quite what the plan assumed.
- **Parallel only when the road is proven.** Truly independent briefs
  may run in parallel only on infrastructure already shown to hold
  under load. On a fragile route, parallel runs corrupt each other:
  outputs mix, gateways fall over, and the failure looks like a model
  problem when it is a load problem. Serial is slower and finishes.

## Running the pieces

- **Launch long runs supervised.** A backgrounded agent process can
  die silently a minute in, leaving a clean-looking log. Use the
  platform's supervisor (a systemd unit, a task runner, a session
  manager) so the run outlives the shell that started it.
- **Wait on the supervisor's state, not on text matching.** Polling a
  process list for words from the brief matches the waiter's own
  command line and hangs forever. Poll the unit's active state, the
  output file's growth, or the finish line itself.
- **Verify before you celebrate, and before the next brief.** Open the
  artifact, run the check, compare the number. A successful launch, a
  running process, and a calm log are none of them evidence.
- **Report per piece.** After each brief: what was checked, what
  passed, what is next. The human should never have to ask whether
  piece 3 of 7 is done.

## When a piece fails

- Name the stall fast. A run that produces nothing is a failed brief,
  not a slow one; switch method instead of waiting it out.
- Shrink and retry the piece, not the whole job. Finished pieces stay
  finished.
- If the same piece fails twice at the same size, the brief itself is
  probably ambiguous or overloaded. Rewrite it smaller and more
  explicit before spending a third run.

## What this skill is not

- Not a project plan. It does not decide what to build; it decides the
  size of the pieces a decided build is handed over in.
- Not a reason to fragment trivial work. A one-line fix gets a one-line
  brief.
