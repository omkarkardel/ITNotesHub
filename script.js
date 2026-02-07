// Keyboard shortcuts handler - robust
(() => {
  const redirectToUpload = () => {
    const target = 'upload.html';
    console.log('[Shortcut] Attempt redirect to', target);
    try {
      window.location.href = target;
      // Fallback retry after 300ms if pathname didn't change
      setTimeout(() => {
        if (!/upload\.html$/i.test(window.location.pathname)) {
          console.log('[Shortcut] Primary redirect not visible, forcing navigation.');
          window.open(target, '_self');
        }
      }, 300);
    } catch (err) {
      console.warn('[Shortcut] Redirect error:', err);
      alert('Unable to open upload page automatically. Please click the Upload button.');
    }
  };

  const isEnter = (e) => (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter');

  // Unified keydown handler (capture phase to beat other listeners)
  document.addEventListener('keydown', (e) => {
    // Debug log (only first few presses to avoid spam)
    if (!window.__keyLogCount) window.__keyLogCount = 0;
    if (window.__keyLogCount < 5) {
      console.log('[Key]', e.key, 'Shift:', e.shiftKey, 'Ctrl:', e.ctrlKey, 'Alt:', e.altKey, 'Code:', e.code);
      window.__keyLogCount++;
    }

    // Shift+Enter -> upload page
    if (isEnter(e) && e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      console.log('✓ Shift+Enter detected (keydown).');
      redirectToUpload();
      return;
    }
    // Admin delete mode toggle: Ctrl+Shift+D
    if (e.key.toLowerCase() === 'd' && e.shiftKey && e.ctrlKey) {
      e.preventDefault();
      document.body.classList.toggle('admin-delete');
      console.log('[Admin] Delete mode:', document.body.classList.contains('admin-delete'));
      return;
    }
    // Escape closes preview modal
    if (e.key === 'Escape' && window.closePreview) {
      e.preventDefault();
      window.closePreview();
      return;
    }
  });

  // Keyup fallback (some environments suppress keydown default); capture true
  document.addEventListener('keyup', (e) => {
    if (isEnter(e) && e.shiftKey && !e.ctrlKey && !e.altKey) {
      console.log('✓ Shift+Enter detected (keyup fallback).');
      redirectToUpload();
    }
  }, true);
  
  // Extra safety: attach capture listener on window as well
  window.addEventListener('keydown', (e) => {
    if (isEnter(e) && e.shiftKey && !e.ctrlKey && !e.altKey) {
      console.log('✓ Shift+Enter detected (window capture).');
      e.preventDefault();
      redirectToUpload();
    }
  }, true);
})();

// Data: structured by year and subject (fallback if no manifest is present)
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

// Will be populated from resources.json if present; otherwise uses defaultYears
let years = [];
let semesters = []; // Current semesters based on selected year
let subjects = []; // Current subjects based on selected semester

const yearFilter = document.getElementById('yearFilter');
const semesterFilter = document.getElementById('semesterFilter');
const subjectFilter = document.getElementById('subjectFilter');
const examFilter = document.getElementById('examFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const notesContainer = document.getElementById('notesContainer');
const yearSpan = document.getElementById('year');
const breadcrumbs = document.getElementById('breadcrumbs');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
// Modal elements
const modalOverlay = document.getElementById('modalOverlay');
const previewModal = document.getElementById('previewModal');
const modalTitle = document.getElementById('modalTitle');
const previewInner = document.getElementById('previewInner');
const modalDownload = document.getElementById('modalDownload');
const modalClose = document.getElementById('modalClose');

yearSpan.textContent = new Date().getFullYear();

// View count storage (localStorage for demo)
const getViewCount = (key) => parseInt(localStorage.getItem(`view_${key}`) || 0);
const incrementView = (key) => { const count = getViewCount(key) + 1; localStorage.setItem(`view_${key}`, count); return count; };


// Mobile drawer functionality
if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  const closeMenu = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  closeDrawer.addEventListener('click', closeMenu);
  drawerOverlay.addEventListener('click', closeMenu);
}

// Populate year filter dynamically
function fillYears() {
  // Remove existing options except the first 'All'
  while (yearFilter.options.length > 1) {
    yearFilter.remove(1);
  }
  years.forEach(yr => {
    const opt = document.createElement('option');
    opt.value = yr.name;
    opt.textContent = yr.name;
    yearFilter.appendChild(opt);
  });
}

// Populate semester filter dynamically
function fillSemesters() {
  // Remove existing options except the first 'All'
  while (semesterFilter.options.length > 1) {
    semesterFilter.remove(1);
  }
  semesters.forEach(sem => {
    const opt = document.createElement('option');
    opt.value = sem.name;
    opt.textContent = sem.name;
    semesterFilter.appendChild(opt);
  });
}

// Populate subject filter dynamically
function fillSubjects() {
  // Remove existing options except the first 'All'
  while (subjectFilter.options.length > 1) {
    subjectFilter.remove(1);
  }
  subjects.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub.name;
    opt.textContent = sub.name;
    subjectFilter.appendChild(opt);
  });
}

