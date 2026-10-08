// Génère les visuels du French Summer Campus 2027 (KLF Montpellier)
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
  // Titre : modifiable (ex. "Campus de verano" / "en Francia")
  titleA: "French Summer",
  titleB: "Campus",
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
  school: "Escuela KLF Montpellier",
  table: [
    ["2 semanas", "1,530 €"],
    ["3 semanas", "2,165 €"],
    ["4 semanas", "2,715 €"],
  ],
};

// ---------------------------------------------------------------------------
// Éléments graphiques — univers Alliance Française (cf. Instagram AF Montpellier) :
// photo plein cadre, grand titre serif blanc, étiquettes blanches à texte rouge,
// annotations manuscrites, carte prix "promotion", filet rouge.
// ---------------------------------------------------------------------------
const icon = (name) =>
  readFileSync(join(ROOT, "icons", `${name}.svg`), "utf8")
    .replace(/<!--.*?-->/s, "")
    .replace(/class="[^"]*"/, 'class="ico"');

// Photos (dossier photos/, issues du Drive KLF). pos = cadrage CSS (background-position)
// Plusieurs photos par version pour les réseaux sociaux (au choix) ; la 1re sert aussi au PDF.
// pos : cadrage CSS (background-position), global ou par format.
const PHOTOS = {
  general: [
    { key: "1-grupo-campus", file: "grupo-campus.jpg", pos: "68% 30%" },
    { key: "2-terraza-campus", file: "campus-terraza.jpg", pos: { story: "60% 100%", post: "20% 100%", default: "55% 100%" }, size: { story: "auto 120%", post: "110% auto", default: "125% auto" } },
    { key: "3-azotea-bar", file: "azotea-bar.jpg", pos: { story: "45% 50%", default: "50% 30%" } },
    { key: "4-azotea", file: "azotea.jpg", pos: { story: "45% 50%", default: "50% 40%" } },
  ],
  beca: [
    { key: "1-clase-sonrisa", file: "clase-sonrisa.jpg", pos: "66% 8%" },
    { key: "2-clase", file: "clase-sonrisa-2.jpg", pos: { story: "70% 20%", default: "70% 22%" } },
    { key: "3-clase", file: "clase.jpg", pos: { story: "55% 30%", default: "55% 22%" } },
    { key: "4-grupo-campus", file: "grupo-campus.jpg", pos: "68% 30%" },
  ],
};
const GALLERY = [
  { file: "clase.jpg", pos: "60% 35%", cap: "Clases en grupos reducidos" },
  { file: "playa.jpg", pos: "62% 70%", cap: "La playa, a un tranvía" },
  { file: "azotea.jpg", pos: "50% 60%", cap: "Intercambio de idiomas en la azotea" },
  { file: "gimnasio.jpg", pos: "50% 40%", cap: "Gimnasio del campus" },
  { file: "estudio.jpg", pos: "50% 60%", cap: "Tu estudio privado" },
  { file: "campus-jardin.jpg", pos: "50% 60%", cap: "Un campus moderno y verde" },
];
const photoUrl = (file) => pathToFileURL(join(ROOT, "photos", file)).href;
const bg = (ph, format) => {
  const pick = (v) => (v == null || typeof v === "string" ? v : v[format] ?? v.default);
  const size = pick(ph.size); // zoom optionnel, ex. "150%"
  return `background-image:url('${photoUrl(ph.file)}');background-position:${pick(ph.pos)}${size ? `;background-size:${size}` : ""}`;
};

const topline = `<div class="topline"></div>`;

const title = () => `
<h1 class="title">
  <span class="t1">${C.titleA}</span>
  <span class="t2">${C.titleB}</span>
  <span class="t3">2027</span>
</h1>`;

// Carte prix façon "promotion" AF (version beca)
const promoCard = () => `
<div class="promo">
  <span class="promo-old">Precio oficial ${C.price}</span>
  <span class="promo-new">${C.priceBeca}</span>
  <span class="promo-save">Beca de ${C.becaValue}</span>
  <span class="promo-sub">2 semanas todo incluido</span>
</div>`;

// Grande photo avec titre en surimpression
const photoHero = (beca, ph, format, { script = true } = {}) => `
<section class="ph" style="${bg(ph, format)}">
  <div class="ph-shade"></div>
  <div class="tags">
    ${beca ? `<span class="tag tag-red">2 becas</span>` : ""}
    <span class="tag">${C.season}</span>
    <span class="tag">En inmersión en Montpellier</span>
  </div>
  ${beca ? promoCard() : ""}
  <div class="ph-bottom">
    ${script ? `<div class="script">${beca ? "Tu verano en Francia, ¡casi a mitad de precio!" : "Bonjour ! Tu verano en Francia te espera"}</div>` : ""}
    ${title()}
  </div>
</section>`;

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

