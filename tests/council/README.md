# Council tests

Raw material behind `skills/council/EVIDENCE.md`: the suite, the
scripts, and the unedited model outputs. Nothing here is summarized;
the EVIDENCE file is the summary.

- `run-council-tests.mjs` — the 8-case decision suite. Runs each case
  raw and with the skill as system prompt (`--ab`), or skill-only.
  Env: `NINEROUTER_KEY` (an OpenAI-compatible gateway key),
  `NINEROUTER_BASE` (default the maintainer's local gateway; point it
  at any compatible endpoint), `MODEL`, `ONLY=3,5` to filter cases.
  Long generations should be streamed on some gateways; the suite's
  parser tolerates streamed and garbled bodies.
- `council-once.mjs` — one streamed council run from a prompt file;
  used to produce the PRD for the build A/B.
- `results/` — raw outputs, in order: 01 first A/B run, 02 regression
  after the gate fixes, 03 multi-model council, 04 chairman re-run,
  05 Gemini matrix run, 06 lean-prototype experiment.
- `CHECKLIST.md` + `BUILD-AB-RESULTS.md` — the build A/B: one real
  tool built from a raw issue brief vs from a council PRD, with the
  checklist written before building and the full cost accounting.
- `build/` — the exact briefs the two build arms received, and the
  council output (verdict + PRD) that arm B was built from.
