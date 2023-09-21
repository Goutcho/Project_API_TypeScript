// Importation des modules nécessaires
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport'; // TypeScript: Typage pour les profils Passport
import { MongoClient, Collection, Document } from "mongodb"; // TypeScript: Typage pour MongoDB

// Définition d'un type personnalisé pour le profil
type CustomProfile = Profile & { someExtraField?: string }; // TypeScript: Extension du type Profile

// Initialisation de la connexion MongoDB
const client = new MongoClient("mongodb://localhost:27017");
async function connect() {
  await client.connect();
}
connect();

// Initialisation des collections MongoDB
const db = client.db("gameStore");
const googleUsersCollection: Collection<Document> = db.collection("google_users"); // TypeScript: Typage de la collection

// Configuration de la stratégie Google OAuth pour Passport
passport.use(new GoogleStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    callbackURL: 'http://localhost:5001/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // Recherche d'un utilisateur existant dans la base de données
    const existingUser = await googleUsersCollection.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }

    // Création d'un nouvel utilisateur dans la base de données
    const newUser = await googleUsersCollection.insertOne({
        googleId: profile.id,
        displayName: profile.displayName,
        // Ajoutez d'autres champs selon vos besoins
    });

    return done(null, newUser);
}));

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
    done(null, user as any); // TypeScript: Conversion explicite de 'user' en 'any'
});

// Désérialisation de l'utilisateur pour la session
passport.deserializeUser((obj, done) => {
    done(null, obj as any); // TypeScript: Conversion explicite de 'obj' en 'any'
});

