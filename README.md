<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Aperçu de VOYO" width="100%">
</p>

<h1 align="center">VOYO — Films, séries &amp; TV</h1>

<p align="center">
  <strong>Une interface de streaming responsive avec des catalogues connectés par addons.</strong><br>
  Projet web indépendant avec identité visuelle VOYO et navigation pensée pour ordinateur et mobile.
</p>

<p align="center">
  <a href="https://mansstyle59.github.io/voyo-streaming/"><strong>▶ Ouvrir VOYO</strong></a>
  &nbsp;·&nbsp;
  <a href="https://mansstyle59.github.io/voyo-streaming/addons.html"><strong>🧩 Gestion des addons</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/mansstyle59/voyo-streaming/actions"><strong>Tests &amp; déploiement</strong></a>
</p>

---

## Aperçus

### Ordinateur

<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Maquette desktop VOYO" width="100%">
</p>

### Mobile

<p align="center">
  <img src="assets/voyo-mobile-preview.svg" alt="Maquette mobile VOYO" width="360">
</p>

<sub>Les visuels sont des maquettes d’illustration, pas des captures d’écran réelles de la dernière version publiée.</sub>

---

## Fonctionnalités de la version reconstruite

- **Catalogue réel dynamique** : chargement des catalogues Cinemeta pour les films et les séries, avec affiches, année, genres, notes et descriptions lorsqu’ils sont fournis.
- **Nouvelle interface VOYO** : navigation simplifiée, mise en avant éditoriale, rangées horizontales, grille de résultats, fiches détaillées et barre de navigation mobile.
- **Recherche et filtres** : recherche dans les métadonnées chargées et vues Films, Séries et Ma liste.
- **Ma liste** : enregistrée localement dans le navigateur actuel.
- **Extensions** : la page `addons.html` reste disponible pour configurer les addons Stremio ; les catalogues compatibles peuvent être affichés sur l’accueil.
- **Menu mobile** : navigation flottante en bas de l’écran, recherche, bibliothèque et profil.
- **Gestion des addons** : ajout par URL de manifeste, vérification, activer/désactiver, supprimer, importer/exporter JSON et explorer les catalogues.
- **Tests automatiques** via GitHub Actions : contrôle de syntaxe JavaScript, tests de parcours simulé et diagnostic réseau non bloquant du manifeste configuré.
- **Publication statique** par GitHub Pages.

## Gestion des addons Stremio

