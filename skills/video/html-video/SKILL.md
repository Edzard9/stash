---
name: html-video
description: Turn a text brief into a rendered MP4 video by writing one deterministic HTML animation and capturing it frame by frame on the user's own machine with Playwright and FFmpeg. Use when the user asks for an explainer video, kinetic typography, an animated announcement, a data story, or any short video, especially when no video-generation service is available, affordable, or wanted.
license: MIT
---

# HTML Video

Make a real MP4 without any video-generation model. You write a single HTML
file whose animation is a pure function of time, a script photographs every
frame in a headless browser, and FFmpeg stitches the frames into a video.
Everything runs locally and offline.

## The one rule everything depends on

The page MUST expose `window.seek(t)` where `t` is seconds, and calling it
must draw the exact frame for that moment. Rendering jumps from frame to
frame; nothing is ever "played". Therefore, in the frame path:

- No `Date.now()`, no unseeded `Math.random()`, no `requestAnimationFrame`
  progression, no CSS `animation`/`transition` for anything that moves.
- All motion is computed inside `seek` from `t` (transforms, opacity, text).
- No network requests. Inline all CSS and JS; images must be local files.

If a frame cannot be reproduced exactly by calling `seek(t)` twice, the
render will jitter or desync. Treat determinism as a correctness bug, not a
style issue.

## Workflow

1. **Pin the format.** Default: vertical 1080x1920 for Shorts/Reels/TikTok.
   Landscape 1920x1080 when the user says YouTube/desktop. Ask only if the
   destination is genuinely unclear. Default 30 fps, H.264 MP4, no audio
   unless the user provides an audio file.
2. **Storyboard first.** Before writing code, write the scene list and show
   it in your reply or a `scenes.md`: for each scene, its duration, the exact
   on-screen text, and what moves. One idea per scene, 2 to 6 seconds per
   scene, on-screen text short enough to read aloud in the scene's duration.
3. **Build `animation.html`** starting from `assets/template.html` in this
   skill. Implement each scene as a draw step selected by cumulative scene
   durations inside `seek`. Use the easing helpers in the template.
4. **Check prerequisites.** Run `node scripts/check.mjs` from this skill.
   If it reports missing pieces, give the user the one install command it
   prints for their OS and wait for them, or run it if you have permission.
5. **Render.** Copy `scripts/` next to your animation (or reference it by
   path) and run:
   `node scripts/render.mjs animation.html --duration <seconds> --fps 30 --size vertical --out video.mp4`
6. **Verify before reporting.** Probe the output (`ffprobe` or the summary
   the render script prints): duration and dimensions must match the plan.
   Extract 3 thumbnails (start, middle, end) with FFmpeg and look at them.
   Only then report the file path, duration, and size to the user.

## Design rules (defaults, override only on request)

- Safe margin 80 px on all sides (vertical) so platform UI never covers text.
- Minimum sizes at 1080 wide: headline 64 px, body 40 px, caption 34 px.
- One accent color plus neutrals. Flat shapes and type, no gradients as a
  substitute for an idea.
- Every scene change needs a visual event (something moves, builds, or
  transforms); a static slide with a fade is a failed scene.
- End with a 1.5 s end card (title or call to action), included in the total
  duration.

## Audio

Out of scope for generation. If the user supplies an audio file, pass it
through: `node scripts/render.mjs animation.html --duration <s> --audio track.mp3`
and the script muxes it, trimming to the shorter of the two.

## Troubleshooting

- **Black or identical frames**: `seek` missing, threw an error, or the page
  made a network request that never resolved. Open the page, check the
  console, make everything local and synchronous inside `seek`.
- **Jitter between frames**: something in the frame path depends on wall
  clock or randomness. Find it and derive it from `t`.
- **Text blurry or cropped**: viewport size and CSS pixels disagree; keep
  the stage exactly the output size and `deviceScaleFactor` at 1.
- **Render too slow**: drop to `--fps 24`, or halve the size with
  `--size vertical-sm` while drafting; render final quality last.
- **FFmpeg not found**: run `node scripts/check.mjs`; it prints the install
  command per OS (winget/brew/apt) and the Playwright browser install step.
