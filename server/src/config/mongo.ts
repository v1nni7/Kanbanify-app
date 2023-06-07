import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const database = client.db("kanban");
const boardCollection = database.collection("boards");

export { boardCollection };
