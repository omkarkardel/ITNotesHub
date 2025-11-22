// Netlify Function: save-meta
// Inserts file metadata documents into MongoDB Atlas.

const { MongoClient } = require('mongodb');

let cachedClient;
let cachedDb;

async function getDb(){
  if (cachedDb) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  const dbName = process.env.MONGODB_DB_NAME || 'ITNotesHub';
  if (!cachedClient) cachedClient = new MongoClient(uri, { maxPoolSize: 5 });
  if (!cachedClient.topology?.isConnected()) await cachedClient.connect();
  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST'){
    return { statusCode: 405, body: JSON.stringify({ ok:false, error:'Method not allowed' }) };
  }
  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    if (!contentType.includes('application/json')){
      return { statusCode: 400, body: JSON.stringify({ ok:false, error:'Expected application/json' }) };
    }
    const body = JSON.parse(event.body || '{}');
    const docs = Array.isArray(body.files) ? body.files : (body.file ? [body.file] : []);
    if (!docs.length){
      return { statusCode: 400, body: JSON.stringify({ ok:false, error:'Missing files array' }) };
    }
    // Normalize fields and timestamps
    const now = new Date();
    const normalized = docs.map(d => ({
      subject: d.subject,
      exam: d.exam,
      label: d.label,
      type: d.type || null,
      filename: d.filename,
      path: (d.path || '').replace(/\\/g, '/'),
      size: d.size ?? null,
      mimetype: d.mimetype ?? null,
      uploadedAt: d.uploadedAt ? new Date(d.uploadedAt) : now
    }));

    const db = await getDb();
    const col = db.collection('files');
    const result = await col.insertMany(normalized, { ordered: false });

    return { statusCode: 200, body: JSON.stringify({ ok:true, inserted: result.insertedCount || normalized.length }) };
  } catch (e){
    return { statusCode: 500, body: JSON.stringify({ ok:false, error: e.message }) };
  }
};
