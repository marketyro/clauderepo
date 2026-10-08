# Young Adult Campus 2027 · Kit de diffusion (KLF Montpellier)

Visuels destinés aux partenaires (réseau Alliance Française Mexique) : **aucune mention du site web**.
Univers graphique Alliance Française (logo Fédération Mexique + Instagram AF Montpellier) : photo plein cadre,
grand titre serif blanc (Bodoni), étiquettes blanches à texte rouge, annotations manuscrites, filet rouge.
La version beca reprend la carte « promotion » AF (prix barré → 995 €).

## Fichiers (`output/`)

| Format | Version générale (tarif officiel) | Version « beca » (2 bourses) |
|---|---|---|
| Story Instagram/Facebook 1080×1920 | `…_general_story_1080x1920.png` | `…_beca_story_1080x1920.png` |
| Post 4:5 1080×1350 | `…_general_post-4x5_1080x1350.png` | `…_beca_post-4x5_1080x1350.png` |
| Carré 1:1 1080×1080 (WhatsApp) | `…_general_carre-1x1_1080x1080.png` | `…_beca_carre-1x1_1080x1080.png` |
| Flyer PDF A4, 2 pages (établissements) — p.2 : galerie photos | `…_general_A4.pdf` | `…_beca_A4.pdf` |

## Contenu clé
- 2 semaines tout compris : **1,530 €** (3 sem. 2,165 € · 4 sem. 2,715 €)
- Beca : valeur **535 €** (cours, activités culturelles, transport, gym) → **995 €** pour 2 semaines tout compris
- 2 bourses, sélection avant fin 2026
- Arrivées chaque lundi du 4 juillet au 14 août 2027 · 18–25 ans · niveaux A1–C1

## Photos (`photos/`)
Sélection issue du Drive KLF « Young Adult Campus », redimensionnée (max 1800 px) :
groupe sur le campus (visuel principal, version générale), étudiante en cours (version beca),
cours, plage, rooftop, gym, studio, jardin du campus (galerie PDF).
L'image « Gemini_Generated_Image » du Drive n'est **pas** utilisée (image générée par IA,
à éviter dans une publicité présentant le campus).

## Modifier / régénérer
Les textes sont en haut de `render.mjs` (objet `C`), le style dans `styles.css`.

```bash
NODE_PATH=$(npm root -g) node render.mjs   # nécessite Playwright + Chromium
```
