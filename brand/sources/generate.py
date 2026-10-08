"""Génère les SVG de l'identité Chez Cellier (texte vectorisé, aucune police requise au rendu).

Logo : celui de l'en-tête de chezcellier.fr, reproduit à l'identique (cadre filet or 229×108,
« Chez Cellier » Libre Caslon Text 26 px, « VILLA SENIOR PARTAGEE » Montserrat 12 px).

Usage : python3 brand/sources/generate.py   (puis node brand/sources/render.js)
Dépendances : fonttools, uharfbuzz
"""
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).resolve().parent
BRAND = HERE.parent
FONTS = HERE / "fonts"
OUT = HERE / "svg"

# Palette relevée sur chezcellier.fr
NOIR = "#161616"       # fond principal (hero, en-tête)
ANTHRACITE = "#242323"  # sections sombres, texte
OR = "#C49B56"          # accent principal (filets, boutons, sous-titres)
OR_CLAIR = "#D3B376"    # accent secondaire (titres « Bienvenue », surlignages)
CREME = "#FFF6EB"       # titre « Chez Cellier », fonds clairs
IVOIRE = "#FFFDFC"
BLANC = "#FFFFFF"       # « Chez Cellier » dans le logo du site


class Font:
    def __init__(self, filename):
        path = str(FONTS / filename)
        self.hb_font = hb.Font(hb.Face(hb.Blob.from_file_path(path)))
        self.tt = TTFont(path)
        self.glyphs = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        self.upm = self.tt["head"].unitsPerEm
        self.cap = self.tt["OS/2"].sCapHeight / self.upm

    def _shape(self, text):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

    def width(self, text, size, tracking=0.0):
        _, pos = self._shape(text)
        adv = sum(p.x_advance for p in pos) / self.upm * size
        return adv + tracking * size * (len(pos) - 1)

    def path(self, text, x, y, size, fill, tracking=0.0, anchor="middle", extra=""):
        """Chemin SVG du texte ; y = ligne de base, anchor = start|middle|end."""
        w = self.width(text, size, tracking)
        x0 = {"start": x, "middle": x - w / 2, "end": x - w}[anchor]
        s = size / self.upm
        infos, pos = self._shape(text)
        pen = SVGPathPen(self.glyphs)
        cx = x0
        for info, p in zip(infos, pos):
            name = self.order[info.codepoint]
            tpen = TransformPen(pen, (s, 0, 0, -s, cx + p.x_offset * s, y - p.y_offset * s))
            self.glyphs[name].draw(tpen)
            cx += p.x_advance * s + tracking * size
        return f'<path d="{pen.getCommands()}" fill="{fill}"{extra}/>'


CASLON = Font("LibreCaslonText-Regular.ttf")
CASLON_I = Font("LibreCaslonText-Italic.ttf")
MONT = Font("Montserrat-Regular.ttf")
MONT_L = Font("Montserrat-Light.ttf")


def svg(w, h, body, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}">{rect}{body}</svg>\n')


def arch_d(cx, top, w, h):
    """Arche (ornement repris du site) : demi-cercle en haut, pieds droits, base plate."""
    r = w / 2
    l, rr, b = cx - r, cx + r, top + h
    return (f"M{l:.2f},{b:.2f} L{l:.2f},{top + r:.2f} "
            f"A{r:.2f},{r:.2f} 0 0 1 {rr:.2f},{top + r:.2f} L{rr:.2f},{b:.2f} Z")


def tagline(cx, y, size, color, text="VILLA SENIOR PARTAGÉE", rule=True, tracking=0.38, font=MONT):
    """Sous-titre Montserrat très espacé, encadré de deux filets or."""
    out = [font.path(text, cx, y, size, color, tracking=tracking)]
    if rule:
        w = font.width(text, size, tracking)
        gap, ln = size * 1.4, size * 3.2
        ly = y - font.cap * size / 2
        for sgn in (-1, 1):
            x1 = cx + sgn * (w / 2 + gap)
            out.append(f'<line x1="{x1:.2f}" y1="{ly:.2f}" x2="{x1 + sgn * ln:.2f}" y2="{ly:.2f}" '
                       f'stroke="{color}" stroke-width="{max(1, size * 0.08):.2f}"/>')
    return "".join(out)


def frame(w, h, inset, color=OR, sw=1.5):
    return (f'<rect x="{inset}" y="{inset}" width="{w - 2 * inset}" height="{h - 2 * inset}" '
            f'fill="none" stroke="{color}" stroke-width="{sw}"/>')


def deco_arches(x, cy, height, color=OR, opacity=0.35, n=3, gap=None):
    """Rangée d'arches fines (décor latéral)."""
    w = height * 0.74
    gap = gap or w * 0.35
    out = []
    for i in range(n):
        cx = x + i * (w + gap)
        out.append(f'<path d="{arch_d(cx, cy - height / 2, w, height)}" fill="none" stroke="{color}" '
                   f'stroke-width="1.5" opacity="{opacity}"/>')
    return "".join(out)


