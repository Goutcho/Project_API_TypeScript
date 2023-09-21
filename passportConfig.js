"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
connect();
// Initialisation des collections
const db = client.db("gameStore");
const googleUsersCollection = db.collection("google_users");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '1048688154306-gn2su8vl7t32k6llvfssqqc1lo1kambg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield googleUsersCollection.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }
    const newUser = yield googleUsersCollection.insertOne({
        googleId: profile.id,
        displayName: profile.displayName,
        // Ajoutez d'autres champs selon vos besoins
    });
    return done(null, newUser);
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
