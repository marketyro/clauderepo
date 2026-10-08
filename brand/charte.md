# Chez Cellier — charte graphique réseaux sociaux

Relevé effectué le 8 octobre 2026 sur la page d'accueil de https://www.chezcellier.fr (site Wix).
Les images et polices hébergées chez Wix (`static.wixstatic.com`, `static.parastorage.com`) n'étaient pas
accessibles depuis l'environnement de travail. L'analyse repose donc sur le HTML et les styles intégrés
à la page, plus une capture de la page d'accueil (`sources/reference/`).

## Identité

| | |
|---|---|
| Nom | **Chez Cellier** |
| Activité | Villa senior partagée : première enseigne du Languedoc, alternative à la maison de retraite |
| Sous-titre | **VILLA SENIOR PARTAGÉE** |
| Baseline | *L'Art de Vivre à la Française* |
| Accroches | « Faire du bien vieillir un art de vivre ensemble » · « Une expérience de vie où se cultivent les liens humains, l'intimité et les plaisirs simples » · « Un accompagnement 5 étoiles, 7 jours sur 7 » |
| Villas | Saint-Laurent-d'Aigouze (face au château), Vauvert |
| Ton | Chaleureux, haut de gamme, discret, ancré dans le terroir : « demeures d'exception », « convivialité », « plaisirs simples » |

**Logo existant sur le site :** un logo typographique, sans fichier image (voir « Logo » ci-dessous).

## Couleurs (relevées dans le HTML/CSS)

| Rôle | Hex | Usage sur le site |
|---|---|---|
| Noir profond | `#161616` | Fond du hero et de l'en-tête |
| Anthracite | `#242323` | Sections sombres, texte courant sur fond clair |
| Or | `#C49B56` | Couleur d'accent principale : sous-titres, filets, bordures de boutons, menu actif |
| Or clair | `#D3B376` | Titre « Bienvenue », mots surlignés, gros titres en or |
| Crème | `#FFF6EB` | Titre « Chez Cellier », fonds des sections claires |
| Ivoire | `#FFFDFC` | Fond clair secondaire |

Les fonds sont sombres (noir ou anthracite) ou crème. L'or sert uniquement d'accent : texte fin, filets
d'environ 1 à 2 px, surlignage ponctuel.

## Typographies

| Police | Rôle | Source |
|---|---|---|
| **Libre Caslon Text** (Regular, *Italic*) | Titres, nom de marque, citations | Google Fonts, licence OFL |
| **Montserrat** (Light, Regular, Medium) | Sous-titres en capitales très espacées (≈ 0,3–0,4 em), boutons, mentions | Google Fonts, licence OFL |
| Open Sans | Texte courant sur le site, non utilisé dans les visuels | Google Fonts |

Le site utilise aussi ponctuellement « Juana » (version démo, police Wix), Avenir et DIN Next. Ces polices
ne sont pas reprises : Juana est une version démo non libre, et Avenir et DIN Next sont peu présentes.
Les fichiers de police utilisés sont dans `sources/fonts/`, avec leur licence.

## Logo

Le logo utilisé est **celui de l'en-tête du site (en haut à gauche)**, reproduit à l'identique :

- un cadre à filet or `#C49B56` de 229×108 ;
- « Chez Cellier » en Libre Caslon Text 26 px, blanc, ligne de base à 61 px ;
- « VILLA SENIOR PARTAGEE » en Montserrat 12 px, or, ligne de base à 91 px ;
- un texte aligné à gauche, avec une marge de 22 px.

Les deux lignes font exactement la même largeur (154 px), comme sur le site. Toutes les déclinaisons
agrandissent ces proportions à l'identique (fonction `site_logo` dans `sources/generate.py`).

- `logo.svg` / `logo.png` : texte noir et or, fond transparent, pour fond clair.
- `logo-negatif.*` : texte blanc et or, fond transparent, pour fond sombre.
- `logo-fond-noir.*` : le logo tel qu'il apparaît sur le site, sur fond `#161616`.

Dans les SVG, le texte est vectorisé (converti en tracés) : ils s'affichent à l'identique sans qu'aucune
police soit installée.

## Éléments graphiques

- **Cadre filet or** : repris du logo. Il est simple ou double et encadre la couverture Facebook et les posts.
- **Arche** : ornement repris du site, en filet or fin, utilisé en décor (couverture Facebook, story,
  bannière LinkedIn).
- **Mots surlignés** : aplat or clair derrière un mot, comme sur « vieillir » et « ensemble » de la page d'accueil.
- **Sous-titres** : capitales Montserrat espacées, encadrées de deux filets or.
- **Bouton** : rectangle à filet or et capitales espacées, comme « RÉSERVER UNE VISITE » sur le site.

## Formats livrés

| Fichier | Dimensions | Notes |
|---|---|---|
| `profil-facebook.png` | 320×320 | Logo du site sur fond noir, entier dans le cercle |
| `profil-instagram.png` | 320×320 | Idem |
| `profil-linkedin.png` | 400×400 | Idem |
| `facebook-couverture.png` | 1640×624 | « Bienvenue », logo, baseline et villas, dans la zone sûre centrale (≈ 1200×470) |
| `instagram-post.png` | 1080×1080 | Logo et citation de la page d'accueil, mots surlignés |
| `instagram-portrait.png` | 1080×1350 | « Un accompagnement 5 étoiles, 7 jours sur 7 » sur fond crème, logo en version foncée |
| `instagram-story.png` | 1080×1920 | « Bienvenue » et logo dans une grande arche, bouton « Réserver une visite » ; 250 px libres en haut et en bas |
| `linkedin-banniere-perso.png` | 1584×396 | Zone bas-gauche laissée libre pour la photo de profil |
| `linkedin-banniere-entreprise.png` | 1128×191 | Logo et baseline, décalés vers la droite (logo de la page en bas à gauche) |

## Régénérer

```bash
pip install fonttools uharfbuzz
python3 brand/sources/generate.py               # SVG
NODE_PATH=$(npm root -g) node brand/sources/render.js   # PNG via Playwright/Chromium
```
