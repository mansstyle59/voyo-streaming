<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Aperçu de l’interface VOYO" width="100%">
</p>

<h1 align="center">VOYO — Films, séries &amp; TV</h1>

<p align="center">
  <strong>Une interface de streaming responsive avec catalogues connectés par addons.</strong><br>
  Prototype web indépendant inspiré des habitudes des plateformes de streaming, avec une identité VOYO originale.
</p>

<p align="center">
  <a href="https://mansstyle59.github.io/voyo-streaming/"><strong>▶ Ouvrir VOYO</strong></a>
  &nbsp;·&nbsp;
  <a href="https://mansstyle59.github.io/voyo-streaming/addons.html"><strong>🧩 Gestion des addons</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/mansstyle59/voyo-streaming/actions"><strong>Tests &amp; déploiement</strong></a>
</p>

---

## ✨ Aperçus de l’interface

### 🖥️ Ordinateur

<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Maquette de l’accueil VOYO sur ordinateur" width="100%">
</p>

### 📱 Mobile

<p align="center">
  <img src="assets/voyo-mobile-preview.svg" alt="Maquette de VOYO sur mobile" width="360">
</p>

<sub>Ces deux illustrations sont des maquettes de présentation, pas des captures d’écran réelles de la version actuellement déployée.</sub>

---

## 🚀 Fonctionnalités présentes

- **Accueil cinéma** avec une sélection à la une, rangées horizontales, Top 10, nouveautés et genres.
- **Reprendre à regarder** avec indicateurs de progression illustratifs.
- **Navigation responsive** pour accueil, films, séries, TV et bibliothèque, avec menu mobile en bas de l’écran.
- **Recherche locale** dans les titres et descriptions du catalogue de démonstration.
- **Fiches détaillées** pour les titres fictifs et les titres provenant d’un addon.
- **Ma liste et évaluations** conservées localement dans le navigateur pour le catalogue de démonstration.
- **Gestionnaire d’addons** : ajout par URL de manifeste, vérification, activation/désactivation, suppression, import/export JSON et détails du manifeste.
- **Catalogues d’addons sur l’accueil** : VOYO tente de récupérer les catalogues des addons actifs et d’afficher leurs titres sous forme de rangées.
- **Fiches de titres externes** : récupération des métadonnées et des épisodes lorsqu’un addon les expose.
- **Découverte de flux** : interrogation de la ressource `stream` si elle est annoncée par un addon. La lecture intégrée dépend du format et des capacités du navigateur.
- **Vérifications automatiques** : GitHub Actions contrôle la syntaxe JavaScript, lance des tests de parcours navigateur simulé et effectue un diagnostic réseau du manifeste configuré avant la publication.
- **Publication automatique** via GitHub Pages.

## 🧩 Addons compatibles Stremio

