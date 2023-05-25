import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const database = client.db("kanban");
const boards = database.collection("boards");

export { boards };
