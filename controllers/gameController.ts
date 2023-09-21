import { MongoClient, Collection, Document } from "mongodb";
import { Request, Response } from "express";

const client = new MongoClient("mongodb://localhost:27017");

async function connect() {
  await client.connect();
}

connect();

const db = client.db("gameStore");

const gamesCollection: Collection<Document> = db.collection("games");

export const getGames = async (req: Request, res: Response): Promise<void> => {
  const games = await gamesCollection.find({}).toArray();
  res.json(games);
};

export const getGameById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const game = await gamesCollection.findOne({ id: Number(id) });
  game ? res.json(game) : res.status(404).json({ message: "Game not found" });
};

export const createGame = async (req: Request, res: Response): Promise<void> => {
  const newGame = req.body;
  await gamesCollection.insertOne(newGame);
  res.status(201).json(newGame);
};

export const updateGame = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const updatedGame: any = req.body;

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


export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await gamesCollection.deleteOne({ id: Number(id) });
  result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Game not found" });
};
