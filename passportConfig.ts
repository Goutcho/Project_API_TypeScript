import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport';
import { MongoClient, Collection, Document } from "mongodb";

type CustomProfile = Profile & { someExtraField?: string };

const client = new MongoClient("mongodb://localhost:27017");
async function connect() {
  await client.connect();
}
connect();

// Initialisation des collections
const db = client.db("gameStore");
const googleUsersCollection: Collection<Document> = db.collection("google_users");


passport.use(new GoogleStrategy({
    clientID: '1048688154306-gn2su8vl7t32k6llvfssqqc1lo1kambg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5001/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await googleUsersCollection.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }

    const newUser = await googleUsersCollection.insertOne({
        googleId: profile.id,
        displayName: profile.displayName,
        // Ajoutez d'autres champs selon vos besoins
    });

    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user as any);
});

passport.deserializeUser((obj, done) => {
    done(null, obj as any);
});

passport.serializeUser((user, done) => {
    done(null, user as any);
});

passport.deserializeUser((obj, done) => {
    done(null, obj as any);
});

