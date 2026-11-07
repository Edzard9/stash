// Prerequisite check for the html-video skill (EN below).
// Cek prasyarat render video lokal: Node, FFmpeg, Playwright + browser-nya.
import { spawnSync } from 'node:child_process';

const isWin = process.platform === 'win32';
let ok = true;

function report(name, good, fix) {
  console.log(`${good ? 'OK  ' : 'MISS'} ${name}`);
  if (!good) {
    ok = false;
    console.log(`     Install / Pasang: ${fix}`);
  }
}

// Node itself is running this script, so it exists; show the version.
console.log(`OK   Node ${process.version}`);

const ff = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
report(
  'FFmpeg',
  ff.status === 0,
  isWin ? 'winget install Gyan.FFmpeg' : process.platform === 'darwin' ? 'brew install ffmpeg' : 'sudo apt install ffmpeg'
);

let pw = false;
try {
  await import('playwright');
  pw = true;
} catch { /* handled below */ }
report(
  'Playwright (npm package)',
  pw,
  'npm init -y && npm i playwright  (in your project folder / di folder proyekmu)'
);

if (pw) {
  const { chromium } = await import('playwright');
  let browserOk = false;
  try {
    const b = await chromium.launch();
    await b.close();
    browserOk = true;
  } catch { /* handled below */ }
  report('Playwright Chromium browser', browserOk, 'npx playwright install chromium');
}

console.log(ok
  ? '\nAll set. Render with / Siap. Render dengan: node render.mjs animation.html --duration 10 --out video.mp4'
  : '\nSome pieces are missing / Ada yang belum terpasang. Install them above, then run this check again / Pasang yang kurang di atas, lalu jalankan cek ini lagi.');
process.exit(ok ? 0 : 1);
