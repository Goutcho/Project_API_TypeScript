import express, { Application, Request, Response, NextFunction } from "express";
import { connectDB, getDB } from "./db";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";
import customerRoutes from "./routes/customerRoutes";


const app: Application = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api", gameRoutes);
app.use("/api", customerRoutes);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
  });
  

app.listen(5001, (): void => {
  console.log("Le serveur est actif sur le port 5001");
});

export default app;




