// Génère les visuels du Young Adult Campus 2027 (KLF Montpellier)
// Formats : story 9:16, post 4:5, carré 1:1 (Instagram / Facebook / WhatsApp) + flyer PDF A4
// Versions : "general" (tarif officiel) et "beca" (2 bourses)
//
// Usage : node render.mjs   (Playwright + Chromium requis)

import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Playwright : installation locale ou globale (NODE_PATH)
const { chromium } = createRequire(import.meta.url)("playwright");

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "output");
const BUILD = join(ROOT, "build");
mkdirSync(OUT, { recursive: true });
mkdirSync(BUILD, { recursive: true });

// ---------------------------------------------------------------------------
// Contenu (espagnol — public mexicain)
// ---------------------------------------------------------------------------
const C = {
  season: "Verano 2027",
  place: "Montpellier · Francia",
  subtitle: "Aprende francés y vive un verano inolvidable en el sur de Francia.",
  age: "18 – 25 años",
  levels: "Niveles A1 – C1",
  duration: "Desde 2 semanas",
  dates: "Llegadas cada lunes del 4 de julio al 14 de agosto de 2027",
  datesShort: "Llegadas cada lunes · 4 jul – 14 ago 2027",
  items: [
    { icon: "book-open", title: "20 clases de francés por semana", sub: "Grupos internacionales reducidos" },
    { icon: "house", title: "Estudio privado en el campus", sub: "Cocineta, baño privado y wifi" },
    { icon: "map-pinned", title: "Actividades culturales y excursiones", sub: "Media jornada cada semana + día completo el fin de semana" },
    { icon: "tram-front", title: "Pase de transporte", sub: "¡El tranvía te lleva a la playa!" },
    { icon: "dumbbell", title: "Gimnasio del campus", sub: "Acceso incluido durante tu estancia" },
  ],
  price: "1,530 €",
  priceBeca: "995 €",
  becaValue: "535 €",
  becaCovers: ["Curso de francés", "Actividades culturales", "Pase de transporte", "Gimnasio"],
  selection: "Selección de los 2 becarios antes de fin de 2026",
  ctaGeneral: "Informes e inscripciones con tu asesor",
  ctaBeca: "¡Postula con tu asesor!",
  brand: "KLF · Keep Learning French",
  school: "Escuela LSF Montpellier",
  table: [
    ["2 semanas", "1,530 €"],
    ["3 semanas", "2,165 €"],
    ["4 semanas", "2,715 €"],
  ],
};

// ---------------------------------------------------------------------------
// Éléments graphiques
// ---------------------------------------------------------------------------
const icon = (name) =>
  readFileSync(join(ROOT, "icons", `${name}.svg`), "utf8")
    .replace(/<!--.*?-->/s, "")
    .replace(/class="[^"]*"/, 'class="ico"');

// Soleil couchant méditerranéen, style rétro (rayures sur la moitié basse)
const sun = () => `
<svg class="sun-svg" viewBox="0 0 400 400" aria-hidden="true">
  <defs><clipPath id="sunclip"><circle cx="200" cy="200" r="196"/></clipPath></defs>
  <circle cx="200" cy="200" r="196" fill="var(--red)"/>
  <g clip-path="url(#sunclip)" fill="var(--paper)">
    <rect x="0" y="262" width="400" height="7"/>
    <rect x="0" y="288" width="400" height="11"/>
    <rect x="0" y="316" width="400" height="15"/>
    <rect x="0" y="347" width="400" height="20"/>
    <rect x="0" y="380" width="400" height="30"/>
  </g>
</svg>`;

const waves = () => `
<svg class="waves" viewBox="0 0 1080 120" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 60 C 90 20, 180 20, 270 60 S 450 100, 540 60 S 720 20, 810 60 S 990 100, 1080 60 V120 H0Z" fill="var(--red)" opacity=".12"/>
  <path d="M0 80 C 90 45, 180 45, 270 80 S 450 115, 540 80 S 720 45, 810 80 S 990 115, 1080 80 V120 H0Z" fill="var(--sand)"/>
</svg>`;

const tricolor = `<div class="topline"></div>`;

const title = () => `
<h1 class="title">
  <span class="t1">Young Adult</span>
  <span class="t2">Campus</span>
  <span class="t3">2027</span>
</h1>`;

const sunBlock = (beca) => `
<div class="sun">
  ${sun()}
  <div class="sun-text">
    ${
      beca
        ? `<div class="sun-big">2</div><div class="sun-word">becas</div>`
        : `<div class="sun-script">Bonjour<br>l'été !</div>`
    }
  </div>
</div>`;

const chips = () => `
<div class="chips">
  <span>${C.age}</span><span>${C.levels}</span><span>${C.duration}</span>
</div>`;

const items = (compact = false) => `
<ul class="items ${compact ? "compact" : ""}">
  ${C.items
    .map(
      (it) => `<li><span class="ico-wrap">${icon(it.icon)}</span>
      <span class="it-txt"><b>${it.title}</b>${compact ? "" : `<small>${it.sub}</small>`}</span></li>`
    )
    .join("")}
</ul>`;

const priceGeneral = () => `
<div class="price">
  <div class="price-label">2 semanas<br><b>todo incluido</b></div>
  <div class="price-num">${C.price}</div>
</div>`;

const priceBeca = () => `
<div class="price beca">
  <div class="price-label">2 semanas todo incluido<br><span class="old">Precio oficial ${C.price}</span></div>
  <div class="price-num"><small>con beca solo</small>${C.priceBeca}</div>
