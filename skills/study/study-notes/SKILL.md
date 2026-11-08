---
name: study-notes
description: Turn lecture material (slides, PDFs, module text) into compact study notes plus question=answer flashcards, one pair per line, ready to paste into a quiz tool. Use when the user wants material summarized for studying, flashcards made, or says "buatkan catatan", "ringkas materi", "flashcard", "buatkan soal latihan", "summarize these slides". Do NOT use to do the assignment itself or to summarize material the user has not provided.
license: MIT
---

# Study Notes

Reading slides twice is not studying. This skill converts lecture
material into the two artifacts studying actually uses: a compact
note that fits the topic on a page or two, and a deck of flashcards
that asks the questions the exam will ask, in a format any quiz tool
can import.

## Input discipline

- Work only from the material provided: the slides, PDF, module, or
  pasted text from this session. If a concept is missing from the
  material, it stays missing; do not complete the topic from general
  knowledge and present it as the lecturer's material. Additions the
  user asks for are labeled as additions.
- Keep the lecturer's terms and definitions. When the material
  defines something its own way, the note uses that definition, even
  if textbooks phrase it differently. Exams grade the course's
  version.

## The notes

- One short section per topic, in the material's order.
- Each section: the definition in one line, the mechanism in two or
  three, and one concrete example or number from the material.
- Tables where the material compares things; the comparison is
  usually the exam question.
- Cut ruthlessly: slide furniture, repeated introductions, and
  examples that illustrate nothing new. A note longer than a fifth of
  the source is a summary failure.

## The flashcards

- Format: `question=answer`, exactly one pair per line, nothing else
  on the line, so the whole block pastes into a quiz tool as-is.
- One fact per card. A card asking two things is two cards.
- Ask the way an exam asks: definitions, contrasts ("what is the
  difference between X and Y"), consequences ("what happens when"),
  and numbers from the material. Avoid yes/no cards and cards whose
  question contains the answer.
- 10-25 cards per topic is the useful range. More than that and the
  deck stops being reviewed.

Example lines:

```
Apa fungsi subinterface pada router-on-a-stick?=Membagi satu interface fisik menjadi interface logis per VLAN, masing-masing menjadi gateway VLAN-nya
Berapa hop tracert PC-A ke PC-B pada praktikum inter-VLAN?=2 hop: gateway VLAN asal, lalu PC tujuan
```

## Deliverable

The notes as a document (Markdown or DOCX, as asked), and the
flashcard block as plain text in the same delivery, ready to copy in
one selection. State the source material used, in one line, so the
user knows exactly what the notes cover and what they do not.
