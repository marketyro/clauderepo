# Email Brevo – « Une place en crèche, grâce à votre employeur » (Baby Éveil)

Reproduction en HTML email (tables, 640 px, responsive) de la lettre PDF
« Réservation de berceaux entreprise ». Compatible import HTML Brevo.

## Fichiers

- `email.html` : l'email complet (page 1 + page 2 du PDF).
- `images/` : les 5 images qui ne sont pas hébergées sur crechebabyeveil.fr
  (photo d'Astrid, 3 photos de crèches, carte du Languedoc).
- `apercu-desktop.png` / `apercu-mobile.png` : rendus de contrôle.

Le logo et la photo du bébé pointent déjà vers des images hébergées sur
crechebabyeveil.fr, rien à faire pour elles.

## Intégration dans Brevo (3 étapes)

1. **Héberger les 5 images** : Brevo > Campagnes > Modèles > « Bibliothèque
   d'images » (ou n'importe quel onglet « Images » de l'éditeur). Importer les
   5 fichiers du dossier `images/` et copier l'URL de chacun.
2. **Remplacer les chemins** dans `email.html` : chaque `src="images/xxx.jpg"`
   doit devenir l'URL Brevo correspondante (recherche/remplacement de
   `images/` par le préfixe d'URL fourni par Brevo suffit en général).
3. **Créer le modèle** : Brevo > Campagnes > Modèles > Nouveau modèle >
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
