---
name: title-card
description: Make static title cards and thumbnails from HTML templates rendered to PNG, using the same deterministic render path as the html-video skill (frame 0 of the animation is the card). Use when the user wants a thumbnail, a title card, a cover image for a video or post, or says "buatkan thumbnail", "title card", "gambar judul", "cover". Do NOT use for moving content or for editing photographs.
license: MIT
---

# Title Card

A good thumbnail is a video's first frame doing a second job. This
skill is a spin-off of html-video in this repo: the card is an HTML
composition, rendered with the same deterministic capture pipeline,
seeking frame 0 instead of capturing a sequence. One source of truth
for how a project's visuals look, whether they move or not.

## The composition rules

- **One message.** A title card says one thing: the topic, in the
  fewest words that stay accurate. If the title needs a comma and an
  "and", it is two cards.
- **Readable at 5% size.** The card will mostly be seen as a small
  rectangle in a feed. Test by shrinking: if the main words cannot be
  read at thumbnail size, the type is too small or the words too many.
- **Two or three elements, no more.** Title text, one visual anchor
  (a diagram piece, a device, a number), and the background. A fourth
  element competes; remove it.
- **Contrast is a feature.** Text over a quiet zone of the image,
  never over the busy part. Dark card, light type, one accent color
  that matches the video or series.

## Templates

`assets/` holds three starting points, all 1080x1920 (vertical, for
Shorts-style feeds) unless resized: `card-big-type.html` (title is
the visual), `card-diagram.html` (a diagram anchor with the title
under it), `card-number.html` (one big measured number as the hook).
Copy one, replace text and anchor, keep the layout bones.

## Render

1. Open the card HTML in the capture pipeline from html-video
   (Playwright, fixed viewport, device scale 2 for crisp text).
2. Capture frame 0 as PNG. No animation runs; if the template
   inherits motion from a video project, freeze it at the composed
   state.
3. Verify: view the PNG at full size and at 96px wide. Both must
   work. Check the file is a real PNG of the intended dimensions
   before delivering.

## Rules

- The card must be derivable again: keep the HTML beside the PNG.
  A thumbnail nobody can regenerate gets remade badly later.
- Use the project's real visuals (a frame or diagram from the actual
  video), never stock decoration that promises content the video
  does not have.
- Text on the card is the video's actual title or a faithful
  shortening of it. Clickbait the content cannot cash is a debt.
