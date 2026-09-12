# Les Esprits Pluriels

Site statique consacré à la neurodiversité.

## Rubriques

- Neurodiversité
- Connaissances
- Témoignages
- Outils
- Vie quotidienne
- Travail
- Relations
- Société

## Publication avec GitHub Pages

Le dépôt est prêt pour GitHub Pages.

1. Créer un dépôt GitHub nommé `les-esprits-pluriels`.
2. Envoyer tout le contenu de ce dossier à la racine de la branche `main`.
3. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
4. Le workflow `.github/workflows/pages.yml` publiera automatiquement le site après chaque envoi sur `main`.

Le fichier `.nojekyll` permet également une publication statique directe si vous choisissez ensuite un autre mode de déploiement GitHub Pages.

## Structure

```text
.
├── .github/workflows/pages.yml
├── .nojekyll
├── 404.html
├── index.html
├── neurodiversite.html
├── connaissances.html
├── temoignages.html
├── outils.html
├── vie-quotidienne.html
├── travail.html
├── relations.html
├── societe.html
├── manifest.webmanifest
├── robots.txt
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/
```

## Prévisualisation locale

Un simple serveur HTTP suffit. Par exemple :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Nom de dépôt conseillé

`les-esprits-pluriels`

Le site fonctionnera aussi bien comme dépôt de projet GitHub Pages (`https://utilisateur.github.io/les-esprits-pluriels/`) que derrière un domaine personnalisé, puisque les liens et ressources sont relatifs.
