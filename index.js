"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.use("/api", gameRoutes_1.default);
app.use("/api", customerRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});
app.listen(3000, () => {
    console.log("Le serveur est actif sur le port 3000");
});
exports.default = app;
