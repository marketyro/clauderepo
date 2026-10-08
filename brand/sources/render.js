// Rend chaque SVG en PNG aux dimensions exactes (Chromium via Playwright).
// Usage : NODE_PATH=$(npm root -g) node brand/sources/render.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BRAND = path.resolve(__dirname, '..');
const SVG_DIR = path.join(__dirname, 'svg');

const jobs = [
  // Logos : fond transparent
  ...['logo', 'logo-negatif', 'logo-fond-noir']
    .map((n) => ({ src: path.join(BRAND, `${n}.svg`), out: path.join(BRAND, `${n}.png`), transparent: n !== 'logo-fond-noir' })),
  ...fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'))
    .map((f) => ({ src: path.join(SVG_DIR, f), out: path.join(BRAND, f.replace(/\.svg$/, '.png')), transparent: false })),
];

(async () => {
  const browser = await chromium.launch();
  for (const job of jobs) {
    const svg = fs.readFileSync(job.src, 'utf8');
    const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
    const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await page.screenshot({ path: job.out, omitBackground: job.transparent,
      clip: { x: 0, y: 0, width: +w, height: +h } });
    await page.close();
    console.log(`${path.basename(job.out)} ${w}x${h}`);
  }
  await browser.close();
})();
