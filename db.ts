import { MongoClient, Db } from "mongodb";

let db: Db;

let client: MongoClient;

export const connectDB = async (): Promise<void> => {
  try {
    const client = new MongoClient("mongodb://localhost:27017");

    await client.connect();

    db = client.db("gameStore");

    console.log("Base de données connectée");
  } catch (err) {
    console.error("Erreur de connexion à la base de données", err);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
    await client.close();
  };

export const getDB = (): Db => {
  if (!db) {
    throw new Error("Appeler connectDB avant getDB");
  }
  return db;
};

  
