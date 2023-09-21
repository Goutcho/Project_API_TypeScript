"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '1048688154306-gn2su8vl7t32k6llvfssqqc1lo1kambg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
