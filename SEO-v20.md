# SEO technique — v20

Mise à jour : 13 septembre 2026.

## Intégré dans le site

- `index.html` reste la présentation à la racine `/` et `accueil.html` reste le hub éditorial.
- Vignette **Présentation** sur `accueil.html` reliée à `/index.html` (donc à la page de présentation).
- Titles et meta descriptions revus sur les pages principales et les dossiers dont les titres étaient trop longs ou trop génériques.
- Canonicals conservés en auto-référence : `/` pour la présentation, `/accueil.html` pour le hub éditorial, URL propre pour chaque contenu.
- `robots` meta complété sur les pages indexables ; `404.html` en `noindex,follow`.
- Open Graph et Twitter Card complétés sur toutes les pages indexables.
- Données structurées `WebSite` + `WebPage` sur la racine.
- Données structurées `Article` enrichies avec auteur et éditeur.
- Sitemap régénéré avec toutes les pages HTML indexables et sans la 404.
- `robots.txt` autorise l’exploration et déclare le sitemap.
- L’image de la page d’entrée n’est plus embarquée en base64 : WebP externe préchargé pour réduire fortement le poids HTML.

## À faire après mise en ligne

1. Ajouter le domaine dans **Google Search Console** avec une propriété Domaine et valider par DNS.
2. Envoyer `https://www.les-esprits-pluriels.be/sitemap.xml`.
3. Inspecter en priorité `/`, `/accueil.html`, `/annuaire-francophone.html`, `/articles.html` et les dossiers TDAH/burnout.
4. Demander l’indexation des pages prioritaires après déploiement.
5. Vérifier les rapports Pages, Sitemaps, Core Web Vitals et résultats enrichis.
6. Dans **Bing Webmaster Tools**, importer la propriété depuis Search Console ou soumettre le même sitemap.

Aucune balise de vérification Search Console/Bing n’est inventée : elle doit provenir du compte propriétaire du domaine.
