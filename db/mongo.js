const { MongoClient } = require('mongodb');

let client;
let db;

async function getDb() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  const dbName = process.env.MONGODB_DB_NAME || 'ITNotesHub';
  if (!client) {
    client = new MongoClient(uri, { maxPoolSize: 10 });
  }
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  db = client.db(dbName);
  return db;
}

async function getCollection(name){
  const database = await getDb();
  return database.collection(name);
}

module.exports = { getDb, getCollection };
