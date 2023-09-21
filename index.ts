import express, { Application, Request, Response, NextFunction } from "express";
import { connectDB, getDB } from "./db";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";
import customerRoutes from "./routes/customerRoutes";
import session from 'express-session';
import passport from 'passport';
import './passportConfig';


const app: Application = express();

app.use(express.json());

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

connectDB();

app.use("/api", gameRoutes);
app.use("/api", customerRoutes);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);
  

app.listen(5001, (): void => {
  console.log("Le serveur est actif sur le port 5001");
});

export default app;




