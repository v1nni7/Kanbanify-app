import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI)
const database = client.db('kanban')
const boardCollection = database.collection('boards')

export { boardCollection }
