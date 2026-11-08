# Build A/B checklist — PerkakasID tool #2 Kalkulator IPK (written BEFORE any build)

Same checklist, same test vectors for both arms. Selector details may adapt
to each arm's DOM (like a human tester would); vectors and pass bars do not.

1. `tools/kalkulator-ipk.js` exists; registers id `kalkulator-ipk`,
   kategori `kuliah`, with nama, namaEn, deskripsi, deskripsiEn.
2. Script tag in `index.html` above `app.js`; entry in `sw.js` BERKAS;
   CACHE bumped from `perkakasid-v3`.
3. GPA math: rows (3 SKS, A) + (2 SKS, B) display **3.60**.
4. Real-time: changing any input updates results with no reload.
5. Dynamic rows: add a row and remove a row; totals follow.
6. Cumulative: previous 40 SKS at 3.00 + the semester from #3 (5 SKS at
   3.60) displays **3.07** ((120 + 18) / 45 = 3.0667).
7. Empty state: with no complete rows, no `NaN` appears anywhere.
8. Bilingual: switching the app language to EN changes the tool's labels.
9. Scale completeness: a single row (2 SKS, AB) displays **3.50**
   (proves AB = 3.5 exists, BC = 2.5 checked in code).
10. Hygiene: no console errors on load; no em-dash in the new tool file.

Cost accounting per arm: all 9Router usage rows during the arm's window
(build + any fix round). Arm B additionally counts its council call.
One fix round per arm, fed with this checklist's failures verbatim.
