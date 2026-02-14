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

function buildViewerUrl(title, url) {
  if (!url) return '';
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  params.set('url', url);
  return `viewer.html?${params.toString()}`;
}

function openWatermarkedViewer(title, url) {
  const viewerUrl = buildViewerUrl(title, url);
  if (!viewerUrl) return;
  window.open(viewerUrl, '_blank');
}

function buildDownloadUrl(url) {
  if (!url) return '';
  const params = new URLSearchParams();
  params.set('url', url);
  return `/download?${params.toString()}`;
}

function ensureFullSubjectStructure(sourceYears, templateYears) {
  const clone = JSON.parse(JSON.stringify(sourceYears || []));
  const yearMap = new Map(clone.map((y) => [y.name, y]));

  templateYears.forEach((templateYear) => {
    let targetYear = yearMap.get(templateYear.name);
    if (!targetYear) {
      targetYear = { name: templateYear.name, semesters: [] };
      clone.push(targetYear);
      yearMap.set(templateYear.name, targetYear);
    }
    if (!Array.isArray(targetYear.semesters)) targetYear.semesters = [];

    const semMap = new Map(targetYear.semesters.map((s) => [s.name, s]));
    templateYear.semesters.forEach((templateSem) => {
      let targetSem = semMap.get(templateSem.name);
      if (!targetSem) {
        targetSem = { name: templateSem.name, subjects: [] };
        targetYear.semesters.push(targetSem);
        semMap.set(templateSem.name, targetSem);
      }
      if (!Array.isArray(targetSem.subjects)) targetSem.subjects = [];

      const subMap = new Map(targetSem.subjects.map((sub) => [sub.name, sub]));
      templateSem.subjects.forEach((templateSub) => {
        const existing = subMap.get(templateSub.name);
        if (!existing) {
          targetSem.subjects.push({
            name: templateSub.name,
            resources: { Insem: [], Endsem: [] }
          });
          return;
        }
        if (!existing.resources || typeof existing.resources !== 'object') {
          existing.resources = { Insem: [], Endsem: [] };
        }
        if (!Array.isArray(existing.resources.Insem)) existing.resources.Insem = [];
        if (!Array.isArray(existing.resources.Endsem)) existing.resources.Endsem = [];
      });
    });
  });

  return clone;
}

function normalizeTitle(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, '').trim();
}

function canonicalizePyqResources(exam, resources) {
  const byTitle = new Map();
  (resources || []).forEach((r) => {
    if (r.type === 'group' || r.type === 'link') {
      byTitle.set(normalizeTitle(r.title), r);
    }
  });

  const wanted = exam === 'Insem'
    ? ['Insem Que Paper', 'Insem Que Paper Solution']
    : ['Endsem Que Paper', 'Endsem Que Paper Solution'];

  return wanted.map((label) => {
    const found = byTitle.get(normalizeTitle(label));
    if (found && found.type === 'group') return found;
    if (found && found.type === 'link') {
      return { type: 'group', title: label, items: [{ title: found.title, url: found.url, mtime: found.mtime }] };
    }
    return { type: 'group', title: label, items: [] };
  });
}

function mergeFilesIntoStructure(baseYears, files) {
  const structure = JSON.parse(JSON.stringify(baseYears));
  const fileMap = {};

  files.forEach((file) => {
    const pathParts = file.filename.split('/');
    let subject;
    let exam;
    let filename;
    if (pathParts[0] === 'files') {
      subject = pathParts[1];
      exam = pathParts[2];
      filename = pathParts.slice(3).join('/');
    } else {
      subject = pathParts[0];
      exam = pathParts[1];
      filename = pathParts.slice(2).join('/');
    }
    if (!fileMap[subject]) fileMap[subject] = { Insem: [], Endsem: [] };
    if (!fileMap[subject][exam]) fileMap[subject][exam] = [];
    fileMap[subject][exam].push({
      title: filename,
      url: file.url,
      mtime: file.uploadDate
    });
  });

  structure.forEach((year) => {
    year.semesters.forEach((sem) => {
      sem.subjects.forEach((sub) => {
        if (!fileMap[sub.name]) return;
        Object.keys(fileMap[sub.name]).forEach((exam) => {
          sub.resources[exam] = sub.resources[exam].concat(fileMap[sub.name][exam]);
        });
      });
    });
  });

  return structure;
}

