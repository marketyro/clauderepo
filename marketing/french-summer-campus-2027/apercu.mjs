// Planche d'aperçu unique 1920x1080 : groupes "General" et "Beca" côte à côte
// Usage : NODE_PATH=$(npm root -g) node apercu.mjs   (après render.mjs)

import { createRequire } from "node:module";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "output");
mkdirSync(join(ROOT, "build"), { recursive: true });
mkdirSync(join(ROOT, "apercu"), { recursive: true });

const FORMATS = ["story_1080x1920", "post-4x5-visual_1080x1350", "carre-1x1_1080x1080"];
const GROUPS = [
  ["general", "General"],
  ["beca", "Beca"],
];

const group = (dir, label) => {
  const files = readdirSync(join(OUT, dir));
  const rows = [1, 2, 3, 4].map((n) =>
    FORMATS.map((f) => files.find((x) => x.includes(`_${f}_foto-${n}-`)))
  );
  return `<section>
    <h2>${label}</h2>
    ${rows
      .map((r) => `<div class="row">${r.map((f) => `<img src="${pathToFileURL(join(OUT, dir, f)).href}">`).join("")}</div>`)
      .join("")}
  </section>`;
};

const fonts = readFileSync(join(ROOT, "fonts", "fonts.css"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8">
<base href="${pathToFileURL(join(ROOT, "fonts")).href}/">
<style>${fonts}</style>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1920px; height: 1080px; background: #f5f5f5; display: flex; justify-content: space-evenly; align-items: center; }
  section { display: flex; flex-direction: column; align-items: center; gap: 14px; }
  h2 { font-family: "Bodoni Moda", serif; font-style: italic; font-weight: 800; font-size: 52px; line-height: 1; color: #e1001a; margin-bottom: 6px; }
  .row { display: flex; gap: 14px; }
  img { height: 220px; display: block; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
</style></head><body>
${GROUPS.map(([d, l]) => group(d, l)).join("")}
</body></html>`;

const file = join(ROOT, "build", "apercu.html");
writeFileSync(file, html);
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(pathToFileURL(file).href);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: join(ROOT, "apercu", "Apercu_1920x1080.jpg"), type: "jpeg", quality: 90 });
await browser.close();
console.log("✓ apercu/Apercu_1920x1080.jpg");
