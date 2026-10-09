# French Summer Campus 2027 · Kit de diffusion (KLF Montpellier)

Visuels destinés aux partenaires (réseau Alliance Française Mexique) : **aucune mention du site web**.
Univers graphique Alliance Française (logo Fédération Mexique + Instagram AF Montpellier) : photo plein cadre,
grand titre serif blanc (Bodoni), étiquettes blanches à texte rouge, annotations manuscrites, filet rouge.
La version beca reprend la carte « promotion » AF (prix barré → 995 €).

## Fichiers (`output/`)

- `output/general/` : version tarif officiel (1 530 €)
- `output/beca/` : version 2 bourses (995 € au lieu de 1 530 €)

Chaque dossier contient 3 formats × 4 photos au choix (`foto-1` … `foto-4`) :

| Format | Usage |
|---|---|
| `story_1080x1920` | Story Instagram / Facebook |
| `post-4x5_1080x1350` | Post Instagram / Facebook |
| `carre-1x1_1080x1080` | Post carré, WhatsApp |

Flyers PDF A4 (2 pages, page 2 = galerie photos) : `output/…_general_A4.pdf`, `output/…_beca_A4.pdf`.

## Contenu clé
- 2 semaines tout compris : **1,530 €** (3 sem. 2,165 € · 4 sem. 2,715 €)
- Beca : valeur **535 €** (cours, activités culturelles, transport, gym) → **995 €** pour 2 semaines tout compris
- 2 bourses, sélection avant fin 2026
- Contact : contacto@alianzafr.edu.mx (pied de page de tous les visuels)
- Arrivées chaque lundi du 4 juillet au 14 août 2027 · 18–25 ans · niveaux A1–C1

## Photos (`photos/`)
Sélection issue du Drive KLF, redimensionnée (max 1800 px).
`campus-terraza.jpg` (foto-2 générale) est l'image « Gemini_Generated_Image » du Drive, utilisée à la demande de KLF.

## Modifier / régénérer
Textes (dont le titre `titleA` / `titleB`) et choix des photos en haut de `render.mjs`, style dans `styles.css`.

```bash
NODE_PATH=$(npm root -g) node render.mjs   # nécessite Playwright + Chromium
```
