---
name: lab-report
description: Write a practicum or lab report in a fixed, proven house format: identity header, per-point observations each followed by a one-line "what it means", a short conclusion, the observation table, and Q&A-style evaluation answers. Use when the user asks for a lab report, practicum report, observation write-up, or says "buatkan laporan praktikum", "laporan praktikum", "hasil pengamatan", "tulis laporannya". Do NOT use for essays, journals, or research papers.
license: MIT
---

# Lab Report

A practicum report is a form, not an essay. The lecturer checks it
against a rubric, point by point, so the report wins by being complete,
exact, and short, in the same shape every time. This skill is that
shape, plus the rules that keep it honest. It comes from real submitted
reports, and every rule below exists because breaking it once caused a
real correction.

## The format (always this skeleton)

```
Nama  : <full name>
NPM   : <student ID>
Kelas : <class>

LAPORAN PRAKTIKUM <number>: <topic>

Hasil Pengamatan
1. <what was observed, 1-3 relaxed sentences>
   Artinya: <what it means, 1-2 sentences>
2. ...

Kesimpulan
<one short paragraph, no new facts>

Lembar Hasil Pengamatan
| No | Kegiatan | Hasil |
|----|----------|-------|
| 1  | ...      | ...   |

Soal Evaluasi
1. <question>
   Jawab: <answer, direct, no padding>
```

- The identity block uses the user's own name, student ID, and class.
  Take them from what the agent already knows about the user; if they
  are unknown, ask once and reuse them for every later report.
- If the user supplies an example report of their own, match its
  sections exactly and drop any section the example does not have.
  Their accepted example outranks this skeleton.

## Ground rules (never bend)

- **Never invent an observation.** Write only what the user actually
  did and saw: their screenshots, pasted outputs, and stated results.
  Numbers are copied exactly from the source (0% packet loss stays
  0%, an IP address is copied digit for digit), never rounded,
  improved, or filled in from what "usually happens". Missing data is
  a question to the user, not a gap to fabricate over.
- **Brevity is the format.** Each observation point is a few sentences,
  each "Artinya" line is one or two. A draft that reads like a textbook
  chapter is wrong even if every fact in it is right; the user will
  send it back to be cut. When in doubt, cut.
- **The lecturer's file is the authority, with one exception.** Modules
  and assignment files sometimes contain a part that is deliberately
  wrong. Follow the file as given; if a step is demonstrably wrong,
  propose the correct alternative and confirm with the user before
  deviating. Never silently fix it, never silently follow an error
  either.
- **Check against the rubric as text.** Before delivering, compare the
  draft line by line with the task criteria. A step the user performed
  but the draft never states still counts as a gap until it is written
  in. The report is judged on what it says, not on what was done.
- **Hand back a finished file.** Deliver the report as one simple DOCX
  (or the format the user asked for), already filled in, not as
  instructions for filling it in. Change nothing outside what was
  asked: no font, layout, or formatting "improvements".

## Workflow

1. Gather the material: practicum topic and number, the steps taken,
   the observed results (screenshots or pasted output), and the
   evaluation questions if the task has them. Ask for what is missing,
   once, in one message.
2. Draft into the skeleton above, one observation point per step or
   result, in the order the work happened.
3. Run the rubric check: every criterion named in the task appears in
   the draft, every number matches its source, every evaluation
   question has an answer.
4. Deliver the finished file. A one-line summary of what is in it is
   enough; do not paste the whole report into the chat unless asked.

## Language

The report body is written in relaxed academic Indonesian (Bahasa
Indonesia) by default, because that is the format's origin; switch
languages only when the user asks. Keep the technical terms in their
usual form (command names, protocols, and addresses stay as-is).

## What this skill is not

- Not an essay or journal writer; the skeleton above is the whole
  product.
- Not a way to produce results the user did not get. If the practicum
  failed, the report says what actually happened; a failed ping,
  honestly reported with its cause, is a complete observation.