(async function () {
  const yearFilter = document.getElementById('yearFilter');
  const semesterFilter = document.getElementById('semesterFilter');
  const subjectFilter = document.getElementById('subjectFilter');
  const examFilter = document.getElementById('examFilter');
  const container = document.getElementById('pyqContainer');
  const yearSpan = document.getElementById('year');

  let years = [];
  let semesters = [];
  let subjects = [];

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  function fillYears() {
    while (yearFilter.options.length > 1) yearFilter.remove(1);
    years.forEach((yr) => {
      const opt = document.createElement('option');
      opt.value = yr.name;
      opt.textContent = yr.name;
      yearFilter.appendChild(opt);
    });
  }

  function fillSemesters() {
    while (semesterFilter.options.length > 1) semesterFilter.remove(1);
    semesters.forEach((sem) => {
      const opt = document.createElement('option');
      opt.value = sem.name;
      opt.textContent = sem.name;
      semesterFilter.appendChild(opt);
    });
  }

  function fillSubjects() {
    while (subjectFilter.options.length > 1) subjectFilter.remove(1);
    subjects.forEach((sub) => {
      const opt = document.createElement('option');
      opt.value = sub.name;
      opt.textContent = sub.name;
      subjectFilter.appendChild(opt);
    });
  }

  function render(groups) {
    container.innerHTML = '';
    if (!groups || groups.length === 0) return;

    const list = document.createElement('ul');
    list.className = 'resource-list';

    groups.forEach((group) => {
      const item = document.createElement('li');
      item.className = 'resource-group fade-in';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'group-title';
      const titleSpan = document.createElement('span');
      titleSpan.textContent = group.title;
      titleDiv.appendChild(titleSpan);
      item.appendChild(titleDiv);

      const sublist = document.createElement('ul');
      sublist.className = 'sub-resource-list';

      if (!group.items || group.items.length === 0) {
        const subItem = document.createElement('li');
        const empty = document.createElement('span');
        empty.className = 'placeholder';
        empty.textContent = 'No files yet';
        subItem.appendChild(empty);
        sublist.appendChild(subItem);
      } else {
        group.items.forEach((file) => {
          if (!file || !file.url) return;
          const subItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = buildViewerUrl(file.title, file.url) || file.url;
          link.target = '_blank';
          link.rel = 'noopener';
          link.className = 'resource-link';

          const content = document.createElement('div');
          content.className = 'resource-content';
          const title = document.createElement('span');
          title.textContent = file.title;
          content.appendChild(title);

          if (file.mtime) {
            const d = new Date(file.mtime);
            const ts = document.createElement('span');
            ts.className = 'mtime';
            ts.textContent = d.toISOString().slice(0, 10);
            content.appendChild(ts);
          }

          link.appendChild(content);

          const downloadBtn = document.createElement('button');
          downloadBtn.type = 'button';
          downloadBtn.className = 'download-btn';
          downloadBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
          downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(buildDownloadUrl(file.url), '_blank');
          });
          link.appendChild(downloadBtn);

          link.addEventListener('click', (e) => {
            if (e.target.closest('.download-btn')) return;
            if (file.url) {
              e.preventDefault();
              openWatermarkedViewer(file.title, file.url);
            }
          });

          subItem.appendChild(link);
          sublist.appendChild(subItem);
        });
      }

      item.appendChild(sublist);
      list.appendChild(item);
    });

    container.appendChild(list);
  }

  function applyFilters() {
    const selectedSubject = subjectFilter.value;
    const selectedExam = examFilter.value;
    if (selectedSubject === 'all' || selectedExam === 'all') {
      render([]);
      return;
    }

    const subject = subjects.find((s) => s.name === selectedSubject);
    const resources = subject ? subject.resources[selectedExam] : [];
    const pyqGroups = canonicalizePyqResources(selectedExam, resources);
    render(pyqGroups);
  }

  yearFilter.addEventListener('change', () => {
    const selectedYear = yearFilter.value;
    if (selectedYear === 'all') {
      semesters = [];
      subjects = [];
    } else {
      const year = years.find((y) => y.name === selectedYear);
      semesters = year ? year.semesters : [];
    }
    fillSemesters();
    semesterFilter.value = semesters.length > 0 ? semesters[0].name : 'all';

    if (semesterFilter.value === 'all') {
      subjects = [];
    } else {
      const sem = semesters.find((s) => s.name === semesterFilter.value);
      subjects = sem ? sem.subjects : [];
    }
    fillSubjects();
    subjectFilter.value = subjects.length > 0 ? subjects[0].name : 'all';
    applyFilters();
  });

  semesterFilter.addEventListener('change', () => {
    const selectedSemester = semesterFilter.value;
    if (selectedSemester === 'all') {
      subjects = [];
    } else {
      const sem = semesters.find((s) => s.name === selectedSemester);
      subjects = sem ? sem.subjects : [];
    }
    fillSubjects();
    subjectFilter.value = subjects.length > 0 ? subjects[0].name : 'all';
    applyFilters();
  });

  subjectFilter.addEventListener('change', applyFilters);
  examFilter.addEventListener('change', applyFilters);

  async function loadYears() {
    let baseYears = [];
    try {
      const resp = await fetch('resources.json?t=' + Date.now(), { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        const loadedYears = Array.isArray(data.years) ? data.years : defaultYears;
        baseYears = ensureFullSubjectStructure(loadedYears, defaultYears);
      } else {
        baseYears = defaultYears;
      }
    } catch {
      baseYears = defaultYears;
    }

    try {
      let resp = await fetch('/list-files', { cache: 'no-store' });
      if (!resp.ok) resp = await fetch('/.netlify/functions/list-files', { cache: 'no-store' });
      if (resp.ok) {
        const files = await resp.json();
        years = mergeFilesIntoStructure(baseYears, files);
      } else {
        years = baseYears;
      }
    } catch {
      years = baseYears;
    }

    fillYears();
    const initialYear = years.find((y) => y.name === 'T.E') || years[0];
    yearFilter.value = initialYear ? initialYear.name : 'all';
    yearFilter.dispatchEvent(new Event('change'));
    const initialSemester = semesters.find((s) => s.name === 'Sem 5') || semesters[0];
    semesterFilter.value = initialSemester ? initialSemester.name : 'all';
    semesterFilter.dispatchEvent(new Event('change'));
    subjectFilter.value = subjects.length > 0 ? subjects[0].name : 'all';
    examFilter.value = 'Endsem';
    applyFilters();
  }

  loadYears();
})();
