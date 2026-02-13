# ITNotesHub Website

## Live Demo
[View the live site]
(https://it-notes-hub.netlify.app)

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
### Alternative: Upload via Browser UI
1) Install dependencies:

```powershell
npm install
```

2) Start the upload backend (this serves the site + upload API):

```powershell
npm start
```

3) Open http://localhost:3000/upload.html

4) npm run build:manifest

## File Name Flexibility
- Supports both `Unit1` and `Unit 1` folder names.
- Accepts common file types: pdf, docx, pptx, ppt, xls/xlsx, txt, png/jpg/jpeg, zip.
- For question papers, it matches names like `Insem Que Paper` (or `Insem Question Paper`) and corresponding `... Solution`.
- Multiple files per option are supported. They will appear as grouped lists in the UI.

## Customize UI
- Edit colors and spacing in `styles.css`.
- The list layout uses `.resource-list`, with per-unit groups styled via `.resource-group`.


