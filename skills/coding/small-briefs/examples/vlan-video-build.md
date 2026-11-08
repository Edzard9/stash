# Example: one build, five briefs

A real build, delegated on 8 November 2026: a 30-second vertical
explainer video, "What is a VLAN?", rendered by the html-video skill's
own pipeline. The whole job as one brief would have been: write a
five-scene HTML animation, a frame-capture renderer, verify
determinism, and deliver an MP4. It was handed over as five briefs
instead. Each brief below is condensed; the finish lines are the
actual checks that were run.

**Brief 1: Scaffold and template read-through.**
Outcome: project folder with the skill's template copied in, tooling
confirmed (Node, Playwright, FFmpeg present).
Finish line: the template opens and a single test frame renders.

**Brief 2: Scenes 1-2.**
Outcome: the opening scenes (one network cable for the whole office;
the office split into rooms) playing in the animation.
Finish line: frame captures at the scene timestamps show the intended
layout, captions present.

**Brief 3: Scenes 3-5.**
Outcome: the remaining scenes (one shared switch with VLAN labels,
traffic staying inside its VLAN, the closing summary).
Finish line: frame captures for all five scenes, one per scene.
This brief surfaced a real bug: later scenes were overwriting earlier
ones in the template's scene loop. Because the build was in pieces,
the bug was found in the piece that exposed it, fixed in the demo, and
the same fix was later applied to the skill's shipped template.

**Brief 4: Full render and determinism check.**
Outcome: out/what-is-a-vlan.mp4, 1080x1920, 30fps.
Finish line: duration exactly 30.0s, and a second render produced a
byte-identical file.

**Brief 5: Delivery package.**
Outcome: the MP4 plus one still frame per scene for human review.
Finish line: file sizes and frame contents confirmed; the human's
visual verdict is the closing step, and it belongs to the human.

Note what the splitting bought: the template bug was caught by
brief 3's finish line instead of after a full render, no brief had to
be re-run from zero, and every stage had a check a human could look
at. The single-brief version of jobs like this is the one that stalls.
