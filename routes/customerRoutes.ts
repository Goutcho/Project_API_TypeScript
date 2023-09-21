// Importer le module Express pour créer le routeur et types associés.
import express, { Router } from "express";

// Importer toutes les fonctions exportées du fichier "customerController.ts".
import * as customerController from "../controllers/customerController";

// Créer une nouvelle instance du routeur Express et la typer.
const router: Router = express.Router();

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
export default router;
