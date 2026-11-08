# Example: Binary Place Value

`scenes.py` is the worked example for this skill: one Scene,
Text and shapes only, no TeX typesetting. It animates the byte
10101101: place labels 128 down to 1 appear, bits flip on one by
one, and a running total accumulates to 173.

Render record (8 November 2026, on a small VPS):

- Route note: a plain `pip install manim` FAILED on this machine.
  Manim's cairo dependency ships as source, and the server has no C
  compiler. The working route was a conda-forge environment
  (micromamba), which provides prebuilt binaries. The skill now
  carries this warning.
- Toolchain: Manim 0.22.1, low-quality render (`-ql`).
- Output probe: 854x480, 15 fps, 8.87 seconds.
- `midframe.png` is a frame extracted mid-animation: place values
  and flipped bits visible, running total reading 160 (128 + 32,
  correct for that point in the sequence). Final total in the full
  render: 173.
