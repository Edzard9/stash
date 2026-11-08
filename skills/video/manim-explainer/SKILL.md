---
name: manim-explainer
description: Create short math and science explainer animations with Python Manim: from a concept to a scene plan, a minimal project, a render command, and a verified output file. Use when the user wants a Manim animation, a math explainer video, or says "animasi manim", "buatkan animasi konsep", "manim explainer", "animate this concept". Do NOT use for general web-animation videos (that is html-video) or interactive figures.
license: MIT
---

# Manim Explainer

Manim rewards the same discipline as every render pipeline in this
repo: plan the scenes on paper first, render low quality early, and
verify the file, not the feeling. A Manim scene that "ran without
errors" can still be a black screen with the text off-frame; only
the output frames tell the truth.

## Workflow

1. **Concept to beats.** Write the explainer as 3-6 beats, one idea
   per beat, each with the sentence it visualizes. If a beat needs
   two ideas, it is two beats. This list is the storyboard; no code
   before it exists.
2. **Scene per beat or one scene with timed sections.** For short
   explainers (under 60 seconds), one Scene class with a method per
   beat keeps timing and cleanup manageable.
3. **Prefer geometry over typeset math when the environment is bare.**
   Text and shapes render anywhere; heavy TeX layouts need a full
   LaTeX install that small servers often lack. Use plain text
   objects for labels and numbers unless TeX is confirmed present,
   and confirm it before writing the scene, not after the failure.
   The same bareness applies to installation: Manim's cairo
   dependency builds from source under pip, so on a server with no
   C compiler `pip install manim` fails. On such a machine use a
   conda-forge environment (prebuilt binaries) instead. Check for a
   compiler before choosing the install route, not after the failed
   build. (Learned on a real render, 8 November 2026; see examples/.)
4. **Render low first.** `-ql` (480p) for the timing pass, watch it,
   fix pacing, then `-qm` or `-qh` for the delivery render. A pacing
   mistake found at low quality costs a minute; at high quality it
   costs the evening.
5. **Verify the artifact.** Probe the MP4 (duration, resolution,
   fps) and extract frames at the first, middle, and last beats.
   Each frame must show its beat's content, composed inside the
   frame. A scene whose text overflows is a failed render with a
   successful exit code.

## Minimal project shape

```
project/
  scenes.py        one file, one Scene subclass per video
  render.sh        the exact commands, low and high quality
  out/             rendered files (the deliverables live here)
```

Keep scenes.py self-contained: no shared utility modules until the
second video exists. Name the output file after the concept, not the
scene class.

## Pacing rules

- A beat holds for at least as long as its sentence takes to read
  aloud, plus a breath. Animations that outrun reading teach nothing.
- One transformation at a time. Two objects moving while text
  appears is three things to watch, which is zero things learned.
- The final frame is a summary state worth screenshotting: the
  completed diagram, the final value, the whole picture assembled.

## Failure notes

- Missing LaTeX is the most common environment failure; see rule 3.
- Long renders belong on the bigger machine, supervised like any
  long job, with the log checked for the render's own progress
  lines rather than the process merely existing.
- Fonts: stick to fonts present on the render machine, and verify
  the extracted frames, because a fallback font changes line breaks
  and can push text out of frame silently.
