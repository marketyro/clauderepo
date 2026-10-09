// Rend un fichier HTML carré (1080x1080) en PNG. Usage: node render-square.js <fichier.html> [<sortie.png>]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const src = path.resolve(process.argv[2]);
  const out = process.argv[3] ? path.resolve(process.argv[3]) : src.replace(/\.html$/, '.png');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  await page.goto('file://' + src, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  console.log('wrote', out);
  await browser.close();
})();
