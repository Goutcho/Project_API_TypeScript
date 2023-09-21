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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.getGameById = exports.getGames = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
connect();
const db = client.db("gameStore");
const gamesCollection = db.collection("games");
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield gamesCollection.find({}).toArray();
    res.json(games);
});
exports.getGames = getGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const game = yield gamesCollection.findOne({ id: Number(id) });
    game ? res.json(game) : res.status(404).json({ message: "Game not found" });
});
exports.getGameById = getGameById;
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newGame = req.body;
    yield gamesCollection.insertOne(newGame);
    res.status(201).json(newGame);
});
exports.createGame = createGame;
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedGame = req.body;
    const result = yield gamesCollection.updateOne({ id: Number(id) }, { $set: updatedGame });
    result.matchedCount > 0 ? res.json(updatedGame) : res.status(404).json({ message: "Game not found" });
});
exports.updateGame = updateGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield gamesCollection.deleteOne({ id: Number(id) });
    result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Game not found" });
});
exports.deleteGame = deleteGame;
