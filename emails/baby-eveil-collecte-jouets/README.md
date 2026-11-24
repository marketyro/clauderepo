# Email Brevo – « Grande collecte solidaire de jouets » (Baby Éveil)

Email destiné aux familles actuelles et anciennes du réseau, reprenant
l'affiche de la collecte. Même charte que l'email « berceaux entreprise »
(fond crème, Poppins / Fredoka) avec les couleurs de l'affiche
(rose #c7094f, jaune #ffd83f, bleu canard #01687b).

## Fichiers

- `email.html` : l'email.
- `images/affiche-collecte-jouets.jpg` : l'affiche, à héberger (voir ci-dessous).
- `apercu-desktop.png` / `apercu-mobile.png` : rendus de contrôle.

## Intégration dans Brevo

1. **Héberger l'affiche** : importer `images/affiche-collecte-jouets.jpg` dans
   la bibliothèque d'images Brevo (ou dans la médiathèque WordPress du site,
   comme pour la photo d'Astrid) et copier l'URL obtenue.
2. **Remplacer le chemin** dans `email.html` : `src="images/affiche-collecte-jouets.jpg"`
   doit devenir cette URL. Sans cela, le texte alternatif s'affiche à la place.
3. **Créer le modèle** : Campagnes > Modèles > Nouveau modèle > Coder en HTML >
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
