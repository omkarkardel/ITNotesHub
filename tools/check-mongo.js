// Standalone script to check MongoDB connection
// Usage: node tools/check-mongo.js

require('dotenv').config();
const { getDb } = require('../db/mongo');

async function checkConnection() {
  console.log('Attempting to connect to MongoDB Atlas...');
  try {
    const db = await getDb();
    // The isConnected() method was deprecated in v4.
    // A successful connection is implied if getDb() doesn't throw.
    // We can also run a ping command to be certain.
    await db.admin().ping();
    console.log('✅ MongoDB connection successful.');
    console.log(`✅ Successfully connected to database: ${db.databaseName}`);
  } catch (e) {
    console.error('❌ MongoDB connection failed:');
    console.error(`   - ${e.message}`);
    console.error('   - Please check your MONGODB_URI in the .env file.');
    console.error('   - Ensure your IP is whitelisted in MongoDB Atlas.');
    process.exit(1);
  }
  // The client from mongo.js keeps the process alive, so we exit manually.
  process.exit(0);
}

checkConnection();
