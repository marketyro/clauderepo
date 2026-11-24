# Email Brevo – « Grande collecte solidaire de jouets » (Baby Éveil)

Email destiné aux familles actuelles et anciennes du réseau. Même charte que
l'email « berceaux entreprise » : fond crème #fdf6ee, orange #e2702b, vert
#6fae4e, bleu-canard #2f7f8e, jaune #fcc23c, polices Poppins / Fredoka.

## Fichiers

- `email.html` : l'email. La seule image est le logo, déjà hébergé sur le site.
- `apercu-desktop.png` / `apercu-mobile.png` : rendus de contrôle.

## Intégration dans Brevo

1. **Créer le modèle** : Campagnes > Modèles > Nouveau modèle > Coder en HTML >
   coller le contenu de `email.html` > Enregistrer > envoyer un test.

Balises Brevo déjà en place : `{{ mirror }}` et `{{ unsubscribe }}`.

## Objet et pré-header

Objet : « Grande collecte solidaire de jouets : offrez-leur une seconde vie »
Pré-header (dans le HTML) : « Déposez jouets et matériel de puériculture
dans l'une de nos 13 micro-crèches. Les bénéfices de la braderie seront
reversés à des associations. »

## À compléter si besoin

- Date et lieu de la braderie (le texte dit « très prochainement »).
- Date de fin de la collecte si elle est fixée.
- Liste précise de ce qui est accepté ou refusé.

## Rendu mobile

La mise en page est « fluide » : les colonnes s'empilent d'elles-mêmes sur
mobile sans dépendre des media queries, que l'application Gmail (Android et
iOS) ignore. Les aperçus `apercu-mobile.png` sont rendus sans aucune feuille
de style, comme dans Gmail.

Gmail applique son propre mode sombre (fond crème inversé en sombre, cartes
blanches en noir). C'est le comportement de Gmail, pas de l'email ; les
couleurs orange, vert et jaune restent lisibles dans ce mode.
