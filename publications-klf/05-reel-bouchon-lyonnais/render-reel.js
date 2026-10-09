// Rend reel.html image par image (1080x1920, 30 fps) puis assemble en MP4 avec ffmpeg.
// Usage: node render-reel.js [--preview]   (--preview : 6 images clés seulement)
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const FPS = 30, DUR = 27.5;
const dir = __dirname;
const frames = path.join(dir, 'frames');
const preview = process.argv.includes('--preview');

(async () => {
  fs.rmSync(frames, { recursive: true, force: true });
  fs.mkdirSync(frames);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(dir, 'reel.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);

  if (preview) {
    const times = [1.6, 5.5, 9.5, 13.5, 17.5, 21.5, 25.5];
    for (const t of times) {
      await page.evaluate(t => window.render(t), t);
      await page.screenshot({ path: path.join(dir, `preview-${t.toFixed(1)}s.jpg`), type: 'jpeg', quality: 85 });
    }
    await browser.close();
    return;
  }

  const n = Math.round(DUR * FPS);
  for (let f = 0; f < n; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    await page.screenshot({ path: path.join(frames, `f${String(f).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
    if (f % 150 === 0) console.log(`frame ${f}/${n}`);
  }
  // Image de couverture (frame du hook)
  await page.evaluate(t => window.render(t), 1.6);
  await page.screenshot({ path: path.join(dir, 'cover.png') });
  await browser.close();

  const out = path.join(dir, 'reel-bouchon-lyonnais.mp4');
  execSync(`ffmpeg -y -framerate ${FPS} -i "${frames}/f%04d.jpg" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium -movflags +faststart "${out}"`, { stdio: 'inherit' });
  fs.rmSync(frames, { recursive: true, force: true });
  console.log('wrote', out);
})();