function render(resources) {
  // Show loading skeleton
  notesContainer.innerHTML = '<div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div><div class="skeleton skeleton-card"></div>';
  
  setTimeout(() => {
    notesContainer.innerHTML = '';
    if (!resources || resources.length === 0) {
      // No placeholder content when nothing is selected
      return;
    }
    const list = document.createElement('ul');
    list.className = 'resource-list';
    resources.forEach((res, idx) => {
      const item = document.createElement('li');
      item.className = 'fade-in';
      item.style.animationDelay = `${idx * 0.05}s`;
      
      if (res.type === 'link') {
        const link = document.createElement('a');
        link.href = res.url;
        link.className = 'resource-link';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = res.title;
        link.appendChild(titleSpan);
        
        // Add view count
        const viewKey = `${res.title.replace(/\s+/g, '_')}`;
        const views = getViewCount(viewKey);
        if (views > 0) {
          const viewBadge = document.createElement('span');
          viewBadge.className = 'view-count';
          viewBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${views}`;
          link.appendChild(viewBadge);
        }
        
        link.addEventListener('click', () => incrementView(viewKey));
        item.appendChild(link);
      } else if (res.type === 'group') {
        item.className = 'resource-group fade-in';
        item.style.animationDelay = `${idx * 0.05}s`;
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'group-title';
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = res.title;
        titleDiv.appendChild(titleSpan);

        // Determine group recency (max mtime of its items)
        if (res.items && res.items.length) {
          const times = res.items.map(i => i.mtime ? Date.parse(i.mtime) : 0);
          const maxTime = Math.max(...times);
          if (maxTime > 0) {
            const d = new Date(maxTime);
            const ts = document.createElement('span');
            ts.className = 'mtime';
            ts.textContent = 'UPDATED ' + d.toISOString().slice(0,10);
            titleDiv.appendChild(ts);
          }
        }
        
        item.appendChild(titleDiv);
        
        const sublist = document.createElement('ul');
        sublist.className = 'sub-resource-list';
        if (!res.items || res.items.length === 0) {
          const subItem = document.createElement('li');
          const span = document.createElement('span');
          span.textContent = 'No files yet';
          span.className = 'placeholder';
          subItem.appendChild(span);
          sublist.appendChild(subItem);
        } else {
          res.items.forEach(subRes => {
            const subItem = document.createElement('li');
            if (subRes.placeholder || !subRes.url) {
              const span = document.createElement('span');
              span.textContent = subRes.title;
              span.className = 'placeholder';
              subItem.appendChild(span);
            } else {
              const link = document.createElement('a');
              link.href = subRes.url;
              link.className = 'resource-link';
              
              const contentWrapper = document.createElement('div');
              contentWrapper.className = 'resource-content';
              
              const titleSpan = document.createElement('span');
              titleSpan.textContent = subRes.title;
              contentWrapper.appendChild(titleSpan);

              // Last updated timestamp per item
              if (subRes.mtime) {
                const d = new Date(subRes.mtime);
                const ts = document.createElement('span');
                ts.className = 'mtime';
                ts.textContent = d.toISOString().slice(0,10);
                contentWrapper.appendChild(ts);
              }
              
              // Add view count
              const viewKey = `${res.title}_${subRes.title}`.replace(/\s+/g, '_');
              const views = getViewCount(viewKey);
              if (views > 0) {
                const viewBadge = document.createElement('span');
                viewBadge.className = 'view-count';
                viewBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${views}`;
                contentWrapper.appendChild(viewBadge);
              }
              
              link.appendChild(contentWrapper);
              
              // Add download button
              const downloadBtn = document.createElement('a');
              downloadBtn.href = subRes.url;
              downloadBtn.download = '';
              downloadBtn.className = 'download-btn';
              downloadBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
              downloadBtn.onclick = (e) => { e.stopPropagation(); incrementView(viewKey); };
              link.appendChild(downloadBtn);

              // Admin delete button (hidden unless body.admin-delete)
              const deleteBtn = document.createElement('button');
              deleteBtn.type = 'button';
              deleteBtn.className = 'delete-btn';
              deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';
              deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!subRes.url) return;
                if (!confirm('Delete this file?\n\n' + subRes.title)) return;
                try {
                  const resp = await fetch('/delete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ url: subRes.url }) });
                  const data = await resp.json();
                  if (data.ok) {
                    // Remove item and re-filter to refresh timestamps & ordering
                    subItem.remove();
                    applyFilters();
                  } else {
                    alert('Delete failed: ' + (data.error || 'Unknown error'));
                  }
                } catch (err){
                  alert('Delete error: ' + err.message);
                }
              });
              link.appendChild(deleteBtn);

              
              link.addEventListener('click', (e) => { if(e.target !== downloadBtn) incrementView(viewKey); });
              // Open files directly in new tab (no preview modal)
              link.addEventListener('click', (e) => {
                const targetTag = e.target.tagName.toLowerCase();
                if (targetTag === 'button' || targetTag === 'svg' || targetTag === 'path') return; // delete icon or button
                const href = subRes.url || '';
                if (/\.(pdf|png|jpg|jpeg|gif)$/i.test(href)) {
                  e.preventDefault();
                  window.open(href, '_blank');
                }
              });
              subItem.appendChild(link);
            }
            sublist.appendChild(subItem);
          });
        }
        item.appendChild(sublist);
      }
      list.appendChild(item);
    });
    notesContainer.appendChild(list);
  }, 400); // Simulate loading delay
}

