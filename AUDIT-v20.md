# Audit v20 — navigation et SEO

Date : 13 septembre 2026

## Navigation

- La vignette **Présentation** de `accueil.html` pointe vers `index.html`.
- `index.html` reste la présentation visuelle à la racine du domaine.
- Le bouton d’entrée de `index.html` pointe vers `accueil.html`.
- Les liens internes ont été contrôlés : aucun lien local cassé détecté.

## Référencement technique

- 63 pages HTML indexables.
- 63 URL présentes dans `sitemap.xml`.
- 1 page 404 exclue de l’index via `noindex,follow`.
- 63/63 pages indexables ont : title, meta description, canonical, robots, Open Graph et Twitter Card.
- Tous les titles contrôlés restent sous 70 caractères.
- Toutes les meta descriptions contrôlées restent entre 100 et 180 caractères.
- `robots.txt` autorise l’exploration et déclare le sitemap.
- La racine contient les données structurées `WebSite` et `WebPage`.
- 18/18 articles ont un balisage `Article` avec auteur et éditeur.
- Les JSON-LD présents sont syntaxiquement valides.
- Les deux fichiers JavaScript principaux passent `node --check`.

## Performance de la page d’entrée

- L’emblème n’est plus encodé en base64 dans `index.html`.
- `index.html` est passé d’environ 1,25 Mo à environ 4 Ko de HTML.
- L’emblème de la page d’entrée est servi en WebP externe d’environ 137 Ko et préchargé.

## Après déploiement

L’indexation ne peut pas être déclenchée depuis le ZIP seul. Il faut ensuite :

1. valider le domaine dans Google Search Console ;
2. soumettre `https://www.les-esprits-pluriels.be/sitemap.xml` ;
3. inspecter les URL prioritaires et demander leur indexation ;
4. suivre Pages, Sitemaps, Core Web Vitals et résultats enrichis ;
5. soumettre le même sitemap dans Bing Webmaster Tools ou importer la propriété depuis Search Console.
