Running the **lite council** for this: one file, cheap to reverse, few options. Three lenses (Skeptic, Reframer, Operator), no cross-review (dropped by the lite form), I synthesize the verdict. Escalation to full only if they split sharply.

## 1. Frame

- **Decision:** what `kalkulator-ipk` (issue #2, kategori kuliah) must and must not do, so a blind builder agent can code it from the PRD alone.
- **Options (single-idea form):** A ship as written / B ship smaller (semester-only, drop cumulative) / C do not build.
- **Already fixed, not decisions:** grade scale (A=4, AB=3.5, B=3, BC=2.5, C=2, D=1, E=0), SKS 1-6, one file `tools/kalkulator-ipk.js`, `registerTool(...)` + `LANG.aktif` string table, sw.js BERKAS entry, index.html script above app.js, no em-dash, offline, zero dependencies.
- **Actually open:** cumulative UX (mode machinery vs. two fields), row defaults, math on incomplete rows, number formatting, persistence.
- **Stakes:** wrong assumption ships as user-visible confusion; still a one-file fix. **Assumptions (unchecked):** a tool #1 exists to mirror for house style; decimal-render convention is not pinned by the repo.
- No deadline.

## 2. Mini-PRD v0 (frame artifact)

- **Problem:** students compute IP by hand when grades post; cumulative students do worse nested arithmetic.
- **Target user:** an Indonesian student with a transcript open, once a semester, ~30 seconds, likely mobile.
- **Scope in:** dynamic rows (name optional, SKS 1-6, grade), live totals, opt-in cumulative pair.
- **Scope out:** persistence, history, export.
- **Constraints:** the repo contract list above.
- **Success:** 3 SKS A + 2 SKS B → 3.60, live, bilingual, offline.

## 3. Lite lenses (single-model mode, run in isolation)

**Skeptic**
- **Verdict:** build it, but the spec has two silent-corruption traps.
- **Strongest points:** (1) A half-filled cumulative pair (prev GPA typed, prev SKS blank) is the only place this tool can display garbage or a wrong "combined" number with no error; it needs a paired-validity rule, not hope. (2) Rows with no grade chosen: if they counted as zero, one forgotten select silently drags the IP down and the user believes it. Untouched rows must be ignored until graded. (3) Points are floats (3.5 × 2 SKS); raw division gives 3.6000000000000005. Output must be formatted to two decimals, which is also what the "3.60" acceptance line demands.
- **Biggest risk:** a "IPK gabungan" that is silently semester-only because one field was empty. A wrong number worn as a right one.
- **Flip condition:** if paired validation needs an audible error state, it's overdone; a quiet hint line that the user can't even trigger by accident is the correct size.

**Reframer**
- **Verdict:** ship as written; the issue is already the minimum.
- **Strongest points:** (1) The real job: transcript on screen, "berapa IP-ku sekarang?" A 30-second single-visit calculation. Anything demanding a second visit (saving, accounts) is misframed. (2) "Mode" is the wrong word for cumulative: no mode machinery, just two optional fields behind one checkbox, off by default. (3) Course name is dead weight mathematically but costs one optional input and settles "which row is which"; keep it, never require it.
- **Biggest risk:** "combines previous semesters" inviting a semester-history system, when two numbers (prev IPK, prev SKS) fully determine the answer.
- **Flip condition:** evidence that students return to update one grade would make persistence matter; nothing in the issue says they do.

**Operator**
- **Verdict:** one file, ~150 lines, ships today.
- **Strongest points:** (1) `<select>` for SKS and grade makes out-of-range input unreachable at the platform level, deleting all validation on the multiply path; native `number` + min/max covers the two cumulative fields. (2) One delegated `input` listener on the rows container recomputes everything; no per-row rewiring on add/remove. Cumulative reveal is a checkbox toggling a hidden div. (3) Blast radius: one file plus two registration lines; if wrong, delete and rebuild by lunch.
- **Biggest risk:** the builder invents structure (state object, render loop, classes) the math never needs. The spec should forbid scaffolding: read the DOM, print the DOM.
- **Flip condition:** tool #1's code or LANG pattern diverges from the contract text; then the code wins over this spec.

No sharp split, no Operator escalation flag: full council stays unsummoned.

## 4. Chairman's verdict

- **Where they agree:** scope as written is already minimal. Cumulative is two optional paired fields, not a mode engine or a semester list. Nothing persists. Native selects beat free inputs. No scaffolding.
- **Where they clash:** presumptive defaults. Operator wants SKS preselected to shave taps; Skeptic refuses any default on the grade, because the counted-row rule keys off it: a default A fabricates a 4.00 for anyone who stops typing. **Resolution:** SKS defaults to 3 (harmless, grade still gates counting), grade never defaults.
- **Recommendation:** **Build A, ship as written**, one file, with the four rulings below. Confidence: **high**. The acceptance math is fully determined by the issue, and every contested case is covered by two counting rules plus test vectors; residual risk is cosmetic.
- **Deciding factor:** a row counts only once its grade is chosen; the combined IPK renders only when both previous-semester fields are valid numbers. Every invalid state is simply absent from the screen: never counted as zero, never NaN.
- **Flip condition:** if tool #1 reveals an established optional-section or number-format pattern, the cumulative section and formatting follow house style over this PRD's specifics.
- **Next step:** hand the PRD below to the builder; its first action is mirroring tool #1's file and registration lines.

Killed as overbuild: localStorage, per-semester history, drag reorder, quality-points column, export/print, custom grade scales, per-row listeners, accordion for the reveal. Restored as underbuild: two-decimal formatted output (the issue's "3.60" requires it), the half-filled hint string, `aria-live` on results, a minimum-one-row rule, a second test vector.

**Disclosure:** lite form (Skeptic, Reframer, Operator), single-model mode: one agent played each advisor in sequence, discarding prior conclusions; cross-review omitted per lite form; no external models.

## 5. PRD: kalkulator-ipk

**Problem**
Students compute the semester GPA (IP) and, in later semesters, the cumulative GPA (IPK) by hand. The formula is known; the friction is arithmetic.

**Target user**
An Indonesian student with a transcript in hand, once per semester, ~30 seconds, likely mobile.

**Decision recap**
Build as written. Cumulative is two optional paired fields behind a checkbox, off by default, no mode machinery. Deciding factor: two counting rules run the whole validation story: a row counts only when its grade is chosen; the combined IPK renders only when both previous-semester fields are valid. Flip condition: house patterns in tool #1 override this PRD where they overlap.

**Scope in**
Dynamic course rows (name optional, SKS 1-6, letter grade), live total SKS and semester IP, opt-in cumulative pair producing the combined IPK.

**Scope out**
Persistence (localStorage or otherwise), per-semester history lists, row reordering, export/print/share, percent conversion, custom grade scales, quality-points column, any build step or dependency.

**Core features**
1. **Rows:** optional name `<input type="text">`, SKS `<select>` (1-6, default 3), grade `<select>` (A, AB, B, BC, C, D, E; placeholder option, no default; points from a map or `data-poin`). Row contributes only once a grade is chosen. Initial screen: two rows.
2. **Add/remove:** "add" button appends a row; per-row remove button; minimum one row; recalc on any add/remove.
3. **Live results:** one delegated `input` listener on the rows container; displays total counted SKS and semester IP, always two decimal places (`Intl.NumberFormat`, minimumFractionDigits 2; locale from LANG, defer to house convention if one exists).
4. **Cumulative pair:** checkbox reveals previous IPK (`type="number"`, min 0, max 4, step 0.01) and previous total SKS (`type="number"`, min 1, step 1). Combined IPK = (prevIPK × prevSKS + Σ SKS × poin) / (prevSKS + countedSKS). Renders whenever both prev fields are valid; with zero counted courses it correctly equals the previous IPK.
5. **Half-filled guard:** exactly one of the pair filled (or one invalid) hides the combined number and shows an inline hint string. No NaN on screen in any state; fresh page shows 0 SKS and IP 0.00.
6. **Contract:** file `tools/kalkulator-ipk.js`; on DOMContentLoaded: `registerTool({id:'kalkulator-ipk', nama:'Kalkulator IPK', namaEn:'GPA Calculator', kategori:'kuliah', ikon: house-convention, deskripsi:'Hitung IP dan IPK dari SKS dan nilai huruf.', deskripsiEn:'Compute your GPA from credits and letter grades.'})`; add to sw.js `BERKAS` and a script tag in index.html above app.js. Mirror tool #1's DOM structure and house style exactly.
7. **Bilingual + accessibility:** all copy from a local string table keyed by `LANG.aktif`, zero hardcoded strings; every input has a bound `<label>`; results block is `aria-live="polite"`; visible focus; **no em-dash in any string or source**.

**Constraints**
Vanilla JS, one file, stdlib only, works offline, no new dependencies, no scaffolding: no state object, no render loop, no config surface. Read the DOM, print the DOM.

**Suggested string table** (builder may polish; both languages required)
- `nama`: "Nama matkul (opsional)" / "Course name (optional)"
- `sks`: "SKS" / "Credits"
- `nilai`: "Nilai" / "Grade"
- `tambah`: "Tambah mata kuliah" / "Add course"
- `hapus`: "Hapus" / "Remove"
- `ipSem`: "IP semester ini" / "Semester GPA"
- `totalSks`: "Total SKS" / "Total credits"
- `kumulatif`: "Hitung IPK kumulatif" / "Include previous semesters"
- `ipLalu`: "IPK sebelumnya" / "Previous cumulative GPA"
- `sksLalu`: "Total SKS sebelumnya" / "Previous total credits"
- `ipGabungan`: "IPK gabungan" / "Combined cumulative GPA"
- `belumLengkap`: "Isi IPK dan total SKS sebelumnya untuk melihat IPK gabungan." / "Fill in both previous GPA and previous credits to see the combined GPA."

**Success criteria** (vectors checked numerically or in EN mode so the comma never fails a test)
1. Rows A × 3 SKS + B × 2 SKS → total 5, IP 3.60, updating live on every selection, no submit button.
2. Adding an empty row changes nothing.
3. Removing the B row → 4.00 (12/3).
4. With vector 1 plus prev IPK 3.20 / 40 SKS → combined 3.24 (146/45).
5. Clearing the prev-IPK field (credits still filled) hides the combined number, shows the hint, leaves semester IP untouched.
6. Fresh page: 0 SKS, IP 0.00, no NaN anywhere, cumulative section hidden.
7. Language toggle re-renders every visible string, including buttons and hint.
8. Offline reload after first visit works; no console errors; no em-dash in source or UI.

If you want to continue the chain, I can split this PRD into ordered build briefs via the vault's `small-briefs` skill; at ~150 lines it barely needs splitting.