// Upload utility using the File System Access API
// Requires a secure context (localhost). Falls back to instructions if unsupported.

const defaultYears = [
  {
    name: 'F.E',
    semesters: [
      {
        name: 'Sem 1',
        subjects: [
          { name: 'Engineering Math1', resources: { Insem: [], Endsem: [] } },
          { name: 'PPS', resources: { Insem: [], Endsem: [] } },
          { name: 'Engg Physics', resources: { Insem: [], Endsem: [] } },
          { name: 'BEE', resources: { Insem: [], Endsem: [] } },
          { name: 'SME', resources: { Insem: [], Endsem: [] } }
        ]
      },
      {
        name: 'Sem 2',
        subjects: [
          { name: 'Enggn Math2', resources: { Insem: [], Endsem: [] } },
          { name: 'Enggn Chemistry', resources: { Insem: [], Endsem: [] } },
          { name: 'Enggn Mechanics', resources: { Insem: [], Endsem: [] } },
          { name: 'Enggn Graphics', resources: { Insem: [], Endsem: [] } },
          { name: 'BXE', resources: { Insem: [], Endsem: [] } }
        ]
      }
    ]
  },
  {
    name: 'S.E',
    semesters: [
      {
        name: 'Sem 3',
        subjects: [
          { name: 'DSA', resources: { Insem: [], Endsem: [] } },
          { name: 'OOP', resources: { Insem: [], Endsem: [] } },
          { name: 'BCN', resources: { Insem: [], Endsem: [] } },
          { name: 'DM', resources: { Insem: [], Endsem: [] } },
          { name: 'LDCO', resources: { Insem: [], Endsem: [] } }
        ]
      },
      {
        name: 'Sem 4',
        subjects: [
          { name: 'Enggn Math3', resources: { Insem: [], Endsem: [] } },
          { name: 'DBMS', resources: { Insem: [], Endsem: [] } },
          { name: 'CG', resources: { Insem: [], Endsem: [] } },
          { name: 'PA', resources: { Insem: [], Endsem: [] } },
          { name: 'SE', resources: { Insem: [], Endsem: [] } }
        ]
      }
    ]
  },
  {
    name: 'T.E',
    semesters: [
      {
        name: 'Sem 5',
        subjects: [
          { name: 'TOC', resources: { Insem: [], Endsem: [] } },
          { name: 'HCI', resources: { Insem: [], Endsem: [] } },
          { name: 'ML', resources: { Insem: [], Endsem: [] } },
          { name: 'ADBMS', resources: { Insem: [], Endsem: [] } },
          { name: 'OS', resources: { Insem: [], Endsem: [] } }
        ]
      },
      {
        name: 'Sem 6',
        subjects: [
          { name: 'WAD', resources: { Insem: [], Endsem: [] } },
          { name: 'CyberSecurity', resources: { Insem: [], Endsem: [] } },
          { name: 'CNS', resources: { Insem: [], Endsem: [] } },
          { name: 'DSBDA', resources: { Insem: [], Endsem: [] } },
          { name: 'Internship', resources: { Insem: [], Endsem: [] } }
        ]
      }
    ]
  },
  {
    name: 'B.E',
    semesters: [
      {
        name: 'Sem 7',
        subjects: [
          { name: 'ISR', resources: { Insem: [], Endsem: [] } },
          { name: 'SPM', resources: { Insem: [], Endsem: [] } },
          { name: 'Deep Learning', resources: { Insem: [], Endsem: [] } },
          { name: 'Elective-3', resources: { Insem: [], Endsem: [] } },
          { name: 'Elective-4', resources: { Insem: [], Endsem: [] } }
        ]
      },
      {
        name: 'Sem 8',
        subjects: [
          { name: 'DS', resources: { Insem: [], Endsem: [] } },
          { name: 'Elective-5', resources: { Insem: [], Endsem: [] } },
          { name: 'Elective-6', resources: { Insem: [], Endsem: [] } }
        ]
      }
    ]
  }
];

