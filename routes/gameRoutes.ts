// Importe le module Express pour créer le routeur.
import express, { Router } from "express";

// Importe toutes les fonctions exportées du fichier "gameController.ts".
// Assurez-vous que le chemin vers le fichier est correct.
import * as gameController from "../controllers/gameController";

// Crée une nouvelle instance du routeur Express.
const router: Router = express.Router();

// Définition des routes pour les jeux :

// GET /api/games - Récupère la liste de tous les jeux.
router.get("/games", gameController.getGames);

// GET /api/games/:id - Récupère un jeu spécifique par son ID.
router.get("/games/:id", gameController.getGameById);

// POST /api/games - Crée un nouveau jeu.
router.post("/games", gameController.createGame);

// PUT /api/games/:id - Met à jour un jeu spécifique par son ID.
router.put("/games/:id", gameController.updateGame);

// DELETE /api/games/:id - Supprime un jeu spécifique par son ID.
router.delete("/games/:id", gameController.deleteGame);

// Exporte le routeur pour l'utiliser dans d'autres parties de l'application.
export default router;
