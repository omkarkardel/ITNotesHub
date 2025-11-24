// Netlify function to stream files from MongoDB GridFS
// Endpoint: /.netlify/functions/serve-file?id=<file_id>

const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'notes';
let cachedClient = null;

async function getBucket() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await cachedClient.connect();
  }
  const db = cachedClient.db(dbName);
  return new GridFSBucket(db);
}

exports.handler = async function(event, context) {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;
    if (!id) {
      return {
        statusCode: 400,
        body: 'Missing file id',
      };
    }
    const bucket = await getBucket();
    const _id = new ObjectId(id);
    const files = await bucket.find({ _id }).toArray();
    if (!files.length) {
      return {
        statusCode: 404,
        body: 'File not found',
      };
    }
    const file = files[0];
    const stream = bucket.openDownloadStream(_id);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': file.contentType || 'application/pdf',
        'Content-Disposition': `inline; filename="${file.filename}"`,
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};
