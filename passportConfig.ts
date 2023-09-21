import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport';

type CustomProfile = Profile & { someExtraField?: string };

passport.use(new GoogleStrategy({
    clientID: '1048688154306-gn2su8vl7t32k6llvfssqqc1lo1kambg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user as any);
});

passport.deserializeUser((obj, done) => {
    done(null, obj as any);
});

