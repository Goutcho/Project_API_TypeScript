import express, { Application, Request, Response, NextFunction } from "express";
import { connectDB, getDB } from "./db";
import gameRoutes from "./routes/gameRoutes";
import customerRoutes from "./routes/customerRoutes";


const app: Application = express();

app.use(express.json());

connectDB();

app.use("/api", gameRoutes);
app.use("/api", customerRoutes);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
  });
  

app.listen(3000, (): void => {
  console.log("Le serveur est actif sur le port 3000");
});

export default app;




