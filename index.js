"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./passportConfig");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
app.use("/api", gameRoutes_1.default);
app.use("/api", customerRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});
app.listen(5001, () => {
    console.log("Le serveur est actif sur le port 5001");
});
exports.default = app;
