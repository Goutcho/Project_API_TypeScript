"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importe le module Express pour créer le routeur.
const express_1 = __importDefault(require("express"));
// Importe toutes les fonctions exportées du fichier "gameController.ts".
// Assurez-vous que le chemin vers le fichier est correct.
const gameController = __importStar(require("../controllers/gameController"));
// Crée une nouvelle instance du routeur Express.
const router = express_1.default.Router();
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
exports.default = router;
