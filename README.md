# ITNotesHub Website

## Live Demo
[View the live site]([https://your-live-site-link.netlify.app](https://itnoteshub.netlify.app/))
A simple static website for TE students to browse subject resources. Built with HTML, CSS, and JavaScript (no framework).

## Current Features
- Subject and Exam filters (Insem / Endsem)
- Resource groups per Unit with links for Handwritten Notes and IMP Questions
- Links for Question Papers and Solutions
- Responsive, clean UI

## Quick Start
Just open `index.html` in a modern browser. No build step needed.

## Managing Files (Recommended)
The site auto-loads links from a generated `resources.json` manifest. Place your files in this folder structure:

```
files/
  TOC/
    Insem/
      Insem Que Paper.pdf
      Insem Que Paper Solution.pdf
      Unit1/
        Handwritten Notes.pdf
        IMP Questions.pdf
      Unit2/
        Handwritten Notes.pdf
        IMP Questions.pdf
    Endsem/
      Endsem Que Paper.pdf
      Endsem Que Paper Solution.pdf
      Unit3/ (same two files)
      Unit4/
      Unit5/
      Unit6/
  HCI/ ... (same pattern)
  ML/  ...
  OS/  ...
  ADBMS/ ...
```

Then generate `resources.json` using the provided script:

Windows PowerShell:
```powershell
node tools/build_resources_manifest.js
```

This writes `resources.json` at the project root, which the web app loads on start. If `resources.json` is missing, the app falls back to built-in sample data.

### Alternative: Upload via Browser UI
1) Run a local server (for secure context):

```powershell
npx http-server -p 8080
# or
npx serve . -p 8080
```

2) Open http://localhost:8080/upload.html

3) Click "Choose files/ directory" and select the project root (it will create/use the `files/` folder inside).

4) Select many files. The tool will infer `Subject` (TOC/HCI/ML/OS/ADBMS), `Exam` (Insem/Endsem), `Unit` (1..6), and `Type` (Que Paper, Solution, Handwritten, IMP Questions) from filenames, then write them into the correct subfolders.

5) Click "Rebuild manifest" and run the command it shows:

```powershell
node tools/build_resources_manifest.js
```

## File Name Flexibility
- Supports both `Unit1` and `Unit 1` folder names.
- Accepts common file types: pdf, docx, pptx, ppt, xls/xlsx, txt, png/jpg/jpeg, zip.
- For question papers, it matches names like `Insem Que Paper` (or `Insem Question Paper`) and corresponding `... Solution`.
- Multiple files per option are supported. They will appear as grouped lists in the UI.

## Customize UI
- Edit colors and spacing in `styles.css`.
- The list layout uses `.resource-list`, with per-unit groups styled via `.resource-group`.

## Notes
- Links are relative to the project folder. Ensure `index.html` and `files/` are together.
- If serving over a simple HTTP server, relative links will work the same.

## MongoDB Atlas (Optional)
- Purpose: store metadata for uploaded files (subject, exam, unit/label, type, path, size, mimetype, timestamp). Existing filesystem storage stays the same.

### Local server + Atlas
1) Create a MongoDB Atlas cluster and a database user, then copy the connection string.
2) Create your `.env` from the example and set `MONGODB_URI` (and optional `MONGODB_DB_NAME`):

```powershell
Copy-Item .env.example .env
# Edit .env to set MONGODB_URI
```

3) Install deps and run the local upload server:
```powershell
npm install
$env:PORT=3000; node server.js
```

4) Upload using `upload.html`. Each upload still writes files to `files/` locally and also writes a metadata record in MongoDB. Delete operations remove the metadata too.

Notes:
- If `MONGODB_URI` is not set or Atlas is unreachable, uploads still work to the filesystem; DB writes are skipped with a warning.
- Database name defaults to `ITNotesHub`; override with `MONGODB_DB_NAME`.

### Check MongoDB Connection
You can verify the MongoDB connection in two ways:

**Option 1: Standalone test script**
```powershell
node tools/check-mongo.js
```
This will test the connection and display success or error messages.

**Option 2: Status endpoint (when server is running)**
```powershell
# Start the server first
$env:PORT=3000; node server.js

# In a browser or another terminal
curl http://localhost:3000/status
# or visit http://localhost:3000/status in your browser
```
This returns a JSON status with `mongodb: "connected"` or `"disconnected"` and the database name.

### Serverless metadata (Netlify Functions)
- Optional: also store metadata via Netlify Functions when deployed.
- A function `/.netlify/functions/save-meta` inserts metadata documents into MongoDB Atlas.
- The client attempts to call this after a successful local upload; failures are ignored.

Deployment tips:
- Set `MONGODB_URI` and (optionally) `MONGODB_DB_NAME` in your Netlify site environment variables.
- Files themselves are served statically from the repo (`/files/**`); the function only writes metadata.

## License
Personal / classroom educational use.