function applyFilters() {
  const subjectName = subjectFilter.value;
  const examType = examFilter.value;
  const term = (searchInput ? searchInput.value.trim().toLowerCase() : '');
  const sortMode = sortSelect ? sortSelect.value : 'default';

  updateBreadcrumbs(subjectName, examType);

  if (subjectName === 'all' || examType === 'all') {
    render([]);
    return;
  }

  const subject = subjects.find(s => s.name === subjectName);
  let resources = subject ? subject.resources[examType] : [];
  let canonical = canonicalizeResources(examType, resources);

  // Flatten for filtering by term across group items and links, then rebuild filtered structure
  if (term) {
    canonical = canonical.map(group => {
      if (group.type === 'group' && group.items) {
        const filteredItems = group.items.filter(i => i.title.toLowerCase().includes(term));
        return { ...group, items: filteredItems };
      }
      return group.title.toLowerCase().includes(term) ? group : { ...group, items: [] };
    }).filter(g => (g.items && g.items.length) || g.title.toLowerCase().includes(term));
  }

  // Sorting
  if (sortMode === 'title') {
    canonical.sort((a,b) => a.title.localeCompare(b.title));
  } else if (sortMode === 'views') {
    // approximate by summing view counts of items
    const vc = g => (g.items||[]).reduce((sum,i)=> sum + getViewCount(`${g.title}_${i.title}`.replace(/\s+/g,'_')),0);
    canonical.sort((a,b) => vc(b) - vc(a));
  } else if (sortMode === 'recent') {
    const grpTime = g => Math.max(...(g.items||[]).map(i => i.mtime ? Date.parse(i.mtime) : 0), 0);
    canonical.sort((a,b) => grpTime(b) - grpTime(a));
  }

  render(canonical);
}

// Update breadcrumbs based on selection
function updateBreadcrumbs(subject, exam) {
  if (!breadcrumbs) return;
  const ol = breadcrumbs.querySelector('ol');
  if (!ol) return;
  // Remove mid-page "Home" item as requested; show only current selection
  ol.innerHTML = '';
  
  if (subject && subject !== 'all') {
    const li = document.createElement('li');
    li.textContent = subject;
    ol.appendChild(li);
    
    if (exam && exam !== 'all') {
      const examLi = document.createElement('li');
      examLi.textContent = exam;
      ol.appendChild(examLi);
    }
  }
}

// Download all files in a group (placeholder - requires backend or JSZip library)
function downloadAllFiles(group) {
  alert(`Download All feature for "${group.title}"\\n\\nThis would download all files in this section.\\nImplementation requires JSZip library or backend support.`);
  // Future: Use JSZip to bundle files
  // const files = group.items.filter(i => !i.placeholder && i.url);
  // ... create ZIP and download
}

subjectFilter.addEventListener('change', applyFilters);
examFilter.addEventListener('change', applyFilters);
if (searchInput) searchInput.addEventListener('input', () => applyFilters());
if (sortSelect) sortSelect.addEventListener('change', applyFilters);