def highlight(font, text, x, y, size, anchor, fg, bg, pad=0.12):
    """Mot surligné d'un aplat or, comme sur la page d'accueil."""
    w = font.width(text, size)
    x0 = {"start": x, "middle": x - w / 2, "end": x - w}[anchor]
    p = size * pad
    return (f'<rect x="{x0 - p:.2f}" y="{y - size * 0.86:.2f}" width="{w + 2 * p:.2f}" height="{size * 1.12:.2f}" fill="{bg}"/>'
            + font.path(text, x0, y, size, fg, anchor="start"))


def button(cx, y, text, size, color, w=None):
    tw = MONT.width(text, size, 0.18)
    w = w or tw + size * 4
    h = size * 3.1
    return (f'<rect x="{cx - w / 2:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" fill="none" stroke="{color}" stroke-width="2"/>'
            + MONT.path(text, cx, y + h / 2 + MONT.cap * size / 2, size, color, tracking=0.18))


# ---------------------------------------------------------------- logo du site

LOGO_W, LOGO_H = 229, 108


def site_logo(x, y, scale, name=BLANC, gold=OR):
    """Logo d'en-tête de chezcellier.fr, coin supérieur gauche en (x, y), taille = 229×108 × scale."""
    sw = max(1.0, scale)
    return (f'<rect x="{x + sw / 2:.2f}" y="{y + sw / 2:.2f}" width="{LOGO_W * scale - sw:.2f}" '
            f'height="{LOGO_H * scale - sw:.2f}" fill="none" stroke="{gold}" stroke-width="{sw:.2f}"/>'
            + CASLON.path("Chez Cellier", x + 22 * scale, y + 61 * scale, 26 * scale, name, anchor="start")
            + MONT.path("VILLA SENIOR PARTAGEE", x + 22 * scale, y + 91 * scale, 12 * scale, gold, anchor="start"))


def site_logo_centered(cx, y, width, **kw):
    return site_logo(cx - width / 2, y, width / LOGO_W, **kw)


ART_DE_VIVRE = "L’Art de Vivre à la Française"
VILLAS = "SAINT-LAURENT-D’AIGOUZE  ·  VAUVERT"


# ---------------------------------------------------------------- formats

def logo(name_color, bg=None):
    """Logo du site sur 1024×1024 (transparent sauf bg)."""
    W, w = 1024, 900
    return svg(W, W, site_logo_centered(W / 2, (W - w * LOGO_H / LOGO_W) / 2, w, name=name_color), bg)


def profil(size):
    w = size * 0.80
    return svg(size, size, site_logo_centered(size / 2, (size - w * LOGO_H / LOGO_W) / 2, w), NOIR)


def facebook_cover():
    W, H = 1640, 624
    body = frame(W, H, 26, OR, 1.5) + frame(W, H, 36, OR, 0.7)
    body += deco_arches(150, H / 2, 260, n=1) + deco_arches(W - 150, H / 2, 260, n=1)
    body += CASLON_I.path("Bienvenue", W / 2, 150, 44, OR_CLAIR)
    body += site_logo_centered(W / 2, 190, 450)
    body += CASLON_I.path(ART_DE_VIVRE, W / 2, 465, 34, OR_CLAIR)
    body += tagline(W / 2, 515, 16, OR, text=VILLAS, tracking=0.25)
    return svg(W, H, body, NOIR)


def instagram_post():
    W = 1080
    body = frame(W, W, 40, OR, 1.2)
    body += site_logo_centered(W / 2, 140, 380)
    y1, y2, s = 560, 660, 72
    # « Faire du bien vieillir » / « un art de vivre ensemble »
    for (a, b), y in ((("Faire du bien ", "vieillir"), y1), (("un art de vivre ", "ensemble"), y2)):
        x0 = W / 2 - CASLON.width(a + b, s) / 2
        body += CASLON.path(a, x0, y, s, CREME, anchor="start")
        body += highlight(CASLON, b, x0 + CASLON.width(a, s), y, s, "start", CREME, OR_CLAIR)
    body += tagline(W / 2, 790, 20, CREME, text="L’ART DE VIVRE À LA FRANÇAISE", tracking=0.25, font=CASLON)
    body += MONT.path(VILLAS, W / 2, 960, 17, OR, tracking=0.25)
    return svg(W, W, body, ANTHRACITE)


