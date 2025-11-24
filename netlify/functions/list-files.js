// Netlify function to list all files in GridFS
// Endpoint: /.netlify/functions/list-files

const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'notes';
let cachedClient = null;

async function getFilesCollection() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await cachedClient.connect();
  }
  const db = cachedClient.db(dbName);
  return db.collection('fs.files');
}

exports.handler = async function(event, context) {
  try {
    const filesCol = await getFilesCollection();
    const files = await filesCol.find({}).sort({ uploadDate: -1 }).toArray();
    // Map to frontend-friendly format
    const result = files.map(f => ({
      id: f._id.toString(),
      filename: f.filename,
      length: f.length,
      contentType: f.contentType || 'application/pdf',
      uploadDate: f.uploadDate,
      url: `/.netlify/functions/serve-file?id=${f._id.toString()}`
    }));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};