async function loadYears() {
  try {
    const resp = await fetch('resources.json?t=' + Date.now(), { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      years = Array.isArray(data.years) ? data.years : [];
      if (years.length === 0) years = defaultYears;
      console.log('Loaded years:', years.length, 'years');
    } else {
      years = defaultYears;
    }
  } catch (e) {
    console.error('Error loading resources:', e);
    years = defaultYears;
  }
  fillYears();
  // Set initial to T.E
  const initialYear = years.find(y => y.name === 'T.E') || years[0];
  semesters = initialYear ? initialYear.semesters : [];
  fillSemesters();
  // Set initial to Sem 5
  const initialSemester = semesters.find(s => s.name === 'Sem 5') || semesters[0];
  subjects = initialSemester ? initialSemester.subjects : [];
  fillSubjects();
  applyFilters();
}

// Event listener for year filter change
yearFilter.addEventListener('change', () => {
  const selectedYear = yearFilter.value;
  if (selectedYear === 'all') {
    semesters = [];
    subjects = [];
  } else {
    const year = years.find(y => y.name === selectedYear);
    semesters = year ? year.semesters : [];
  }
  fillSemesters();
  // Reset subject filter
  subjects = [];
  fillSubjects();
  applyFilters();
});

// Event listener for semester filter change
semesterFilter.addEventListener('change', () => {
  const selectedSemester = semesterFilter.value;
  if (selectedSemester === 'all') {
    subjects = [];
  } else {
    const semester = semesters.find(s => s.name === selectedSemester);
    subjects = semester ? semester.subjects : [];
  }
  fillSubjects();
  applyFilters();
});

// Initial load
loadYears();

// Helpers to ensure standard options are always visible
function normalizeTitle(t){
  return String(t).toLowerCase().replace(/\s+/g,'').trim();
}

function canonicalizeResources(exam, resources){
  const out = [];
  const byTitle = new Map();
  (resources || []).forEach(r => {
    if (r.type === 'group') byTitle.set(normalizeTitle(r.title), r);
    if (r.type === 'link') byTitle.set(normalizeTitle(r.title), r);
  });

  const wantedInsem = ['Unit 1','Unit 2','Insem Que Paper','Insem Que Paper Solution'];
  const wantedEndsem = ['Unit 3','Unit 4','Unit 5','Unit 6','Endsem Que Paper','Endsem Que Paper Solution','Decode/Book'];
  const wanted = exam === 'Insem' ? wantedInsem : wantedEndsem;

  for (const label of wanted){
    const key = normalizeTitle(label);
    const found = byTitle.get(key);
    if (label.startsWith('Unit')){
      // Ensure unit group exists and has both subtypes
      let group;
      if (found && found.type === 'group') {
        group = { type:'group', title: label.replace('Unit', 'Unit '), items: (found.items || []).slice() };
      } else if (found && found.type === 'link') {
        // Rare case; wrap link
        group = { type:'group', title: label.replace('Unit', 'Unit '), items: [{ title: found.title, url: found.url }] };
      } else {
        group = { type:'group', title: label.replace('Unit', 'Unit '), items: [] };
      }
      const hasHN = group.items.some(i => /handwritten/i.test(i.title));
      const hasIMP = group.items.some(i => /imp\s*questions|important\s*questions/i.test(i.title));
      const hasBook = group.items.some(i => /book|decode/i.test(i.title));
      if (!hasHN) group.items.push({ title: 'Handwritten Notes — none', placeholder: true });
      if (!hasIMP) group.items.push({ title: 'IMP Questions — none', placeholder: true });
      if (!hasBook) group.items.push({ title: 'Book/Decode — none', placeholder: true });
      out.push(group);
    } else {
      // Question papers and solutions
      if (found && found.type === 'group') {
        out.push(found);
      } else if (found && found.type === 'link') {
        out.push({ type:'group', title: label, items: [{ title: found.title, url: found.url }] });
      } else {
        out.push({ type:'group', title: label, items: [] });
      }
    }
  }
  return out;
}

// Preview modal helpers
function openPreview(title, url) {
  if (!previewModal || !modalOverlay) return;
  modalTitle.textContent = title;
  previewInner.innerHTML = '';
  let node;
  if (/\.pdf$/i.test(url)) {
    node = document.createElement('iframe');
    node.src = url;
    node.setAttribute('title', title);
  } else if (/\.(png|jpg|jpeg|gif)$/i.test(url)) {
    node = document.createElement('img');
    node.src = url;
    node.alt = title;
  } else {
    const p = document.createElement('p');
    p.textContent = 'Preview not supported for this file type.';
    node = p;
  }
  previewInner.appendChild(node);
  modalDownload.href = url;
  modalOverlay.classList.remove('hidden');
  previewModal.classList.remove('hidden');
  modalOverlay.classList.add('active');
  previewModal.classList.add('active');
}

function closePreview() {
  if (!previewModal || !modalOverlay) return;
  previewModal.classList.remove('active');
  modalOverlay.classList.remove('active');
  setTimeout(() => {
    previewModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    previewInner.innerHTML = '';
  }, 250);
}

// Make closePreview available globally for keyboard shortcut
window.closePreview = closePreview;

if (modalClose) modalClose.addEventListener('click', closePreview);
if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closePreview(); });