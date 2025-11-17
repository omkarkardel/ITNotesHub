// Upload utility using the File System Access API
// Requires a secure context (localhost). Falls back to instructions if unsupported.

(async function(){
  const API_BASE = 'http://localhost:3000';
  const buildManifestBtn = document.getElementById('buildManifest');
  const filePicker = document.getElementById('filePicker');
  const logEl = document.getElementById('log');
  const subjectSelect = document.getElementById('subjectSelect');
  const sectionsRoot = document.getElementById('sections');

  let pendingSection = null; // which section triggered file selection

  function log(msg, cls){
    const p = document.createElement('div');
    if (cls) p.className = cls;
    p.textContent = msg;
    logEl.appendChild(p);
    logEl.scrollTop = logEl.scrollHeight;
  }

  // enable subject by default
  subjectSelect.disabled = false;

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
    try {
      const resp = await fetch(API_BASE + '/upload', { method: 'POST', body: fd });
      const data = await resp.json();
      if (!resp.ok || !data.ok){
        log(`Upload failed: ${data.error || resp.statusText}`, 'err');
        return false;
      }
      log(`Uploaded ${data.saved} file(s) to ${subject}/${exam}/${label} and rebuilt manifest.`, 'ok');
      buildManifestBtn.disabled = false; // allow manual rebuild too
      return true;
    } catch (e){
      log(`Server error: ${e.message}`, 'err');
      return false;
    }
  }

  // client no longer computes filenames; server handles naming

  async function uploadToSection(sectionEl, files){
    await uploadViaServer(sectionEl, files);
  }

  // manual rebuild trigger
  buildManifestBtn.addEventListener('click', async () => {
    try {
      const resp = await fetch(API_BASE + '/build', { method:'POST' });
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