(async function(){
  const API_BASES = ['/.netlify/functions', 'http://localhost:3000'];
  const buildManifestBtn = document.getElementById('buildManifest');
  const filePicker = document.getElementById('filePicker');
  const logEl = document.getElementById('log');
  const yearSelect = document.getElementById('yearSelect');
  const semesterSelect = document.getElementById('semesterSelect');
  const subjectSelect = document.getElementById('subjectSelect');
  const sectionsRoot = document.getElementById('sections');

let years = [];
let semesters = [];
let subjects = [];
let pendingSection = null; // which section triggered file selection

function log(msg, cls){
  const p = document.createElement('div');
  if (cls) p.className = cls;
  p.textContent = msg;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

// Load years from resources.json
async function loadYears() {
  try {
    const resp = await fetch('resources.json?t=' + Date.now(), { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      years = Array.isArray(data.years) ? data.years : defaultYears;
      fillYears();
    } else {
      log('Failed to load resources.json, using defaults', 'warn');
      years = defaultYears;
      fillYears();
    }
  } catch (e) {
    log('Error loading resources: ' + e.message + ', using defaults', 'warn');
    years = defaultYears;
    fillYears();
  }
}

  function fillYears() {
    while (yearSelect.options.length > 1) yearSelect.remove(1);
    years.forEach(yr => {
      const opt = document.createElement('option');
      opt.value = yr.name;
      opt.textContent = yr.name;
      yearSelect.appendChild(opt);
    });
  }

  function fillSemesters() {
    while (semesterSelect.options.length > 1) semesterSelect.remove(1);
    semesters.forEach(sem => {
      const opt = document.createElement('option');
      opt.value = sem.name;
      opt.textContent = sem.name;
      semesterSelect.appendChild(opt);
    });
  }

  function fillSubjects() {
    while (subjectSelect.options.length > 1) subjectSelect.remove(1);
    subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub.name;
      opt.textContent = sub.name;
      subjectSelect.appendChild(opt);
    });
  }

  // Event listeners for selects
  yearSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;
    if (selectedYear === '') {
      semesters = [];
      subjects = [];
      semesterSelect.disabled = true;
      subjectSelect.disabled = true;
    } else {
      const year = years.find(y => y.name === selectedYear);
      semesters = year ? year.semesters : [];
      fillSemesters();
      semesterSelect.disabled = false;
      subjects = [];
      subjectSelect.disabled = true;
    }
  });

  semesterSelect.addEventListener('change', () => {
    const selectedSemester = semesterSelect.value;
    if (selectedSemester === '') {
      subjects = [];
      subjectSelect.disabled = true;
      document.getElementById('sections').style.display = 'none';
    } else {
      const semester = semesters.find(s => s.name === selectedSemester);
      subjects = semester ? semester.subjects : [];
      fillSubjects();
      subjectSelect.disabled = false;
      document.getElementById('sections').style.display = 'none'; // Hide until subject selected
    }
  });

  subjectSelect.addEventListener('change', () => {
    const selectedSubject = subjectSelect.value;
    if (selectedSubject === '') {
      document.getElementById('sections').style.display = 'none';
    } else {
      document.getElementById('sections').style.display = 'grid';
    }
  });

  // Load years on init
  loadYears();

  function getExamForSection(sectionEl){
    const col = sectionEl.closest('.column');
    return col ? col.getAttribute('data-exam') : null;
  }

  function getTypeForSection(sectionEl){
    const needType = sectionEl.getAttribute('data-need-type') === 'true';
    if (!needType) return null;
    const sel = sectionEl.querySelector('select.type');
    return sel ? sel.value : null;
  }

  async function uploadViaServer(sectionEl, files){
    const subject = subjectSelect.value;
    const exam = getExamForSection(sectionEl);
    const label = sectionEl.getAttribute('data-section');
    if (!subject){ log('Select subject first.', 'warn'); return false; }
    if (!exam || !label){ log('Missing target info.', 'err'); return false; }
    const fd = new FormData();
    fd.append('subject', subject);
    fd.append('exam', exam);
    fd.append('label', label);
    const type = getTypeForSection(sectionEl);
    if (type) fd.append('type', type);
    for (const f of files) fd.append('files', f, f.name);
    for (const base of API_BASES){
      try {
        const url = base.endsWith('/upload') ? base : base + '/upload';
        const resp = await fetch(url, { method: 'POST', body: fd });
        const data = await resp.json().catch(() => ({}));
        if (resp.ok && data && data.ok){
          const msgTail = base.startsWith('/.') ? 'Netlify function' : 'local server';
          log(`Uploaded ${data.saved} file(s) to ${subject}/${exam}/${label} via ${msgTail}.`, 'ok');
          // Note: No database used; metadata stored in files only
          return true;
        }
      } catch (e){ /* try next base */ }
    }
    log('Upload failed: no backend reachable (Netlify function or local server).', 'err');
    return false;
  }

  // client no longer computes filenames; server handles naming

  async function uploadToSection(sectionEl, files){
    await uploadViaServer(sectionEl, files);
  }

  // manual rebuild trigger
  buildManifestBtn.addEventListener('click', async () => {
    try {
      const resp = await fetch('http://localhost:3000/build', { method:'POST' });
      const data = await resp.json();
      if (!resp.ok || !data.ok) return log('Manifest rebuild failed.', 'err');
      log('Manifest rebuilt.', 'ok');
    } catch (e){
      log(`Server error: ${e.message}`, 'err');
    }
  });

  // Browse button per section
  sectionsRoot.addEventListener('click', (e) => {
    const btn = e.target.closest('button.browse');
    if (!btn) return;
    const section = btn.closest('.section');
    pendingSection = section;
    filePicker.click();
  });

  // Drag & drop to section dropzones
  sectionsRoot.addEventListener('dragover', (e) => {
    const dz = e.target.closest('.dropzone');
    if (!dz) return;
    e.preventDefault();
    dz.classList.add('drag');
  });
  sectionsRoot.addEventListener('dragleave', (e) => {
    const dz = e.target.closest('.dropzone');
    if (dz) dz.classList.remove('drag');
  });
  sectionsRoot.addEventListener('drop', async (e) => {
    const dz = e.target.closest('.dropzone');
    if (!dz) return;
    e.preventDefault();
    dz.classList.remove('drag');
    const section = dz.closest('.section');
    const files = [...(e.dataTransfer?.files || [])];
    if (files.length) await uploadToSection(section, files);
  });

  // Hidden input fallback
  filePicker.addEventListener('change', () => {
    const files = Array.from(filePicker.files);
    if (!pendingSection){ log('No section selected.', 'warn'); return; }
    if (files.length) uploadToSection(pendingSection, files);
  });

  // ZIP flow removed; uploads go directly to server

})();
