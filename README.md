<p align="center">
  <img src="assets/voyo-desktop-preview.svg" alt="Aperçu de l’interface VOYO" width="100%">
</p>

<h1 align="center">VOYO — Films, séries &amp; TV</h1>

<p align="center">
  <strong>Votre univers de divertissement, dans une interface moderne et intuitive.</strong><br>
  Une interface responsive de découverte inspirée des grands services de streaming, avec une identité VOYO originale.
</p>

<p align="center">
  <a href="https://mansstyle59.github.io/voyo-streaming/"><strong>▶ Ouvrir la démo</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/mansstyle59/voyo-streaming/actions">État du déploiement</a>
  &nbsp;·&nbsp;
  <a href="index.html">Code de l’application</a>
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

<sub>Les illustrations ci-dessus sont des maquettes visuelles créées pour présenter le projet. Elles ne sont pas des captures d’écran prises sur un appareil réel.</sub>

---

## 🚀 Fonctionnalités du prototype

- **Identité VOYO** — thème sombre et dégradé cyan, bleu et violet.
- **Accueil éditorial** avec sélection à la une et rangées de contenus horizontales.
- **Reprendre la lecture** avec indicateurs de progression de démonstration.
- **Top 10 VOYO**, nouveautés et rangées par genre ou type de contenu.
- **Navigation** — Accueil, Films, Séries, TV en direct et Ma liste.
- **Recherche** sur les titres, genres et descriptions du catalogue de démonstration.
- **Fiches détaillées** avec synopsis, année, durée, classification indicative et distribution fictive.
- **Ma liste** et évaluations enregistrées dans le navigateur.
- **Sélecteur de profils de démonstration** : principal, famille et enfants.
- **Responsive** : rails horizontaux sur ordinateur et mobile, avec navigation mobile adaptée.
- **Publication automatisée** — workflow GitHub Actions pour GitHub Pages.

## ▶ Essayer VOYO

**[Lancer la démo web](https://mansstyle59.github.io/voyo-streaming/)**

Pour tester en local, téléchargez ou clonez le dépôt, puis ouvrez `index.html` dans un navigateur récent.

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

Le workflow `.github/workflows/deploy.yml` se déclenche lors des mises à jour de la branche `main`. Il peut aussi être lancé manuellement depuis l’onglet **Actions**.

- [Consulter les exécutions GitHub Actions](https://github.com/mansstyle59/voyo-streaming/actions)
- [Ouvrir les paramètres GitHub Pages](https://github.com/mansstyle59/voyo-streaming/settings/pages)

## 🛠️ Prochaines étapes

1. Intégrer un lecteur vidéo pour les sources prises en charge.
2. Connecter des sources et flux **autorisés**.
3. Améliorer les fiches et les visuels du catalogue.
4. Étudier la synchronisation de la liste entre appareils et la prise en charge des téléviseurs.

## ℹ️ État actuel et droits des contenus

VOYO est actuellement un **prototype d’interface**. Les titres, descriptions, notes, progrès de lecture et chaînes affichés sont des exemples de démonstration : aucun film, épisode ou flux TV réel n’est connecté. Le bouton « Lire » explique cette limite au lieu de simuler une lecture réelle. Les profils ne sont pas des comptes sécurisés et les préférences sont stockées localement dans le navigateur.

N’ajoutez que des contenus et des flux que vous êtes autorisé à consulter ou diffuser. Les marques et œuvres citées ou représentées appartiennent à leurs propriétaires respectifs.

---

<p align="center"><strong>VOYO</strong> · Projet indépendant en développement</p>
