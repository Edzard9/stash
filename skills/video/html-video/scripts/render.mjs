// Render a deterministic HTML animation to MP4, frame by frame.
// Usage:
//   node render.mjs <animation.html> --duration <seconds> [options]
// Options:
//   --fps 30                 frames per second (default 30)
//   --size vertical          vertical 1080x1920 | landscape 1920x1080 |
//                            vertical-sm 540x960 | landscape-sm 960x540 |
//                            WxH explicit, e.g. --size 1280x720
//   --out video.mp4          output file (default: <html name>.mp4)
//   --audio track.mp3        optional audio file to mux in
//   --keep-frames            keep the frames/ folder after encoding
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const htmlArg = args.find((a) => !a.startsWith('--'));
const opt = (name, fallback) => {
  const i = args.indexOf('--' + name);
  return i >= 0 ? args[i + 1] : fallback;
};
const has = (name) => args.includes('--' + name);

if (!htmlArg) {
  console.error('Usage: node render.mjs <animation.html> --duration <seconds> [--fps 30] [--size vertical] [--out video.mp4] [--audio file] [--keep-frames]');
  process.exit(1);
}
const htmlPath = resolve(htmlArg);
if (!existsSync(htmlPath)) {
  console.error(`File not found: ${htmlPath}`);
  process.exit(1);
}

const SIZES = {
  vertical: [1080, 1920],
  landscape: [1920, 1080],
  'vertical-sm': [540, 960],
  'landscape-sm': [960, 540],
};
const sizeArg = opt('size', 'vertical');
const [width, height] = SIZES[sizeArg] || sizeArg.split('x').map(Number);
if (!width || !height) {
  console.error(`Unknown --size "${sizeArg}". Use vertical, landscape, vertical-sm, landscape-sm, or WxH.`);
  process.exit(1);
}

const fps = Number(opt('fps', '30'));
const outPath = resolve(opt('out', basename(htmlPath).replace(/\.html?$/i, '') + '.mp4'));
const audioPath = opt('audio', null) ? resolve(opt('audio')) : null;
const framesDir = join(dirname(htmlPath), 'frames-' + basename(htmlPath).replace(/\W+/g, '_'));

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Run: node check.mjs  (it prints the install steps).');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href);
await page.waitForFunction(() => typeof window.seek === 'function', null, { timeout: 10000 });

const pageDuration = await page.evaluate(() => window.__duration);
const duration = Number(opt('duration', pageDuration));
if (!duration) {
  console.error('No duration: pass --duration or set window.__duration in the page.');
  await browser.close();
  process.exit(1);
}

rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });

const totalFrames = Math.round(duration * fps);
console.log(`Rendering ${totalFrames} frames at ${fps} fps, ${width}x${height}, ${duration}s`);
for (let i = 0; i < totalFrames; i++) {
  const t = i / fps;
  await page.evaluate((tt) => window.seek(tt), t);
  await page.screenshot({ path: join(framesDir, `frame-${String(i).padStart(5, '0')}.png`) });
  if (i % 30 === 0 || i === totalFrames - 1) console.log(`  frame ${i + 1}/${totalFrames}`);
}
await browser.close();

const ffmpegArgs = ['-y', '-framerate', String(fps), '-i', join(framesDir, 'frame-%05d.png')];
if (audioPath) ffmpegArgs.push('-i', audioPath);
ffmpegArgs.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
if (audioPath) ffmpegArgs.push('-c:a', 'aac', '-shortest');
ffmpegArgs.push(outPath);

console.log('Encoding with FFmpeg...');
const enc = spawnSync('ffmpeg', ffmpegArgs, { stdio: 'inherit' });
if (enc.status !== 0) {
  console.error('FFmpeg failed. Run: node check.mjs');
  process.exit(enc.status ?? 1);
}
if (!has('keep-frames')) rmSync(framesDir, { recursive: true, force: true });
console.log(`Done: ${outPath}`);
