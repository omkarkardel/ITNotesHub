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

yearSpan.textContent = new Date().getFullYear();

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
  notesContainer.innerHTML = '';
  if (!resources || resources.length === 0) {
    notesContainer.innerHTML = '<p style="opacity:.6">Select a subject and exam type to see resources.</p>';
    return;
  }
  const list = document.createElement('ul');
  list.className = 'resource-list';
  resources.forEach(res => {
    const item = document.createElement('li');
    if (res.type === 'link') {
      const link = document.createElement('a');
      link.href = res.url;
      link.textContent = res.title;
      link.className = 'resource-link';
      item.appendChild(link);
    } else if (res.type === 'group') {
      item.className = 'resource-group';
      const title = document.createElement('h3');
      title.textContent = res.title;
      title.className = 'group-title';
      item.appendChild(title);
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
            link.textContent = subRes.title;
            link.className = 'resource-link';
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
}

function applyFilters() {
  const subjectName = subjectFilter.value;
  const examType = examFilter.value;

  if (subjectName === 'all' || examType === 'all') {
    render([]);
    return;
  }

  const subject = subjects.find(s => s.name === subjectName);
  const resources = subject ? subject.resources[examType] : [];
  const canonical = canonicalizeResources(examType, resources);
  render(canonical);
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

