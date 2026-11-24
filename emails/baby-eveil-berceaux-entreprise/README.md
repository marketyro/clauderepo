# Email Brevo – « Une place en crèche, grâce à votre employeur » (Baby Éveil)

Reproduction en HTML email (tables, 640 px, responsive) de la page 1 de la
lettre PDF « Réservation de berceaux entreprise ». La page 2 (Qui sommes-nous,
chiffres clés, carte) est remplacée par un bouton « Qui sommes-nous ? » qui
ouvre le PDF de présentation hébergé sur le site
(wp-content/uploads/2026/11/BE-Qui-sommes-nous.pdf). Compatible import HTML Brevo.

## Fichiers

- `email.html` : l'email (page 1 du PDF + bouton « Qui sommes-nous ? » qui
  ouvre le PDF de présentation hébergé sur le site). Toutes ses images
  (logo, bébé, photo d'Astrid) sont hébergées sur crechebabyeveil.fr :
  rien à importer dans Brevo.
- `apercu-desktop.png` / `apercu-mobile.png` : rendus de contrôle.

## Intégration dans Brevo

1. **Créer le modèle** : Brevo > Campagnes > Modèles > Nouveau modèle >
   « Coder en HTML » > « Coller le code » > coller tout le contenu de
   `email.html` > Enregistrer. Envoyer un test (Outlook, Gmail, iPhone).

Les balises Brevo sont déjà en place : `{{ mirror }}` (version en ligne) et
`{{ unsubscribe }}` (désinscription).

## Charte reprise du PDF / du site

| Usage              | Couleur   |
|--------------------|-----------|
| Fond crème         | `#fdf6ee` |
| Orange (bandeaux)  | `#e2702b` |
| Vert (pastilles)   | `#6fae4e` |
| Vert titres        | `#4f8a32` |
| Orange titres      | `#c25a17` |
| Bleu-canard        | `#2f7f8e` |
| Jaune              | `#b88a0c` |

Polices : Poppins (titres) et Fredoka (texte), chargées depuis Google Fonts,
avec repli Trebuchet MS / Arial pour Gmail et Outlook.

Objet suggéré : « Une place en crèche, grâce à votre employeur »
Pré-header (déjà dans le HTML) : « Une entreprise réserve un berceau pour
l'enfant d'un salarié : 152 € de moins chaque mois pour le parent,
75 % défiscalisé pour l'entreprise. »

## Rendu mobile

La mise en page est « fluide » : les colonnes s'empilent d'elles-mêmes sur
mobile sans dépendre des media queries, que l'application Gmail (Android et
iOS) ignore. Les aperçus `apercu-mobile.png` sont rendus sans aucune feuille
de style, comme dans Gmail.

Gmail applique son propre mode sombre (fond crème inversé en sombre, cartes
blanches en noir). C'est le comportement de Gmail, pas de l'email ; les
couleurs orange, vert et jaune restent lisibles dans ce mode.
