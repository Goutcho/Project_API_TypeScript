// Importation des modules nécessaires
import { MongoClient, Collection, Document } from "mongodb"; // TypeScript: Typage pour MongoDB
import { Request, Response } from "express"; // TypeScript: Typage pour les objets Express

// Initialisation de la connexion MongoDB
const client = new MongoClient("mongodb://localhost:27017");
async function connect() {
  await client.connect();
}
connect();

// Initialisation de la base de données et de la collection
const db = client.db("gameStore");
const customersCollection: Collection<Document> = db.collection("customers"); // TypeScript: Typage de la collection

/**
 * Récupère tous les clients de la collection "customers".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const getCustomers = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const customers = await customersCollection.find({}).toArray();
  res.json(customers);
};

/**
 * Récupère un client spécifique par son identifiant.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const getCustomerById = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const { id } = req.params;
  const customer = await customersCollection.findOne({ id: Number(id) });
  customer ? res.json(customer) : res.status(404).json({ message: "Customer not found" });
};

/**
 * Crée un nouveau client dans la collection "customers".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const createCustomer = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const newCustomer = req.body;
  await customersCollection.insertOne(newCustomer);
  res.status(201).json(newCustomer);
};

/**
 * Met à jour un client existant dans la collection "customers".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const updateCustomer = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const id = req.params.id;
  const updatedCustomer: any = req.body; // TypeScript: Typage explicite comme 'any'

  delete updatedCustomer._id;

  const filter = { id: Number(id) };
  const update = { $set: updatedCustomer };

  const result = await customersCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
};

/**
 * Supprime un client spécifique par son identifiant.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const { id } = req.params;
  const result = await customersCollection.deleteOne({ id: Number(id) });
  result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Customer not found" });
};
