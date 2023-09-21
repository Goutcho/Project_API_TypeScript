// Importation des modules nécessaires
import express, { Application, Request, Response, NextFunction } from "express"; // TypeScript : Typage des objets express
import { connectDB, getDB } from "./db"; // Importation des fonctions de base de données
import cors from "cors"; // Middleware pour gérer les CORS
import gameRoutes from "./routes/gameRoutes"; // Routes pour les jeux
import customerRoutes from "./routes/customerRoutes"; // Routes pour les clients
import session from 'express-session'; // Middleware pour gérer les sessions
import passport from 'passport'; // Authentification
import './passportConfig'; // Configuration de Passport

// Création de l'application Express
const app: Application = express(); // TypeScript : Déclaration du type de 'app' comme 'Application'

// Utilisation du middleware pour analyser le JSON
app.use(express.json());

// Configuration des sessions
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration de CORSs
app.use(cors());

// Connexion à la base de données
connectDB();

// Configuration des routes de l'API
app.use("/api", gameRoutes);
app.use("/api", customerRoutes);

// Route principale
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Authentification Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

// Callback pour l'authentification Google
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Démarrage du serveur
app.listen(5001, (): void => { // TypeScript : Déclaration du type de retour comme 'void'
  console.log("Le serveur est actif sur le port 5001");
});

// Exportation de l'application
export default app;
