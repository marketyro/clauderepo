"""Génère les SVG de l'identité Chez Cellier (texte vectorisé, photos intégrées).

Logo : celui de l'en-tête de chezcellier.fr, reproduit à l'identique (cadre filet or 229×108,
« Chez Cellier » Libre Caslon Text 26 px, « VILLA SENIOR PARTAGEE » Montserrat 12 px).
Mise en page des visuels inspirée de la banderole Vauvert (bandeau noir, photo, pastille or, bloc beige).

Usage : python3 brand/sources/generate.py   (puis node brand/sources/render.js)
Dépendances : fonttools, uharfbuzz, pillow
"""
import base64
import io
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

HERE = Path(__file__).resolve().parent
BRAND = HERE.parent
FONTS = HERE / "fonts"
PHOTOS = HERE / "photos"
OUT = HERE / "svg"

# Palette relevée sur chezcellier.fr et sur la banderole
NOIR = "#161616"        # fond du site et de la banderole
ANTHRACITE = "#242323"  # texte sur fond clair
OR = "#C49B56"          # sous-titre du logo, filets, cadre
OR_CLAIR = "#D3B376"    # titres en or
OR_PROFOND = "#9C7F48"  # pastilles de la banderole
BEIGE = "#F3DFCC"       # blocs et bandeaux clairs de la banderole
CREME = "#FFF6EB"       # grands titres
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

    def path(self, text, x, y, size, fill, tracking=0.0, anchor="middle"):
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
        return f'<path d="{pen.getCommands()}" fill="{fill}"/>'


CASLON = Font("LibreCaslonText-Regular.ttf")
CASLON_I = Font("LibreCaslonText-Italic.ttf")
MONT = Font("Montserrat-Regular.ttf")
MONT_M = Font("Montserrat-Medium.ttf")


def svg(w, h, body, bg=None, defs=""):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
            f'viewBox="0 0 {w} {h}"><defs>{defs}</defs>{rect}{body}</svg>\n')


# ---------------------------------------------------------------- logo du site

LOGO_W, LOGO_H = 229, 108


def site_logo(x, y, scale, name=BLANC, gold=OR, frame=True):
    """Logo d'en-tête de chezcellier.fr, coin supérieur gauche en (x, y), taille = 229×108 × scale."""
    out = []
    if frame:
        sw = max(1.0, scale)
        out.append(f'<rect x="{x + sw / 2:.2f}" y="{y + sw / 2:.2f}" width="{LOGO_W * scale - sw:.2f}" '
                   f'height="{LOGO_H * scale - sw:.2f}" fill="none" stroke="{gold}" stroke-width="{sw:.2f}"/>')
    out.append(CASLON.path("Chez Cellier", x + 22 * scale, y + 61 * scale, 26 * scale, name, anchor="start"))
    out.append(MONT.path("VILLA SENIOR PARTAGEE", x + 22 * scale, y + 91 * scale, 12 * scale, gold, anchor="start"))
    return "".join(out)


def site_logo_centered(cx, y, width, **kw):
    scale = width / LOGO_W
    return site_logo(cx - width / 2, y, scale, **kw)


# ---------------------------------------------------------------- photos

