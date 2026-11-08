---
name: proofread-id
description: Proofread formal Indonesian (Bahasa Indonesia) for assignments and reports: spelling (EYD/PUEBI), effective sentences, standard terms, punctuation, and the classic affix-spacing traps. Edits language only, never content. Use when the user asks to proofread or tidy Indonesian text, or says "proofread", "cek ejaan", "rapikan bahasa", "sunting tugas", "periksa bahasa laporan". Do NOT use to rewrite arguments, translate, or change what the text says.
license: MIT
---

# Proofread ID

A proofread that changes the argument is not a proofread; it is a
rewrite wearing the wrong name. This skill edits the language of
formal Indonesian text (assignments, practicum reports, academic
writing) and touches nothing else: not the facts, not the numbers,
not the structure the author chose, not their voice beyond making it
correct.

## What gets fixed

1. **Ejaan (EYD/PUEBI).** Capitalization, standard spellings, loanword
   forms (sistem, kualitas, aktivitas), and punctuation, including
   the decimal comma in Indonesian numbers (3,60, not 3.60).
2. **The affix traps.** The ones that appear in nearly every draft:
   - `di-` as a prefix (attached: ditulis, dipakai) versus `di` as a
     preposition (separate: di kelas, di atas).
   - `ke-`/`-kan` confusions, and `pun` spacing (apa pun, mana pun
     separate; walaupun, meskipun attached).
   - Redundant pairs: "agar supaya", "demi untuk", "seperti misalnya"
     (choose one).
3. **Kalimat efektif.** Cut filler that adds no meaning ("pada
   dasarnya", "yang mana" chains), fix subjectless formal sentences,
   untangle doubled conjunctions ("karena ... maka ..."), and keep
   one idea per sentence in reports.
4. **Istilah baku.** Prefer the standard term where the draft uses a
   colloquial one in a formal context (menggunakan, not memakai,
   where the register demands it), while leaving established
   technical terms (VLAN, router, server) untouched.
5. **Consistency.** One spelling per term per document, one style for
   lists and numbering, one form for the identity block and headings.

## What never gets touched

- Facts, numbers, names, addresses, and results. A wrong number is
  the author's business; if one looks wrong, flag it in a note, do
  not silently correct it.
- The author's structure and section order, unless they asked for
  restructuring.
- Quoted material, commands, code, and anything inside them.

## How the result is delivered

- The cleaned text, complete, as a finished file or full text, never
  as fragments the user must reassemble.
- A short change list grouped by type (ejaan, imbuhan, kalimat), with
  counts, not a line-by-line dump. Example: "di- terpisah diperbaiki
  4x, koma desimal 2x, satu kalimat dipecah dua."
- Anything flagged-but-not-changed (suspect facts, ambiguous terms)
  listed separately, so the author decides.

## Tone

Formal Indonesian still sounds like a person. The target register is
the relaxed academic Indonesian of a good practicum report: correct,
clear, and short. Over-formalizing into stiff bureaucratic Indonesian
is a failure mode of this skill, not its goal.
