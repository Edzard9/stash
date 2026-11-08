# Example: launch caption set for this repo

Written with this skill for the stash launch post (the VLAN demo
video). ID first, EN as a rewrite below the divider, per the
bilingual rule. Ready to paste; publishing is the author's tap.

---

**ID**

Satu prompt masuk, satu video 30 detik keluar.

Video "What is a VLAN?" ini dirender oleh skill html-video dari repo
stash: agen menulis satu file animasi HTML, setiap frame ditangkap
otomatis, lalu dirakit jadi MP4 1080x1920. Tanpa model video, tanpa
kuota, tanpa drama region.

Di tengah jalan ketemu satu bug asli di template-nya: scene yang
belakangan menimpa scene sebelumnya. Karena bangunnya dipecah jadi
brief kecil, bug-nya ketangkap di potongan ke-3, bukan sesudah render
penuh terbuang.

Repo-nya berisi skill agen AI yang semuanya teruji seperti ini,
lengkap dengan angka dan output mentahnya. Pasang semua dalam satu
perintah: npx skills add Edzard9/stash

---

**EN**

One prompt in, one 30-second video out.

This "What is a VLAN?" video was rendered by the html-video skill
from the stash repo: the agent writes one deterministic HTML
animation, every frame is captured automatically, and FFmpeg
assembles a 1080x1920 MP4. No video model, no quota, no region lock.

Halfway through, the build caught a real bug in the skill's own
template: later scenes were overwriting earlier ones. Because the
work was split into small briefs, the bug surfaced in piece three,
not after a wasted full render.

The repo collects AI agent skills that are all proven this way, with
the numbers and the raw outputs published. Install them all in one
command: npx skills add Edzard9/stash