**[Ouvrir la page Addons](https://mansstyle59.github.io/voyo-streaming/addons.html)**

VOYO utilise le protocole HTTP des addons distants Stremio, de manière expérimentale :

| Ressource | Usage |
|---|---|
| `manifest.json` | Lire l’identité, les ressources et les catalogues déclarés. |
| `catalog` | Charger les titres d’un catalogue pour créer des rangées de cartes. |
| `meta` | Charger les détails d’un titre et les épisodes lorsque l’addon les expose. |
| `stream` | Demander des sources uniquement si cette ressource est déclarée par l’addon. |

### Manifeste public configuré

L’application préconfigure l’URL publique du service :

`https://addon-stremio-fs-public.stremio-fs-public.workers.dev/manifest.json`

Cette URL racine est utilisée dans le dépôt pour éviter d’exposer dans le code public un lien de configuration qui pourrait contenir des paramètres privés. Le diagnostic lancé par GitHub Actions a confirmé que le manifeste répond en HTTP 200, avec `Access-Control-Allow-Origin: *`, et qu’il déclare les ressources `catalog` et `meta`.

Plusieurs catalogues ont renvoyé des titres lors du diagnostic, notamment **FS - Films Action**, **FS - Dernières Séries** et des rangées de séries. Les catalogues de recherche n’ont pas de résultats tant qu’aucun terme n’est transmis ; la barre de recherche VOYO transmet désormais le terme saisi aux catalogues qui correspondent à une recherche.

**Limite importante :** le manifeste public testé n’annonce pas la ressource `stream`. Il peut donc exposer des catalogues et des fiches mais ne fournit pas directement de flux vidéo par le protocole Stremio dans cette configuration. L’interface n’invente pas de lien de lecture lorsque le service ne fournit pas de flux.

### Limites techniques

- Certains addons peuvent renvoyer des réponses lentes ; les catalogues sont chargés en parallèle avec un délai par requête.
- Les paramètres `extra`, les identifiants d’épisodes et les formes de réponse peuvent varier d’un addon à l’autre.
- Le navigateur doit pouvoir interroger le service tiers (CORS et accès réseau).
- HLS, DASH, torrents, DRM, flux avec en-têtes particuliers et formats natifs peuvent demander un lecteur ou un backend spécifique.
- Les addons qui exécutent du code local ne sont pas lancés par cette application statique.
- La liste et les préférences sont locales au navigateur ; il n’y a pas encore de comptes sécurisés ni de synchronisation entre appareils.

Ajoute uniquement des addons de confiance et des contenus ou flux que tu es autorisé à consulter ou diffuser.

## Essayer VOYO

- [Application](https://mansstyle59.github.io/voyo-streaming/)
- [Gestion des addons](https://mansstyle59.github.io/voyo-streaming/addons.html)
- [Tests et déploiements](https://github.com/mansstyle59/voyo-streaming/actions)
- [Code source](https://github.com/mansstyle59/voyo-streaming)

Pour le développement local, clone le dépôt et sers les fichiers avec un serveur local ou HTTPS : certains navigateurs limitent les appels réseau depuis des pages ouvertes directement en fichier.

## Structure du dépôt

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

## Vérification et publication

Le workflow `.github/workflows/deploy.yml` est lancé lors des modifications sur `main`. Il :

1. extrait le JavaScript de `index.html` et `addons.html`, puis vérifie la syntaxe avec Node ;
2. installe une dépendance de test et exécute `tests/smoke.mjs`, qui simule les réponses d’un addon pour tester l’accueil, les catalogues, les détails, la recherche de flux et les erreurs de manifeste ;
3. teste le manifeste public et plusieurs catalogues à titre de diagnostic. Ce contrôle réseau est informatif et ne bloque pas le déploiement en cas de problème côté service tiers ;
4. publie les fichiers statiques par GitHub Pages si les contrôles bloquants réussissent.

- [Dernières exécutions](https://github.com/mansstyle59/voyo-streaming/actions)
- [Paramètres GitHub Pages](https://github.com/mansstyle59/voyo-streaming/settings/pages)

## Suite du développement

1. Améliorer les options avancées de recherche et les paramètres spécifiques d’addons.
2. Ajouter un lecteur plus complet pour les formats pris en charge et les sous-titres externes.
3. Tester davantage d’addons et de réponses d’épisodes sur des appareils réels, notamment Safari iOS.
4. Étudier un backend optionnel pour les addons qui ne supportent pas CORS.
5. Ajouter de vrais comptes, le contrôle parental et la synchronisation sécurisée entre appareils.

## Projet indépendant et compatibilité de licence

VOYO est une implémentation indépendante qui s’inspire des parcours fonctionnels des applications de streaming comme Nuvio (navigation, catalogues, fiches et extensions). Le nouveau `index.html` a été écrit pour VOYO ; il ne prétend pas être une copie binaire ou une reprise mot pour mot du code source Nuvio. Le dépôt amont [NuvioMedia/NuvioTV](https://github.com/NuvioMedia/NuvioTV) publie son code sous GPL-3.0. Si du code GPL de Nuvio est intégré à l’avenir, il faudra conserver les mentions de copyright, joindre la licence et distribuer le code source correspondant selon les obligations de GPL-3.0. VOYO n’est pas affilié à Nuvio, Netflix ou Stremio. Les métadonnées des films et séries sont chargées depuis Cinemeta, service tiers de métadonnées compatible avec l’écosystème Stremio. VOYO n’héberge pas ces contenus et ne fournit pas automatiquement les droits de diffusion ni les flux vidéo. Les options de lecture doivent venir de sources autorisées.

---

<p align="center"><strong>VOYO</strong> · Projet indépendant en développement</p>

## Règle de maintenance — documentation systématique

**Chaque modification du projet doit aussi mettre à jour ce README dans la même série de changements.** Avant de terminer une tâche :
1. Mettre à jour les sections concernées (fonctionnalités, configuration, limites, captures ou étapes de test).
2. Mentionner les changements et les limites qui restent dans ce document ; ne pas présenter une fonctionnalité comme disponible avant qu'elle ait été testée.
3. Vérifier le JavaScript, exécuter les tests de fumée et vérifier le déploiement GitHub Pages.
4. Ne considérer une modification comme terminée qu'après la réussite des vérifications. Si le comportement ne change pas mais que la modification est purement interne, ajouter tout de même une courte note au journal des changements ci-dessous.

## Journal des changements

- **2026-10-11** — Ajout de la règle de maintenance : mettre à jour le README à chaque modification du projet et vérifier les tests et le déploiement.


- **2026-10-11** — Reconstruction de l’interface principale : catalogues réels, navigation mobile, recherche, fiches et liste locale ; tests adaptés au nouveau parcours. La page de gestion des addons est conservée. Documentation mise à jour dans le même lot.
