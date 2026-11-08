---
name: interactive-figure
description: Build a single-file interactive HTML figure for a study concept: a diagram the student can click, break, and watch respond, with a live readout of the quantity that changes. Use when the user wants an interactive diagram, a clickable explainer, a simulation for a concept, or says "figur interaktif", "buatkan simulasi", "diagram bisa diklik", "visualisasi konsep". Do NOT use for videos (that is html-video) or static thumbnails.
license: MIT
---

# Interactive Figure

A diagram explains. A figure you can break teaches. The difference is
the interaction loop: change something, watch the system respond,
read the number. This skill builds those figures as one
self-contained HTML file, for networking and coursework concepts
first, but the pattern holds for anything with parts and a quantity.

Inspired by the anatomy skill's interactive isometric figures (MIT,
credited in this repo's adaptation notes); written from scratch in
this repo's own approach.

## The pattern (every figure has all four)

1. **A drawn system.** SVG or canvas, top-down or schematic, with the
   parts a student must distinguish actually distinguishable: labeled,
   spaced, and colored by role, not by decoration.
2. **One meaningful interaction.** Click a cable to break it, toggle
   a device, move a slider, send a packet. The interaction must be
   the concept's own variable, the thing the exam asks "what happens
   when this changes".
3. **A live readout.** The quantity the concept is about, recomputed
   and displayed on every change: total bandwidth, hop count, loss
   percentage, queue length. If the readout does not change, the
   figure is a poster.
4. **A reset.** One click back to the intact system, because students
   break things in the wrong order and should never be stuck.

## Build rules

- **One file, no dependencies.** Inline CSS and JS in a single HTML
  file. It must open from disk, from a phone, and from a school
  network that blocks CDNs. If it needs a build step, it is the
  wrong artifact.
- **Deterministic state.** The figure's state lives in one small data
  structure; the drawing is a function of it. Randomness, if any, is
  seeded or removed. Two students performing the same clicks see the
  same result.
- **Touch-first sizing.** Targets at least 44px, layout that survives
  a phone screen, text that stays readable at arm's length. The
  reviewer is usually holding a phone.
- **Labels in the figure, explanation under it.** Names and values on
  the drawing itself; a short caption below stating the concept and
  the one thing to try first ("break one cable and watch the
  total").

## Template

`assets/figure-template.html` in this folder is the starting point: a
two-device diagram, one clickable link, one readout, one reset,
wired end to end. Copy it, replace the drawing and the state logic,
keep the skeleton.

## Verification (before delivery)

- Open the file in a headless browser or by hand: the intact state
  renders, the readout shows the correct starting value.
- Perform the interaction programmatically or manually: the readout
  changes to the hand-computed value. State the expected number
  before checking it.
- Reset returns the figure to the exact starting state.
- Deliver the file itself, plus one sentence on what to try first.
  A screenshot of the intact state is a good companion, never a
  substitute: the value of the artifact is that it moves.
