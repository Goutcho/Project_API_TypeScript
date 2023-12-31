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
exports.getDB = exports.closeDB = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
let db;
let client;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        yield client.connect();
        db = client.db("gameStore");
        console.log("Base de données connectée");
    }
    catch (err) {
        console.error("Erreur de connexion à la base de données", err);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
const closeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.close();
});
exports.closeDB = closeDB;
const getDB = () => {
    if (!db) {
        throw new Error("Appeler connectDB avant getDB");
    }
    return db;
};
exports.getDB = getDB;
