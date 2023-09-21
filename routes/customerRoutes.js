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
// Importer le module Express pour créer le routeur et types associés.
const express_1 = __importDefault(require("express"));
// Importer toutes les fonctions exportées du fichier "customerController.ts".
const customerController = __importStar(require("../controllers/customerController"));
// Créer une nouvelle instance du routeur Express et la typer.
const router = express_1.default.Router();
// Définition des routes pour les clients :
// GET /api/customers - Récupérer la liste de tous les clients.
router.get("/customers", customerController.getCustomers);
// GET /api/customers/:id - Récupérer un client spécifique par son ID.
router.get("/customers/:id", customerController.getCustomerById);
// POST /api/customers - Créer un nouveau client.
router.post("/customers", customerController.createCustomer);
// PUT /api/customers/:id - Mettre à jour un client spécifique par son ID.
router.put("/customers/:id", customerController.updateCustomer);
// DELETE /api/customers/:id - Supprimer un client spécifique par son ID.
router.delete("/customers/:id", customerController.deleteCustomer);
// Exporter le routeur pour l'utiliser dans d'autres parties de l'application.
exports.default = router;
