// Importation des modules nécessaires
import { MongoClient, Db } from "mongodb"; // TypeScript: Typage pour MongoDB

// Déclaration des variables pour la base de données et le client MongoDB
let db: Db; // TypeScript: Typage de la base de données
let client: MongoClient; // TypeScript: Typage du client MongoDB

/**
 * Fonction pour établir la connexion à la base de données MongoDB.
 * @returns {Promise<void>} Renvoie une promesse vide une fois la connexion établie.
 */
export const connectDB = async (): Promise<void> => { // TypeScript: Typage du retour de la fonction
  try {
    // Initialisation du client MongoDB
    client = new MongoClient("mongodb://localhost:27017");

    // Connexion au serveur MongoDB
    await client.connect();

    // Connexion à la base de données spécifique
    db = client.db("gameStore");

    // Confirmation de la connexion
    console.log("Base de données connectée");
  } catch (err) {
    // Gestion des erreurs
    console.error("Erreur de connexion à la base de données", err);
    process.exit(1);
  }
};

/**
 * Fonction pour fermer la connexion à la base de données MongoDB.
 * @returns {Promise<void>} Renvoie une promesse vide une fois la connexion fermée.
 */
export const closeDB = async (): Promise<void> => { // TypeScript: Typage du retour de la fonction
  await client.close();
};

/**
 * Fonction pour récupérer l'instance de la base de données.
 * @returns {Db} L'instance de la base de données.
 * @throws {Error} Si la base de données n'est pas encore connectée.
 */
export const getDB = (): Db => { // TypeScript: Typage du retour de la fonction
  if (!db) {
    throw new Error("Appeler connectDB avant getDB");
  }
  return db;
};
