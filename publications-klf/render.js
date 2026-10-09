// Rend les slides HTML en PNG (1080x1350) avec Chromium/Playwright.
// Usage: node render.js <dossier> [<dossier>...]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const dirs = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const dir of dirs) {
    const abs = path.resolve(dir);
    const files = fs.readdirSync(abs).filter(f => /^slide-\d+\.html$/.test(f)).sort();
    for (const f of files) {
      await page.goto('file://' + path.join(abs, f), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const out = path.join(abs, f.replace('.html', '.png'));
      await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
      console.log('wrote', out);
    }
  }
  await browser.close();
})();
