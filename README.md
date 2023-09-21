
# API Documentation

## Overview

Ce document décrit les différentes routes disponibles dans notre API pour la gestion des jeux et des clients. Cette API utilise JSON comme format d'échange de données.

---

## Base URL

Toutes les routes sont basées sur l'URL de base suivante :

\`\`\`
http://localhost:5001/api/
\`\`\`

---

## Authentification

[À compléter si applicable]

---

## Routes

### Jeux

#### GET \`/games\`

Récupère tous les jeux.

- **Type de requête**: GET
- **Réponse**: Un tableau de jeux.

#### GET \`/games/:id\`

Récupère un jeu spécifique par son ID.

- **Type de requête**: GET
- **Réponse**: Objet JSON représentant le jeu ou message d'erreur.

#### POST \`/games\`

Crée un nouveau jeu.

- **Type de requête**: POST
- **Corps de la requête**: Objet JSON contenant les informations du jeu.
- **Réponse**: Objet JSON du jeu créé.

#### PUT \`/games/:id\`

Met à jour un jeu existant.

- **Type de requête**: PUT
- **Corps de la requête**: Objet JSON contenant les informations à mettre à jour.
- **Réponse**: Objet JSON du jeu mis à jour ou message d'erreur.

#### DELETE \`/games/:id\`

Supprime un jeu spécifique par son ID.

- **Type de requête**: DELETE
- **Réponse**: Statut HTTP 204 en cas de succès ou message d'erreur.

---

### Clients

#### GET \`/customers\`

Récupère tous les clients.

- **Type de requête**: GET
- **Réponse**: Un tableau de clients.

#### GET \`/customers/:id\`

Récupère un client spécifique par son ID.

- **Type de requête**: GET
- **Réponse**: Objet JSON représentant le client ou message d'erreur.

#### POST \`/customers\`

Crée un nouveau client.

- **Type de requête**: POST
- **Corps de la requête**: Objet JSON contenant les informations du client.
- **Réponse**: Objet JSON du client créé.

#### PUT \`/customers/:id\`

Met à jour un client existant.

- **Type de requête**: PUT
- **Corps de la requête**: Objet JSON contenant les informations à mettre à jour.
- **Réponse**: Objet JSON du client mis à jour ou message d'erreur.

#### DELETE \`/customers/:id\`

Supprime un client spécifique par son ID.

- **Type de requête**: DELETE
- **Réponse**: Statut HTTP 204 en cas de succès ou message d'erreur.