def instagram_portrait():
    W, H = 1080, 1350
    body = frame(W, H, 40, OR, 1.2)
    body += site_logo_centered(W / 2, 130, 400, name=ANTHRACITE)
    body += MONT.path("NOTRE ACCOMPAGNEMENT", W / 2, 440, 20, OR, tracking=0.35)
    body += CASLON.path("Un accompagnement", W / 2, 545, 74, ANTHRACITE)
    body += CASLON.path("5 étoiles, 7 jours sur 7", W / 2, 640, 74, ANTHRACITE)
    body += CASLON_I.path("Pour que chaque jour soit un plaisir", W / 2, 730, 34, OR)
    body += CASLON_I.path("et non une épreuve !", W / 2, 776, 34, OR)
    # Trois piliers
    cols = [("Gastronomie", "française"), ("Service de", "conciergerie"), ("Activités", "sur mesure")]
    for i, (l1, l2) in enumerate(cols):
        cx = W / 2 + (i - 1) * 300
        body += f'<line x1="{cx - 40}" y1="860" x2="{cx + 40}" y2="860" stroke="{OR}" stroke-width="1.5"/>'
        body += CASLON.path(l1, cx, 915, 30, ANTHRACITE) + CASLON.path(l2, cx, 955, 30, ANTHRACITE)
        if i:
            x = cx - 150
            body += f'<line x1="{x}" y1="880" x2="{x}" y2="960" stroke="{OR}" stroke-width="1" opacity="0.6"/>'
    body += button(W / 2, 1075, "RÉSERVER UNE VISITE", 20, ANTHRACITE, w=460)
    body += MONT.path("www.chezcellier.fr", W / 2, 1225, 20, OR, tracking=0.12)
    return svg(W, H, body, CREME)


def instagram_story():
    W, H = 1080, 1920
    # Zones sûres : 250 px en haut et en bas
    body = f'<path d="{arch_d(W / 2, 330, 760, 1060)}" fill="none" stroke="{OR}" stroke-width="2"/>'
    body += f'<path d="{arch_d(W / 2, 352, 716, 1016)}" fill="none" stroke="{OR}" stroke-width="1"/>'
    body += CASLON.path("Bienvenue", W / 2, 680, 100, OR_CLAIR)
    body += site_logo_centered(W / 2, 750, 520)
    body += CASLON_I.path("Une expérience de vie où se cultivent", W / 2, 1150, 34, CREME)
    body += CASLON_I.path("les liens humains, l’intimité", W / 2, 1198, 34, CREME)
    body += CASLON_I.path("et les plaisirs simples", W / 2, 1246, 34, CREME)
    body += button(W / 2, 1460, "RÉSERVER UNE VISITE", 24, OR, w=560)
    body += MONT.path("SAINT-LAURENT-D’AIGOUZE  ·  VAUVERT", W / 2, 1600, 19, OR_CLAIR, tracking=0.2)
    body += MONT_L.path("www.chezcellier.fr", W / 2, 1648, 24, CREME, tracking=0.08)
    return svg(W, H, body, NOIR)


def linkedin_perso():
    W, H = 1584, 396
    # Zone de la photo de profil (bas-gauche, ~0-460 × 170-396) laissée libre
    body = f'<line x1="0" y1="34" x2="{W}" y2="34" stroke="{OR}" stroke-width="1"/>'
    body += f'<line x1="0" y1="{H - 34}" x2="{W}" y2="{H - 34}" stroke="{OR}" stroke-width="1"/>'
    body += site_logo(480, (H - LOGO_H * 1.5) / 2, 1.5)
    body += CASLON_I.path(ART_DE_VIVRE, 890, 192, 32, OR_CLAIR, anchor="start")
    body += MONT.path(VILLAS, 892, 240, 14, OR, tracking=0.2, anchor="start")
    body += deco_arches(W - 110, H / 2, 230, n=1, opacity=0.3)
    return svg(W, H, body, NOIR)


def linkedin_entreprise():
    W, H = 1128, 191
    body = f'<line x1="0" y1="16" x2="{W}" y2="16" stroke="{OR}" stroke-width="1"/>'
    body += f'<line x1="0" y1="{H - 16}" x2="{W}" y2="{H - 16}" stroke="{OR}" stroke-width="1"/>'
    body += site_logo(300, (H - LOGO_H * 1.15) / 2, 1.15)
    body += CASLON_I.path(ART_DE_VIVRE, 600, 95, 24, OR_CLAIR, anchor="start")
    body += MONT.path(VILLAS, 601, 128, 11, OR, tracking=0.2, anchor="start")
    return svg(W, H, body, NOIR)


def main():
    OUT.mkdir(exist_ok=True)
    files = {
        BRAND / "logo.svg": logo(NOIR),
        BRAND / "logo-negatif.svg": logo(BLANC),
        BRAND / "logo-fond-noir.svg": logo(BLANC, NOIR),
        OUT / "profil-facebook.svg": profil(320),
        OUT / "profil-instagram.svg": profil(320),
        OUT / "profil-linkedin.svg": profil(400),
        OUT / "facebook-couverture.svg": facebook_cover(),
        OUT / "instagram-post.svg": instagram_post(),
        OUT / "instagram-portrait.svg": instagram_portrait(),
        OUT / "instagram-story.svg": instagram_story(),
        OUT / "linkedin-banniere-perso.svg": linkedin_perso(),
        OUT / "linkedin-banniere-entreprise.svg": linkedin_entreprise(),
    }
    for path, content in files.items():
        path.write_text(content, encoding="utf-8")
        print("écrit", path.relative_to(BRAND.parent))


if __name__ == "__main__":
    main()
