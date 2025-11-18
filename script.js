// Data: structured by subject (fallback if no manifest is present)
const defaultSubjects = [
  {
    name: 'TOC',
    resources: {
      Insem: [
        { type: 'link', title: 'Insem Que Paper', url: '#' },
        { type: 'link', title: 'Insem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 1', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 2', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ],
      Endsem: [
        { type: 'link', title: 'Endsem Que Paper', url: '#' },
        { type: 'link', title: 'Endsem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 3', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 4', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 5', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 6', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ]
    }
  },
  {
    name: 'HCI',
    resources: {
      Insem: [
        { type: 'link', title: 'Insem Que Paper', url: '#' },
        { type: 'link', title: 'Insem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 1', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 2', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ],
      Endsem: [
        { type: 'link', title: 'Endsem Que Paper', url: '#' },
        { type: 'link', title: 'Endsem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 3', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 4', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 5', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 6', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ]
    }
  },
  {
    name: 'ML',
    resources: {
      Insem: [
        { type: 'link', title: 'Insem Que Paper', url: '#' },
        { type: 'link', title: 'Insem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 1', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 2', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ],
      Endsem: [
        { type: 'link', title: 'Endsem Que Paper', url: '#' },
        { type: 'link', title: 'Endsem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 3', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 4', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 5', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 6', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ]
    }
  },
  {
    name: 'OS',
    resources: {
      Insem: [
        { type: 'link', title: 'Insem Que Paper', url: '#' },
        { type: 'link', title: 'Insem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 1', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 2', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ],
      Endsem: [
        { type: 'link', title: 'Endsem Que Paper', url: '#' },
        { type: 'link', title: 'Endsem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 3', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 4', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 5', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 6', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ]
    }
  },
  {
    name: 'ADBMS',
    resources: {
      Insem: [
        { type: 'link', title: 'Insem Que Paper', url: '#' },
        { type: 'link', title: 'Insem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 1', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 2', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ],
      Endsem: [
        { type: 'link', title: 'Endsem Que Paper', url: '#' },
        { type: 'link', title: 'Endsem Que Paper Solution', url: '#' },
        { 
          type: 'group', title: 'Unit 3', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 4', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 5', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        },
        { 
          type: 'group', title: 'Unit 6', items: [
            { title: 'Handwritten Notes', url: '#' },
            { title: 'IMP Questions', url: '#' }
          ]
        }
      ]
    }
  }
];

// Will be populated from resources.json if present; otherwise uses defaultSubjects
let subjects = [];

const subjectFilter = document.getElementById('subjectFilter');
const examFilter = document.getElementById('examFilter');
const notesContainer = document.getElementById('notesContainer');
const yearSpan = document.getElementById('year');
const breadcrumbs = document.getElementById('breadcrumbs');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

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

              
              link.addEventListener('click', (e) => { if(e.target !== downloadBtn) incrementView(viewKey); });
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

  // Update breadcrumbs
  updateBreadcrumbs(subjectName, examType);

  if (subjectName === 'all' || examType === 'all') {
    render([]);
    return;
  }

  const subject = subjects.find(s => s.name === subjectName);
  const resources = subject ? subject.resources[examType] : [];
  const canonical = canonicalizeResources(examType, resources);
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

async function loadSubjects() {
  try {
    const resp = await fetch('resources.json', { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      subjects = Array.isArray(data.subjects) ? data.subjects : [];
      if (subjects.length === 0) subjects = defaultSubjects;
    } else {
      subjects = defaultSubjects;
    }
  } catch (e) {
    subjects = defaultSubjects;
  }
  fillSubjects();
  applyFilters();
}

// Initial load
loadSubjects();


// Visitor counter
function initVisitorCounter() {
  const counterEl = document.getElementById('visitorCount');
  if (!counterEl) return;
  
  let totalVisitors = parseInt(localStorage.getItem('totalVisitors') || '1247');
  const lastVisit = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();
  
  if (lastVisit !== today) {
    totalVisitors++;
    localStorage.setItem('totalVisitors', totalVisitors);
    localStorage.setItem('lastVisit', today);
  }
  
  counterEl.textContent = totalVisitors.toLocaleString();
}

initVisitorCounter();

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
  const wantedEndsem = ['Unit 3','Unit 4','Unit 5','Unit 6','Endsem Que Paper','Endsem Que Paper Solution'];
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
      if (!hasHN) group.items.push({ title: 'Handwritten Notes — none', placeholder: true });
      if (!hasIMP) group.items.push({ title: 'IMP Questions — none', placeholder: true });
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

// Shortcut: Shift+Enter opens upload page
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.shiftKey) {
    e.preventDefault();
    window.location.href = 'upload.html';
  }
});

