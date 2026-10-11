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

VOYO utilise le protocole HTTP des addons distants Stremio, de manière expérimentale. La reconstruction actuelle est une interface web indépendante inspirée fonctionnellement des usages de Nuvio ; elle ne prétend pas être une copie officielle de Nuvio :

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

## Reconstruction VOYO (11 octobre 2026)

L'accueil a été reconstruit avec une nouvelle interface responsive, une bannière de titre sélectionné, des rangées de films et de séries, recherche, fiches détaillées, liste personnelle et catalogues d'extensions. Les titres sont chargés dynamiquement depuis Cinemeta ; aucun catalogue fictif n'est injecté comme solution de secours.

### Limites à connaître
- Les catalogues fournissent des métadonnées, pas des droits de diffusion ni nécessairement des flux vidéo.
- La disponibilité de Cinemeta et les règles CORS du navigateur peuvent varier.
- Les extensions sont stockées localement par navigateur ; elles ne sont pas synchronisées entre appareils.
- Cette version n'implémente pas encore toutes les fonctions natives ou avancées de Nuvio (par exemple la synchronisation de compte, la reprise de lecture multi-appareils ou un lecteur universel). Ne pas présenter ces fonctions comme déjà disponibles.

### Licence et attribution
VOYO est un projet indépendant. Le dépôt public de référence NuvioTV indique la licence GNU GPL v3 : [NuvioMedia/NuvioTV](https://github.com/NuvioMedia/NuvioTV). Cette refonte s'inspire de ses fonctionnalités et usages, sans présenter VOYO comme un produit officiel Nuvio ni copier l'intégralité de son application. Si du code GPL est repris ou adapté dans le futur, conserver les notices de copyright et de licence applicables, fournir le code source correspondant et respecter les obligations de la GPL-3.0. Vérifier les licences de chaque dépendance et ressource graphique séparément.

### Règle de maintenance
À chaque modification de l'application, mettre à jour ce README dans la même série de changements, actualiser les tests pertinents et ne déclarer la publication terminée qu'après réussite de GitHub Actions.


## Reconstruction VOYO — 11 octobre 2026

- Remplacement de l’ancienne page d’accueil par une interface web responsive reconstruite autour de catalogues réels, d’une recherche, de fiches détaillées, d’une liste personnelle locale et d’une gestion des extensions existante.
- Le projet Nuvio est développé sous GPL-3.0 ; VOYO s’en inspire fonctionnellement sans revendiquer être Nuvio ni reproduire son application native Android. Référence amont : https://github.com/NuvioMedia/NuvioTV.
- Les catalogues Cinemeta fournissent des métadonnées et affiches, pas les droits de diffusion ni automatiquement les flux vidéo. Les sources doivent être ajoutées par l’utilisateur et utilisées légalement.
- Les tests de fumée sont alignés sur le nouveau comportement : chargement du catalogue simulé, recherche, fiche, liste personnelle et état d’erreur. Chaque modification future doit mettre à jour ce README.


## Harmonisation visuelle VOYO — 11 octobre 2026

- Palette de l’accueil alignée sur le logo VOYO : dégradé cyan → bleu → violet pour le mot-symbole, les actions principales et les accents de navigation.
- Fond sombre cinématographique conservé pour faire ressortir les affiches et maintenir la lisibilité.
- L’interface principale reste en français ; les tests vérifient désormais la langue déclarée et la présence de la palette de marque.
- La page de gestion des extensions utilisait déjà un dégradé cyan/bleu/violet cohérent ; elle est conservée. Vérification automatisée et publication via GitHub Actions après cette modification.


## Intégration NuvioTVSmart avec les couleurs VOYO — 11 octobre 2026

La branche `integrate/nuvio-tvsmart-voyo-theme` prépare une compilation reproductible de l'application web officielle [NuvioTVSmart](https://github.com/NuvioMedia/NuvioTVSmart). Le workflow GitHub Actions récupère le dépôt amont à la compilation, installe ses dépendances avec `npm ci`, lance `npm run build`, puis prépare les fichiers statiques à publier avec une surcharge de thème VOYO cyan → bleu → violet.

Le build publié conserve la licence GPL-3.0 et la documentation amont dans les fichiers de publication, avec attribution explicite. VOYO n'est pas une distribution officielle de Nuvio.

**Compatibilité :** NuvioTVSmart cible principalement les téléviseurs Samsung Tizen et LG webOS. Certaines fonctions utilisent des API et services locaux spécifiques à ces plateformes ; même si la compilation web réussit, elles peuvent ne pas fonctionner dans un navigateur ordinaire ou sur iPhone.

**Statut de publication :** l’intégration NuvioTVSmart et le thème VOYO sont maintenant fusionnés dans `main`. Le workflow de production compile puis publie le site sur GitHub Pages ; le workflow historique de l’interface VOYO effectue uniquement des tests et ne publie plus par-dessus Nuvio.


## Déploiement Nuvio avec l’identité visuelle VOYO — 11 octobre 2026

La publication GitHub Pages est désormais construite depuis le dépôt officiel [NuvioTVSmart](https://github.com/NuvioMedia/NuvioTVSmart), épinglé sur la révision [`cfec25654f0580028d9a78a41b037bcd48af2a29`](https://github.com/NuvioMedia/NuvioTVSmart/commit/cfec25654f0580028d9a78a41b037bcd48af2a29). Le workflow `.github/workflows/nuvio-build.yml` installe les dépendances, compile l'application, ajoute les couleurs VOYO (cyan `#2de0df`, bleu `#438bff`, violet `#762dff`) et publie le répertoire construit.

Le workflow `.github/workflows/deploy.yml` est maintenant réservé aux tests de l’ancienne interface VOYO dans le dépôt ; il ne publie plus le site afin d’éviter qu’il écrase la version Nuvio générée.

### Limites et compatibilité

NuvioTVSmart est conçu avant tout pour les téléviseurs Samsung Tizen et LG webOS. Les fonctions reposant sur des API ou services TV locaux peuvent ne pas être disponibles sur GitHub Pages dans un navigateur iPhone ou ordinateur. La réussite de la compilation ne signifie pas que chaque fonction est compatible avec chaque navigateur.

### Licence et attribution

La publication inclut la licence GPL-3.0 et le README amont de NuvioTVSmart, ainsi qu’un fichier `VOYO-ATTRIBUTION.txt` indiquant le dépôt et la révision sources exacts. Les changements de thème sont définis dans le workflow public de VOYO. VOYO est un build indépendant et non une version officielle de Nuvio.

### Journal du changement — 11 octobre 2026

- Ajout d’un workflow de compilation et de publication NuvioTVSmart, avec thème VOYO cyan/bleu/violet.
- Source Nuvio épinglée sur une révision précise pour rendre le build reproductible.
- Workflow historique VOYO converti en tests uniquement afin qu’il ne remplace pas les fichiers Nuvio publiés.
- Référence à la GPL-3.0, à l’attribution et aux limites des API spécifiques aux téléviseurs.


## Adaptation mobile et Smart TV — 11 octobre 2026

Le workflow de publication ajoute désormais une couche CSS responsive au build NuvioTVSmart :
- **Mobile (≤ 700 px)** : marges, boutons, textes et cartes réduits, prévention des débordements horizontaux, champs de formulaire lisibles, disposition verticale prévue pour les écrans de connexion/appairage.
- **Tablettes et petits écrans (701–1100 px)** : tailles intermédiaires et marges adaptées.
- **Smart TV (≥ 1101 px)** : conserve la mise en page grand écran et renforce l’indication de focus clavier/télécommande.
- **Accessibilité** : respecte la préférence de réduction des animations.

Le CSS est appliqué au fichier compilé `dist/css/bundle.css` pendant le workflow ; il ne modifie pas les fichiers sources amont. Les interfaces précises de connexion varient selon les écrans Nuvio : vérifier sur un vrai iPhone et sur la cible TV, notamment les écrans d'appairage et les commandes D-pad.


## Mise à jour mobile / Smart TV — suivi du déploiement

La couche responsive a été ajoutée au workflow de production et le README a été corrigé pour refléter l'état réel du projet. Le dernier build a réussi les étapes de compilation, de validation des fichiers, d'application du thème et de préparation des fichiers publiés. La vérification finale du déploiement GitHub Pages est consultable dans [GitHub Actions](https://github.com/mansstyle59/voyo-streaming/actions).

**À tester sur appareils réels :** iPhone Safari (portrait et paysage), Android si disponible, et Smart TV avec télécommande. La règle responsive vise à réduire les débordements de l'écran d'appairage, mais les écrans d'authentification exacts peuvent dépendre du code applicatif amont et des API propres à chaque téléviseur.


### Correctif ciblé d’après les captures iPhone — 12 octobre 2026

Les captures ont montré deux problèmes concrets : la sélection de profil utilisait des avatars trop grands pour un téléphone, et l’écran d’accueil conservait la navigation verticale prévue pour une TV. Le CSS du build cible maintenant les classes réelles de NuvioTVSmart :
- cartes et avatars de profil réduits avec une grille adaptable ;
- navigation mobile fixée en bas, avec icônes et libellés ;
- contenu principal limité à la largeur du téléphone et espace réservé à la navigation basse ;
- navigation latérale et tailles de focus grand écran conservées sur TV ;
- couleurs de marque VOYO préservées.

Ces règles sont ajoutées au CSS généré lors du build. Le résultat doit être vérifié sur iPhone et sur une TV réelle ; une capture du site ou un build réussi ne suffit pas à garantir tous les parcours interactifs.