**[Ouvrir le gestionnaire d’addons VOYO](https://mansstyle59.github.io/voyo-streaming/addons.html)**

Le gestionnaire utilise le protocole HTTP d’addons distant de Stremio. Le parcours comprend la lecture de `manifest.json`, l’affichage des catalogues déclarés et les ressources compatibles telles que :

| Ressource | Utilisation dans VOYO |
|---|---|
| `manifest.json` | Lire l’identifiant, le nom, les ressources et les catalogues de l’addon. |
| `catalog` | Récupérer les titres et leurs affiches pour les rangées de l’accueil ou la page Addons. |
| `meta` | Obtenir les descriptions, détails, genres et épisodes quand ils sont fournis. |
| `stream` | Rechercher les sources d’un titre lorsque l’addon déclare cette ressource. |

### Addon French Stream (Public) configuré

VOYO préconfigure le manifeste public suivant :

`https://addon-stremio-fs-public.stremio-fs-public.workers.dev/manifest.json`

Le diagnostic GitHub a confirmé que ce manifeste répond en HTTP 200, autorise CORS (`Access-Control-Allow-Origin: *`) et expose notamment les catalogues **FS - Derniers Films**, **FS - Films Action**, **FS - Dernières Séries** et plusieurs rangées de séries. Lors d’une exécution de diagnostic, plusieurs catalogues ont renvoyé des titres. Les catalogues de recherche peuvent renvoyer zéro résultat tant qu’aucune requête n’est fournie.

**Limitation importante :** le manifeste observé annonce les ressources `catalog` et `meta`, mais pas `stream`. Il permet donc d’explorer les catalogues et fiches qu’il expose, mais ne fournit pas directement de sources vidéo via le protocole Stremio dans cette configuration.

### Limites à connaître

- La compatibilité varie selon chaque addon, son manifeste, ses options `extra`, ses identifiants de contenu et ses réponses.
- Un addon doit autoriser les requêtes CORS du navigateur. Si le service les bloque, un backend intermédiaire sera nécessaire.
- Une URL de flux ne garantit pas la lecture dans le navigateur. HLS, DASH, torrents, DRM, en-têtes obligatoires, flux protégés ou formats natifs peuvent demander un lecteur ou un service supplémentaire.
- Les extensions qui exécutent du code local ne sont pas lancées par cette application web statique.
- Les addons sont des services tiers. Vérifie leur origine et n’utilise que des contenus et flux que tu es autorisé à consulter ou diffuser.

VOYO ne fournit pas lui-même de catalogue vidéo sous licence ni de chaînes en direct. Les titres de démonstration sont fictifs ; les contenus d’addons sont renvoyés par des services externes.

## ▶ Tester VOYO

- [Application web](https://mansstyle59.github.io/voyo-streaming/)
- [Gestion des addons](https://mansstyle59.github.io/voyo-streaming/addons.html)
- [Historique des tests et déploiements](https://github.com/mansstyle59/voyo-streaming/actions)
- [Code source](https://github.com/mansstyle59/voyo-streaming)

Sur iPhone, ouvre la démo avec Safari et actualise la page si une ancienne version reste en cache. Les addons et la liste sont enregistrés dans le navigateur utilisé ; ils ne sont pas synchronisés entre appareils.

Pour tester en local, clone le dépôt et ouvre `index.html` dans un navigateur. Les appels réseau d’addons nécessitent un contexte HTTPS ou un serveur local adapté.

## 🗂️ Structure du dépôt

```text
voyo-streaming/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── voyo-desktop-preview.svg
│   └── voyo-mobile-preview.svg
├── tests/
│   └── smoke.mjs
├── index.html
├── addons.html
└── README.md
```

## ⚙️ Tests et publication

Le workflow `.github/workflows/deploy.yml` s’exécute sur les mises à jour de `main`. Il effectue les contrôles suivants avant publication :

1. Extrait le JavaScript en ligne de `index.html` et `addons.html`, puis en vérifie la syntaxe avec Node.
2. Exécute `tests/smoke.mjs` dans jsdom pour vérifier le rendu de catalogues, l’ouverture des fiches, la recherche de flux de test et le chemin d’erreur d’installation.
3. Interroge le manifeste distant configuré ainsi que plusieurs catalogues à titre de diagnostic. Cette vérification réseau est informative et ne bloque pas la publication si le service distant ne répond pas.
4. Publie les fichiers statiques avec GitHub Pages si les tests bloquants passent.

Liens utiles : [Actions](https://github.com/mansstyle59/voyo-streaming/actions) · [Paramètres GitHub Pages](https://github.com/mansstyle59/voyo-streaming/settings/pages).

## 🛠️ Prochaines étapes

1. Ajouter un paramètre de recherche transmis aux catalogues d’addons qui le prennent en charge.
2. Élargir la compatibilité des identifiants d’épisodes et des options de catalogues.
3. Ajouter un lecteur plus complet pour les formats compatibles avec le navigateur et les sous-titres externes.
4. Ajouter des tests d’intégration supplémentaires sur appareils réels, notamment Safari iOS.
5. Étudier un backend facultatif pour les addons bloqués par CORS et une vraie synchronisation des profils, listes et historiques.

## ℹ️ Licence, droits et état du projet

VOYO est un projet indépendant en développement. Il n’est pas affilié à Netflix, Stremio ou Nuvio. L’interface originale s’inspire de conventions générales des applications de streaming ; les logos et éléments distinctifs de marques tierces ne sont pas revendiqués comme appartenant à VOYO.

Les titres et chaînes du catalogue de démonstration sont fictifs. Les métadonnées et flux affichés par la page Addons proviennent de services tiers. La compatibilité avec chaque addon doit être testée séparément et ne garantit pas la lecture d’un contenu.

N’utilise que des sources que tu es autorisé à consulter et à diffuser, et respecte les conditions des services tiers.

---

<p align="center"><strong>VOYO</strong> · Projet indépendant en développement</p>
