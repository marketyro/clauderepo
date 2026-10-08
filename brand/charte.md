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

**Logo existant sur le site :** un logo typographique, sans fichier image. « Chez Cellier » est composé en
Libre Caslon Text crème, au-dessus de « VILLA SENIOR PARTAGEE » en Montserrat or, le tout dans un cadre
à filet or fin sur fond noir.

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
| **Libre Caslon Text** (Regular, *Italic*, Bold) | Titres, nom de marque, citations | Google Fonts, licence OFL |
| **Montserrat** (Light, Regular, Medium) | Sous-titres en capitales très espacées (≈ 0,3–0,4 em), boutons, mentions | Google Fonts, licence OFL |
| Open Sans | Texte courant sur le site, non utilisé dans les visuels | Google Fonts |

Le site utilise aussi ponctuellement « Juana » (version démo, police Wix), Avenir et DIN Next. Ces polices
ne sont pas reprises : Juana est une version démo non libre, et Avenir et DIN Next sont peu présentes.
Les fichiers de police utilisés sont dans `sources/fonts/`, avec leur licence.

## Éléments graphiques

- **Cadre filet or** : repris du bloc logo de l'en-tête. Il est simple ou double et encadre la couverture
  Facebook et les posts.
- **Arche** : une forme d'arche (porte de demeure) en ornement crème apparaît dans le site. Elle a été
  reprise pour encadrer le monogramme et sert de motif décoratif.
- **Mots surlignés** : aplat or clair derrière un mot, comme sur « vieillir » et « ensemble » de la page d'accueil.
- **Sous-titres** : capitales Montserrat espacées, encadrées de deux filets or.

## Logo proposé

- `logo.svg` / `logo.png` : version pour fond clair. Monogramme « CC » (deux C entrelacés, l'un en
  anthracite, l'autre en or) dans une double arche, puis le nom « Chez Cellier » et le sous-titre.
- `logo-negatif.*` : version crème et or pour fond sombre.
- `logo-horizontal*.*` : version fidèle au logo de l'en-tête du site (nom et sous-titre dans un cadre filet or).
- `monogramme*.*` : le monogramme seul, pour favicons, filigranes et tampons.

Dans tous les SVG, le texte est vectorisé (converti en tracés). Ils s'affichent donc à l'identique sans
qu'aucune police soit installée.

## Formats livrés

| Fichier | Dimensions | Notes |
|---|---|---|
| `profil-facebook.png` | 320×320 | Monogramme centré, lisible en cercle |
| `profil-instagram.png` | 320×320 | Idem |
| `profil-linkedin.png` | 400×400 | Idem |
| `facebook-couverture.png` | 1640×624 | Contenu dans la zone sûre centrale (≈ 1200×470) |
| `instagram-post.png` | 1080×1080 | Citation de la page d'accueil, mots surlignés |
| `instagram-portrait.png` | 1080×1350 | « Un accompagnement 5 étoiles, 7 jours sur 7 » sur fond crème |
| `instagram-story.png` | 1080×1920 | Marges de 250 px en haut et en bas laissées libres |
| `linkedin-banniere-perso.png` | 1584×396 | Zone bas-gauche laissée libre pour la photo de profil |
| `linkedin-banniere-entreprise.png` | 1128×191 | Contenu décalé vers la droite (logo de la page en bas à gauche) |

## Régénérer

```bash
pip install fonttools uharfbuzz
python3 brand/sources/generate.py               # SVG
NODE_PATH=$(npm root -g) node brand/sources/render.js   # PNG via Playwright/Chromium
```
