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
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getCustomers = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
connect();
const db = client.db("gameStore");
const customersCollection = db.collection("customers");
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customersCollection.find({}).toArray();
    res.json(customers);
});
exports.getCustomers = getCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield customersCollection.findOne({ id: Number(id) });
    customer ? res.json(customer) : res.status(404).json({ message: "Customer not found" });
});
exports.getCustomerById = getCustomerById;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCustomer = req.body;
    yield customersCollection.insertOne(newCustomer);
    res.status(201).json(newCustomer);
});
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedCustomer = req.body;
    delete updatedCustomer._id;
    const filter = { id: Number(id) };
    const update = { $set: updatedCustomer };
    const result = yield customersCollection.updateOne(filter, update);
    if (result.matchedCount > 0) {
        res.json(updatedCustomer);
    }
    else {
        res.status(404).json({ message: "Customer not found" });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customersCollection.deleteOne({ id: Number(id) });
    result.deletedCount > 0 ? res.status(204).send() : res.status(404).json({ message: "Customer not found" });
});
exports.deleteCustomer = deleteCustomer;