def photo(name, x, y, w, h, focus=(0.5, 0.5), zoom=1.0):
    """Photo recadrée (cover) autour du point focal, intégrée en JPEG base64."""
    im = Image.open(PHOTOS / name).convert("RGB")
    W, H = im.size
    s = max(w / W, h / H) * zoom
    cw, ch = w / s, h / s
    left = min(max(focus[0] * W - cw / 2, 0), W - cw)
    top = min(max(focus[1] * H - ch / 2, 0), H - ch)
    im = im.crop((round(left), round(top), round(left + cw), round(top + ch)))
    im = im.resize((round(w), round(h)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=88)
    data = base64.b64encode(buf.getvalue()).decode()
    return f'<image x="{x}" y="{y}" width="{w}" height="{h}" href="data:image/jpeg;base64,{data}"/>'


def fade(gid, x, y, w, h, direction="right", color=NOIR, strength=1.0):
    """Dégradé du noir vers le transparent, pour fondre la photo dans le fond."""
    x1, y1, x2, y2 = {"right": (0, 0, 1, 0), "left": (1, 0, 0, 0), "down": (0, 0, 0, 1), "up": (0, 1, 0, 0)}[direction]
    d = (f'<linearGradient id="{gid}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">'
         f'<stop offset="0" stop-color="{color}" stop-opacity="{strength}"/>'
         f'<stop offset="1" stop-color="{color}" stop-opacity="0"/></linearGradient>')
    return d, f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#{gid})"/>'


# ---------------------------------------------------------------- éléments de la banderole

def pill(cx, cy, text, size, font=CASLON, fg=NOIR, bg=BEIGE, tracking=0.02):
    w = font.width(text, size, tracking) + size * 1.6
    h = size * 2.0
    return (f'<rect x="{cx - w / 2:.2f}" y="{cy - h / 2:.2f}" width="{w:.2f}" height="{h:.2f}" rx="{h * 0.3:.2f}" fill="{bg}"/>'
            + font.path(text, cx, cy + font.cap * size / 2, size, fg, tracking=tracking))


def badge(cx, cy, r, top, big, bottom, big_size=0.27):
    """Pastille or (comme « BIENTÔT ICI » sur la banderole)."""
    out = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{OR_PROFOND}" stroke="{BEIGE}" stroke-width="{r * 0.015:.2f}"/>']
    out.append(CASLON.path(top, cx, cy - r * 0.38, r * 0.17, BEIGE, tracking=0.04))
    out.append(CASLON.path(big, cx, cy + r * 0.02, r * big_size, BLANC, tracking=0.02))
    out.append(f'<line x1="{cx - r * 0.28:.2f}" y1="{cy + r * 0.18:.2f}" x2="{cx + r * 0.28:.2f}" '
               f'y2="{cy + r * 0.18:.2f}" stroke="{BEIGE}" stroke-width="{r * 0.012:.2f}"/>')
    for i, line in enumerate(bottom):
        out.append(MONT.path(line, cx, cy + r * (0.42 + i * 0.2), r * 0.12, BLANC, tracking=0.04))
    return "".join(out)


def stacked(lines, x, y, size, color, font=MONT, lh=1.3, tracking=0.06, anchor="start"):
    return "".join(font.path(t, x, y + i * size * lh, size, color, tracking=tracking, anchor=anchor)
                   for i, t in enumerate(lines))


PILIERS = [("UN CADRE", "DE VIE", "D’EXCEPTION"),
           ("UNE VIE", "CONVIVIALE", "ET SÉCURISÉE"),
           ("UN", "ACCOMPAGNEMENT", "7J/7 INCLUS"),
           ("DES ESPACES", "PARTAGÉS", "ET PRIVATIFS")]


def piliers(cx, y, width, size, color=OR):
    out = []
    col = width / 4
    for i, lines in enumerate(PILIERS):
        x = cx - width / 2 + col * (i + 0.5)
        out.append(stacked(lines, x, y, size, color, anchor="middle", tracking=0.04))
        if i:
            sx = x - col / 2
            out.append(f'<line x1="{sx:.2f}" y1="{y - size * 1.2:.2f}" x2="{sx:.2f}" y2="{y + size * 2.9:.2f}" '
                       f'stroke="{OR}" stroke-width="1.2" opacity="0.7"/>')
    return "".join(out)


ART_DE_VIVRE = "L’Art de Vivre à la Française"
COUPLE = "photo-couple-jardin.jpg"
REPAS = "photo-repas-jardin.jpg"


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
    px = 780
    d, f = fade("fb", px, 0, 300, H)
    body = photo(REPAS, px, 0, W - px, H, focus=(0.55, 0.55)) + f
    body += site_logo(250, 110, 1.75)
    body += CASLON.path(ART_DE_VIVRE, 250, 400, 38, CREME, anchor="start")
    body += MONT.path("PARTAGER · PROFITER · S’ÉPANOUIR", 252, 452, 17, OR, tracking=0.18, anchor="start")
    body += pill(1110, 510, "10 SUITES PRIVÉES · SAINT-LAURENT-D’AIGOUZE & VAUVERT", 17)
    return svg(W, H, body, NOIR, d)


def instagram_post():
    W = 1080
    band, bottom = 300, 950
    body = photo(COUPLE, 0, band, W, bottom - band, focus=(0.5, 0.4))
    body += site_logo_centered(W / 2, 48, 430)
    body += CASLON.path(ART_DE_VIVRE, W / 2, 1033, 54, CREME)
    return svg(W, W, body, NOIR)


def instagram_portrait():
    W, H = 1080, 1350
    top, bottom = 300, 960
    d, f = fade("pt", 0, top, W, 260, "down", strength=0.75)
    body = photo(REPAS, 0, top, W, bottom - top, focus=(0.5, 0.56)) + f
    body += site_logo_centered(W / 2, 48, 430)
    body += stacked(["PARTAGER", "PROFITER", "S’ÉPANOUIR"], 56, top + 80, 26, BLANC, tracking=0.08)
    body += f'<line x1="300" y1="{top + 52}" x2="300" y2="{top + 150}" stroke="{BLANC}" stroke-width="1.5"/>'
    body += stacked(["CHEZ CELLIER", "CHAQUE JOUR", "A PLUS DE SENS"], 330, top + 80, 26, BLANC, tracking=0.08)
    body += pill(W / 2, bottom - 50, "10 SUITES PRIVÉES PAR VILLA", 24)
    body += CASLON.path(ART_DE_VIVRE, W / 2, 1065, 60, CREME)
    body += piliers(W / 2, 1160, 1000, 17)
    body += MONT_M.path("www.chezcellier.fr", W / 2, 1305, 20, BEIGE, tracking=0.06)
    return svg(W, H, body, NOIR, d)


def instagram_story():
    W, H = 1080, 1920
    # Zones sûres : 250 px en haut et en bas laissés sans contenu
    body = site_logo_centered(W / 2, 290, 500)
    body += photo(COUPLE, 0, 590, W, 760, focus=(0.5, 0.42))
    body += badge(870, 1280, 140, "RÉSERVEZ", "UNE VISITE", ["CHEZ CELLIER"], big_size=0.2)
    body += CASLON.path(ART_DE_VIVRE, W / 2, 1480, 52, CREME)
    body += f'<rect x="0" y="1520" width="{W}" height="150" fill="{BEIGE}"/>'
    body += MONT_M.path("www.chezcellier.fr", W / 2, 1572, 34, NOIR)
    body += MONT_M.path("+33 6 98 88 35 35  ·  contact@chezcellier.fr", W / 2, 1632, 28, NOIR)
    return svg(W, H, body, NOIR)


def linkedin_perso():
    W, H = 1584, 396
    px = 940
    d, f = fade("li", px, 0, 260, H)
    body = photo(REPAS, px, 0, W - px, H, focus=(0.6, 0.55)) + f
    # Bas-gauche (~0-460 × 170-396) laissé libre pour la photo de profil
    body += site_logo(480, 50, 1.45)
    body += CASLON.path(ART_DE_VIVRE, 482, 285, 30, CREME, anchor="start")
    body += MONT.path("PARTAGER · PROFITER · S’ÉPANOUIR", 484, 330, 14, OR, tracking=0.18, anchor="start")
    return svg(W, H, body, NOIR, d)


def linkedin_entreprise():
    W, H = 1128, 191
    px = 860
    d, f = fade("le", px, 0, 140, H)
    body = photo(REPAS, px, 0, W - px, H, focus=(0.62, 0.55)) + f
    body += site_logo(200, 28, 1.25)
    body += CASLON.path(ART_DE_VIVRE, 530, 95, 24, CREME, anchor="start")
    body += MONT.path("SAINT-LAURENT-D’AIGOUZE · VAUVERT", 531, 128, 11, OR, tracking=0.16, anchor="start")
    return svg(W, H, body, NOIR, d)


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
