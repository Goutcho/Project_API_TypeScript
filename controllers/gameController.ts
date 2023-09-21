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
const gamesCollection: Collection<Document> = db.collection("games"); // TypeScript: Typage de la collection

/**
 * Récupère tous les jeux de la collection "games".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const getGames = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const games = await gamesCollection.find({}).toArray();
  res.json(games);
};

/**
 * Récupère un jeu spécifique par son identifiant.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const getGameById = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const { id } = req.params;
  const game = await gamesCollection.findOne({ id: Number(id) });
  game ? res.json(game) : res.status(404).json({ message: "Game not found" });
};

/**
 * Crée un nouveau jeu dans la collection "games".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const createGame = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const newGame = req.body;
  await gamesCollection.insertOne(newGame);
  res.status(201).json(newGame);
};

/**
 * Met à jour un jeu existant dans la collection "games".
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const updateGame = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const id = req.params.id;
  const updatedGame: any = req.body; // TypeScript: Typage explicite comme 'any'

  delete updatedGame._id;

  const filter = { id: Number(id) };
  const update = { $set: updatedGame };

  const result = await gamesCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
    res.json(updatedGame);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
};

/**
 * Supprime un jeu spécifique par son identifiant.
 * @param req - La requête HTTP entrante.
 * @param res - La réponse HTTP sortante.
 * @returns {Promise<void>} - Renvoie une promesse vide.
 */
export const deleteGame = async (req: Request, res: Response): Promise<void> => { // TypeScript: Typage des paramètres et du retour
  const { id } = req.params;
  const result = await gamesCollection.deleteOne({ id: Number(id) });
  result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Game not found" });
};
