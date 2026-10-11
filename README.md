<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Aperçu de l’interface VOYO" width="100%">
</p>

<h1 align="center">VOYO — Films, séries &amp; TV</h1>

<p align="center">
  <strong>Votre univers de divertissement, dans une interface moderne et intuitive.</strong><br>
  Un prototype responsive pour parcourir un catalogue, gérer sa liste et explorer les addons compatibles.
</p>

<p align="center">
  <a href="https://mansstyle59.github.io/voyo-streaming/"><strong>▶ Ouvrir VOYO</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/mansstyle59/voyo-streaming/actions">État du déploiement</a>
</p>

---

## ✨ Aperçus de l’application

### 🖥️ Expérience ordinateur

<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="VOYO sur ordinateur : accueil, bannière et catalogue" width="100%">
</p>

### 📱 Expérience mobile

<p align="center">
  <img src="assets/voyo-mobile-preview.svg" alt="VOYO sur mobile : recherche, filtres et catalogue" width="360">
</p>

<sub>Ces illustrations sont des maquettes de présentation et ne sont pas des captures d’écran d’un appareil réel.</sub>

---

## 🚀 Fonctionnalités

- **Accueil de streaming** avec sélection à la une et rangées horizontales.
- **Reprendre la lecture** et indicateurs de progression de démonstration.
- **Top 10 VOYO**, nouveautés et rangées thématiques.
- **Navigation** : Accueil, Films, Séries, TV en direct et Ma liste.
- **Recherche et filtres** par titre, genre, type et description du catalogue de démonstration.
- **Fiches détaillées** avec synopsis, année, durée et informations de démonstration.
- **Ma liste et évaluations** stockées dans le navigateur.
- **Profils de démonstration** : principal, famille et enfants.
- **Gestionnaire d’addons prévu** : l’objectif est de permettre l’ajout de manifestes par URL, l’activation/désactivation, l’import/export de configuration et la découverte des catalogues.
- **Compatibilité Stremio/Nuvio en cours d’étude** : la priorité est le protocole d’addons distant Stremio (`manifest.json`, `catalog`, `meta`, `stream`), sans prétendre couvrir toutes les extensions.
- **Interface responsive** adaptée aux écrans mobiles et ordinateurs.
- **Publication automatisée** via GitHub Actions et GitHub Pages.

## 🧩 Compatibilité d’addons — prochaine étape

La prochaine grande fonction envisagée est une page de gestion d’addons compatible, dans la mesure permise par le navigateur, avec le protocole d’addons distant de Stremio. Le périmètre prévu comprend l’ajout d’un manifeste HTTPS, la validation de `manifest.json`, l’activation/désactivation, la liste des catalogues et l’inspection des ressources `catalog`, `meta` et `stream`.

### Limites techniques à prévoir

- Un addon doit être accessible depuis le navigateur et autoriser les requêtes CORS ; sinon, un service intermédiaire peut être nécessaire.
- La compatibilité sera **partielle tant que chaque ressource et format n’aura pas été testé**. Les catalogues dynamiques, identifiants d’épisode, sous-titres et paramètres propres à chaque addon peuvent nécessiter des adaptations.
- Une URL de flux ne garantit pas que le navigateur puisse la lire. HLS, DASH, torrents, flux protégés, DRM ou formats natifs peuvent demander un lecteur dédié ou un backend.
- Les extensions qui exécutent du code local ne peuvent pas être exécutées directement par cette application statique.
- Les addons sont des services tiers : il faudra examiner les manifestes et n’utiliser que des sources de confiance et autorisées.

VOYO **n’inclut pas automatiquement** un catalogue complet de films, de séries ou de chaînes. Aucun contenu vidéo n’est fourni par le projet lui-même.

## ▶ Essayer VOYO

- [Lancer l’application](https://mansstyle59.github.io/voyo-streaming/)
- [Consulter les exécutions GitHub Actions](https://github.com/mansstyle59/voyo-streaming/actions)

Pour travailler en local, clone ou télécharge le dépôt, puis ouvre `index.html` dans un navigateur récent. Pour l’installation d’addons, l’application doit être servie via HTTPS ou un serveur local adapté.

## 🗂️ Structure du projet

```text
voyo-streaming/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── voyo-desktop-preview.svg
│   └── voyo-mobile-preview.svg
├── index.html
└── README.md
```

## ⚙️ Publication

Le workflow `.github/workflows/deploy.yml` se lance lors des mises à jour de la branche `main`. La publication suppose que GitHub Pages est activé dans les paramètres du dépôt.

- [Ouvrir les exécutions](https://github.com/mansstyle59/voyo-streaming/actions)
- [Paramètres GitHub Pages](https://github.com/mansstyle59/voyo-streaming/settings/pages)

## 🛠️ Prochaines étapes

1. Construire la page de gestion des addons et valider le protocole Stremio de manière progressive.
2. Ajouter un lecteur vidéo adapté aux formats effectivement pris en charge.
3. Tester les addons de façon individuelle, y compris les erreurs CORS et les formats de flux.
4. Étudier une API intermédiaire optionnelle pour les addons qui ne permettent pas l’accès direct depuis le navigateur.
5. Développer une véritable gestion des profils, des préférences et de la synchronisation.

## ℹ️ État actuel et droits des contenus

VOYO reste un **prototype en développement**. Les films, séries et chaînes affichés dans le catalogue principal sont fictifs. La compatibilité Stremio/Nuvio n’est pas encore intégrée dans la version actuelle et ne devra être annoncée qu’après des tests réels par addon. Les profils ne sont pas des comptes sécurisés et les paramètres sont stockés localement dans le navigateur.

N’utilise que des contenus et des flux que tu es autorisé à consulter ou diffuser. Les marques, logiciels tiers et contenus cités ou intégrés appartiennent à leurs propriétaires respectifs.

---

<p align="center"><strong>VOYO</strong> · Projet indépendant en développement</p>
