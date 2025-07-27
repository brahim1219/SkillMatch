# SkillMatch



**SkillMatch** est une plateforme web complète pour la création, la passation et l’analyse de tests techniques, conçue pour les recruteurs et les candidats.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Licence](#licence)

---

## Fonctionnalités

### Pour le recruteur

- **Inscription & authentification**
- **Création d’exercices** (Quiz & Coding).
- **Gestion de tests** : assemblage d’exercices, timeLimit automatique.
- **Suivi des résultats** : classement, score, détail des réponses.

### Pour le candidat

- **Inscription & authentification** 
- **Consultation des tests à venir** et inscription en un clic.
- **Passation de tests** : QCM, éditeur de code avec timer et feedback instantané.
- **Historique et scores** : suivi des performances.

---

## Technologies

- **Front‑end** : React, Redux
- **Back‑end** : Node.js, Express.js, MongoDB (Mongoose)
- **Authentification** : JSON Web Tokens (JWT)
- **Tests unitaires** : Jest (pour les exercices de codage)

---

## Installation

> ⚠️ **Le dépôt du back-end est privé.** Seule la partie front-end est disponible publiquement sur ce repository GitHub.

### Prérequis

- Node.js v14 +
- MongoDB (local ou Atlas)

```bash
# Cloner le dépôt
git clone https://github.com/brahim1219/SkillMatch.git
cd skillmatch
```

### Installation des dépendances

```bash
# Back‑end (privé)
cd ./backend
npm install

# Front‑end
cd ./frontend
npm install
```

---

## Configuration

1. Copier le fichier d'exemple d'environnement :
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
2.  les variables env :
   - `JWT_SECRET` : clé secrète pour signer les tokens (Backen).
   - `MONGODB_URI` : chaîne de connexion MongoDB (Backend).
   - `Port`:Port sur lequel ton serveur backend va écoute (Backend)
   - `REACT_APP_API_URL` : URL du serveur API (ex. `http://localhost:3001/`).

---

## Démarrage

### Lancer le back‑end

```bash
cd backend
npm start
```

### Lancer le front‑end

```bash
cd frontend
npm start
```

L’application est accessible sur : [http://localhost:3000](http://localhost:3000)

---

## Structure du projet

```
skillmatch/
├── backend/ (privé)       # API Express +  MongoDB
│   ├── controllers/       # Logique métier
│   ├── models/            # Schémas Mongoose
│   ├── routes/            # Points d’entrée API
│   ├── middleware/        # Auth, erreurs, etc.
│   └── server.js
├── frontend/              # Application React
│   ├── src/
│   │   ├── container/     # Pages principales 
│   │   ├── Router.js  # Configuration des routes
│   │   ├── reducer/         # Redux slices
│   │   ├── action/  # action Redux
│   │   └── index.jsx
│   └── public/
└── README.md
```

---

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

