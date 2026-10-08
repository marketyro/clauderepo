# Young Adult Campus 2027 · Kit de diffusion (KLF Montpellier)

Visuels destinés aux partenaires (réseau Alliance Française Mexique) : **aucune mention du site web**.
Univers graphique inspiré de l'Alliance Française (blanc, rouge « af », noir, gris, titres serif Bodoni).

## Fichiers (`output/`)

| Format | Version générale (tarif officiel) | Version « beca » (2 bourses) |
|---|---|---|
| Story Instagram/Facebook 1080×1920 | `…_general_story_1080x1920.png` | `…_beca_story_1080x1920.png` |
| Post 4:5 1080×1350 | `…_general_post-4x5_1080x1350.png` | `…_beca_post-4x5_1080x1350.png` |
| Carré 1:1 1080×1080 (WhatsApp) | `…_general_carre-1x1_1080x1080.png` | `…_beca_carre-1x1_1080x1080.png` |
| Flyer PDF A4 (établissements) | `…_general_A4.pdf` | `…_beca_A4.pdf` |

## Contenu clé
- 2 semaines tout compris : **1,530 €** (3 sem. 2,165 € · 4 sem. 2,715 €)
- Beca : valeur **535 €** (cours, activités culturelles, transport, gym) → **995 €** pour 2 semaines tout compris
- 2 bourses, sélection avant fin 2026
- Arrivées chaque lundi du 4 juillet au 14 août 2027 · 18–25 ans · niveaux A1–C1

## Modifier / régénérer
Les textes sont en haut de `render.mjs` (objet `C`), le style dans `styles.css`.

```bash
NODE_PATH=$(npm root -g) node render.mjs   # nécessite Playwright + Chromium
```
