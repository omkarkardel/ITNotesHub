// Migration script: upload all files from ./files to MongoDB GridFS
// Usage: node tools/migrate_files_to_gridfs.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket } = require('mongodb');

const ROOT = process.cwd();
const FILES_DIR = path.join(ROOT, 'files');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'ITNotesHub';

if (!uri) throw new Error('MONGODB_URI not set in .env');

async function* walk(dir) {
  for (const entry of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function migrate() {
  const client = new MongoClient(uri, { maxPoolSize: 10 });
  await client.connect();
  const db = client.db(dbName);
  const bucket = new GridFSBucket(db, { bucketName: 'files' });
  const metaCol = db.collection('files_meta');

  let count = 0;
  for await (const filePath of walk(FILES_DIR)) {
    const relPath = path.relative(FILES_DIR, filePath).split(path.sep).join('/');
    const stat = await fs.promises.stat(filePath);
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(relPath, {
      metadata: {
        originalPath: relPath,
        size: stat.size,
        uploadedAt: new Date(),
        mimetype: require('mime-types').lookup(filePath) || 'application/octet-stream'
      }
    });
    await new Promise((resolve, reject) => {
      readStream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });
    // Store metadata in files_meta collection
    await metaCol.insertOne({
      filename: relPath,
      size: stat.size,
      mimetype: require('mime-types').lookup(filePath) || 'application/octet-stream',
      uploadedAt: new Date(),
      gridfs_id: uploadStream.id
    });
    count++;
    console.log(`Uploaded: ${relPath}`);
  }
  await client.close();
  console.log(`Migration complete. Uploaded ${count} files to GridFS.`);
}

migrate().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
