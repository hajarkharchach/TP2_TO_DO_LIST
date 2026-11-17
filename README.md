# Application To-Do List - MEAN Stack

## Prérequis
- Node.js
- MongoDB (lancé sur le port 27017)
- Angular CLI

##  Lancer le projet

### 1. Démarrer la base de données
Lancer MongoDB (via le service Windows ou la commande `mongod`).

### 2. Lancer le Backend (Node.js + Express)
cd backend
npm install
npm run dev

Le serveur tourne sur http://localhost:3000

### 3. Lancer le Frontend (angular)
cd frontend
npm install
ng serve 


L'application est accessible sur http://localhost:4200

### Fonctionnalites :
* ajout d'une nouvelle tâche via un formulaire.
* Affichage de la liste des  tâches avec leur statut.
* Mis a jour ( modification de titre / changement de statut / suppression )