</div>`;

const becaBox = (compact = false) => `
<div class="beca-box">
  <div class="beca-head"><span class="beca-tag">Beca</span><span>con valor de <b>${C.becaValue}</b></span></div>
  ${
    compact
      ? `<p class="beca-covers">${C.becaCovers.join(" · ")}</p>`
      : `<ul class="beca-list">${C.becaCovers.map((x) => `<li>${x}</li>`).join("")}</ul>`
  }
</div>`;

const footer = (beca) => `
<footer class="foot">
  <div class="cta">${beca ? C.ctaBeca : C.ctaGeneral}</div>
  <div class="brand">${C.brand}<span>${C.school}</span></div>
</footer>`;

const topbar = () => `
<header class="top">
  <span class="pill">${C.season}</span>
  <span class="place">${C.place}</span>
</header>`;

// ---------------------------------------------------------------------------
// Gabarits par format
// ---------------------------------------------------------------------------
const layouts = {
  story: (beca) => `
    ${tricolor}${topbar()}
    <section class="hero">
      ${sunBlock(beca)}
      <div class="script-note">${beca ? "Tu verano en Francia,<br>¡casi a mitad de precio!" : "Tu verano en Francia"}</div>
      ${title()}
      <p class="subtitle">${C.subtitle}</p>
      ${chips()}
    </section>
    ${waves()}
    <section class="card">
      ${beca ? becaBox() + priceBeca() + `<p class="selection">${C.selection}</p>` : `<h2 class="card-h">Todo incluido</h2>` + items(true) + priceGeneral()}
      ${beca ? "" : `<p class="dates">${C.dates}</p>`}
      ${footer(beca)}
    </section>`,

  post: (beca) => `
    ${tricolor}${topbar()}
    <section class="hero">
      ${sunBlock(beca)}
      ${title()}
      <p class="subtitle">${C.subtitle}</p>
      ${chips()}
    </section>
    ${waves()}
    <section class="card">
      ${beca ? becaBox(true) + priceBeca() + `<p class="selection">${C.selection}</p>` : items(true) + priceGeneral()}
      ${footer(beca)}
    </section>`,

  square: (beca) => `
    ${tricolor}${topbar()}
    <section class="hero">
      ${sunBlock(beca)}
      ${title()}
      ${chips()}
    </section>
    ${waves()}
    <section class="card">
      ${
        beca
          ? becaBox(true) + priceBeca()
          : `<p class="incl">Clases · Estudio privado · Excursiones · Transporte · Gimnasio</p>` + priceGeneral()
      }
      ${footer(beca)}
    </section>`,

  a4: (beca) => `
    ${tricolor}${topbar()}
    <section class="hero">
      ${sunBlock(beca)}
      ${title()}
      <p class="subtitle">${C.subtitle}</p>
      ${chips()}
    </section>
    ${waves()}
    <section class="card">
      <h2 class="card-h">Todo incluido</h2>
      ${items(true)}
      <div class="cols">
        <div>
          ${beca ? becaBox() + `<p class="selection">${C.selection}</p>` : `<table class="tbl"><caption>Tarifas 2027 · todo incluido</caption>${C.table.map(([d, p]) => `<tr><td>${d}</td><td>${p}</td></tr>`).join("")}</table>`}
        </div>
        <div>
          ${beca ? priceBeca() : priceGeneral()}
          <p class="dates">${C.dates}</p>
        </div>
      </div>
      ${footer(beca)}
    </section>`,
};

const SIZES = {
  story: { w: 1080, h: 1920 },
  post: { w: 1080, h: 1350 },
  square: { w: 1080, h: 1080 },
  a4: { w: 794, h: 1123 },
};

const css = readFileSync(join(ROOT, "styles.css"), "utf8");
const fonts = readFileSync(join(ROOT, "fonts", "fonts.css"), "utf8");

const page = (format, beca) => `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<base href="${pathToFileURL(join(ROOT, "fonts")).href}/">
<style>${fonts}</style><style>${css}</style>
<style>html,body{width:${SIZES[format].w}px;height:${SIZES[format].h}px}</style>
</head><body>
<main class="page ${format} ${beca ? "is-beca" : "is-general"}">${layouts[format](beca)}</main>
</body></html>`;

// ---------------------------------------------------------------------------
// Rendu
// ---------------------------------------------------------------------------
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const versions = [
  ["general", false],
  ["beca", true],
];
const names = { story: "story_1080x1920", post: "post-4x5_1080x1350", square: "carre-1x1_1080x1080" };

for (const [vName, beca] of versions) {
  for (const format of Object.keys(SIZES)) {
    const html = page(format, beca);
    const file = join(BUILD, `${format}-${vName}.html`);
    writeFileSync(file, html);
    const { w, h } = SIZES[format];
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto(pathToFileURL(file).href);
    await p.evaluate(() => document.fonts.ready);
    // Contrôle : aucun débordement du contenu
    const overflow = await p.evaluate(() => {
      const m = document.querySelector(".page");
      return m.scrollHeight - m.clientHeight;
    });
    if (overflow > 0) console.warn(`⚠ ${format}-${vName} déborde de ${overflow}px`);
    if (format === "a4") {
      await p.pdf({
        path: join(OUT, `KLF_Young-Adult-Campus-2027_${vName}_A4.pdf`),
        width: "210mm",
        height: "297mm",
        printBackground: true,
        pageRanges: "1",
      });
      await p.screenshot({ path: join(BUILD, `a4-${vName}.png`) });
    } else {
      await p.screenshot({ path: join(OUT, `KLF_Young-Adult-Campus-2027_${vName}_${names[format]}.png`) });
    }
    await p.close();
    console.log(`✓ ${format} ${vName}`);
  }
}
await browser.close();
