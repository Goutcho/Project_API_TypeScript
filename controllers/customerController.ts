import { MongoClient, Collection, Document } from "mongodb";
import { Request, Response } from "express";

const client = new MongoClient("mongodb://localhost:27017");

async function connect() {
  await client.connect();
}

connect();

const db = client.db("gameStore");

const customersCollection: Collection<Document> = db.collection("customers");

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  const customers = await customersCollection.find({}).toArray();
  res.json(customers);
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const customer = await customersCollection.findOne({ id: Number(id) });
  customer ? res.json(customer) : res.status(404).json({ message: "Customer not found" });
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const newCustomer = req.body;
  await customersCollection.insertOne(newCustomer);
  res.status(201).json(newCustomer);
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id; 
  const updatedCustomer: any = req.body;  

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

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await customersCollection.deleteOne({ id: Number(id) });
  result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Customer not found" });
};