const becaBox = (compact = false, rest = true) => `
<div class="beca-box">
  <div class="beca-head">Tu beca de <b>${C.becaValue}</b> incluye</div>
  ${
    compact
      ? `<p class="beca-covers">${C.becaCovers.join(" · ")}</p>`
      : `<ul class="beca-list">${C.becaCovers.map((x) => `<li>${x}</li>`).join("")}</ul>`
  }
  ${rest ? "" : "<!--"}<p class="beca-rest">Solo pagas <b>${C.priceBeca}</b> por 2 semanas todo incluido, con alojamiento en estudio privado.</p>${rest ? "" : "-->"}
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
  story: (beca, ph) => `
    ${photoHero(beca, ph, "story")}
    <section class="panel">
      ${chips()}
      ${beca ? becaBox() + `<p class="selection">${C.selection}</p>` : items(true) + priceGeneral() + `<p class="dates">${C.dates}</p>`}
      ${footer(beca)}
    </section>`,

  post: (beca, ph) => `
    ${photoHero(beca, ph, "post")}
    <section class="panel">
      ${chips()}
      ${beca ? becaBox(true) + `<p class="selection">${C.selection}</p>` : items(true) + priceGeneral()}
      ${footer(beca)}
    </section>`,

  square: (beca, ph) => `
    ${photoHero(beca, ph, "square", { script: false })}
    <section class="panel">
      ${
        beca
          ? `<p class="incl">La beca cubre: ${C.becaCovers.join(" · ")}</p><p class="selection">${C.selection}</p>`
          : `<p class="incl">Clases · Estudio privado · Excursiones · Transporte · Gimnasio</p>` + priceGeneral()
      }
      ${footer(beca)}
    </section>`,

  a4: (beca, ph) => `
    ${photoHero(beca, ph, "a4")}
    <section class="panel">
      ${chips()}
      <h2 class="card-h">Todo incluido</h2>
      ${items(true)}
      <div class="cols">
        <div>
          ${beca ? becaBox(true, false) : `<table class="tbl"><caption>Tarifas 2027 · todo incluido</caption>${C.table.map(([d, p]) => `<tr><td>${d}</td><td>${p}</td></tr>`).join("")}</table>`}
        </div>
        <div>
          ${beca ? `<p class="selection">${C.selection}</p>` : priceGeneral()}
          <p class="dates">${C.dates}</p>
        </div>
      </div>
      ${footer(beca)}
    </section>`,
};

// Page 2 du flyer A4 : galerie photos
const gallery = (beca) => `
    ${topline}${topbar()}
    <section class="gal-head">
      <h2 class="gal-title">Así se vive el <em>${C.titleA} ${C.titleB}</em></h2>
    </section>
    <section class="gal-grid">
      ${GALLERY.map((g) => `<figure style="${bg(g)}"><figcaption>${g.cap}</figcaption></figure>`).join("")}
    </section>
    <section class="panel gal-card">
      <p class="gal-info">${C.age} · ${C.levels} · ${C.datesShort}</p>
      ${footer(beca)}
    </section>`;

const SIZES = {
  story: { w: 1080, h: 1920 },
  post: { w: 1080, h: 1350 },
  square: { w: 1080, h: 1080 },
  a4: { w: 794, h: 1123 },
};

const css = readFileSync(join(ROOT, "styles.css"), "utf8");
const fonts = readFileSync(join(ROOT, "fonts", "fonts.css"), "utf8");

const page = (format, beca, ph) => `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<base href="${pathToFileURL(join(ROOT, "fonts")).href}/">
<style>${fonts}</style><style>${css}</style>
<style>html,body{width:${SIZES[format].w}px}.page{width:${SIZES[format].w}px;height:${SIZES[format].h}px;break-after:page}</style>
</head><body>
<main class="page ${format} ${beca ? "is-beca" : "is-general"}">${layouts[format](beca, ph)}</main>
${format === "a4" ? `<main class="page a4 gallery ${beca ? "is-beca" : "is-general"}">${gallery(beca)}</main>` : ""}
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
const PREFIX = "KLF_French-Summer-Campus-2027";

for (const [vName, beca] of versions) {
  mkdirSync(join(OUT, vName), { recursive: true });
  for (const format of Object.keys(SIZES)) {
    // PDF : photo principale uniquement ; réseaux sociaux : toutes les photos
    const photos = format === "a4" ? [PHOTOS[vName][0]] : PHOTOS[vName];
    for (const ph of photos) {
      const html = page(format, beca, ph);
      const file = join(BUILD, `${format}-${vName}-${ph.key}.html`);
      writeFileSync(file, html);
      const { w, h } = SIZES[format];
      const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      await p.goto(pathToFileURL(file).href);
      await p.evaluate(() => document.fonts.ready);
      // Contrôle : aucun débordement du contenu
      const overflow = await p.evaluate(() =>
        Math.max(...[...document.querySelectorAll(".page")].map((m) => m.scrollHeight - m.clientHeight))
      );
      if (overflow > 0) console.warn(`⚠ ${format}-${vName}-${ph.key} déborde de ${overflow}px`);
      if (format === "a4") {
        await p.pdf({ path: join(OUT, `${PREFIX}_${vName}_A4.pdf`), width: "210mm", height: "297mm", printBackground: true });
        const pages = await p.$$(".page");
        for (const [i, el] of pages.entries()) await el.screenshot({ path: join(BUILD, `a4-${vName}-p${i + 1}.png`) });
      } else {
        await p.screenshot({ path: join(OUT, vName, `${PREFIX}_${vName}_${names[format]}_foto-${ph.key}.png`) });
      }
      await p.close();
      console.log(`✓ ${format} ${vName} ${ph.key}`);
    }
  }
}
await browser.close();
