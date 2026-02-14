(() => {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('closeDrawer');

  if (btn && drawer && overlay && closeBtn) {
    const openMenu = () => {
      drawer.classList.add('open');
      overlay.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btn.classList.add('open');
    };

    const closeMenu = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btn.classList.remove('open');
    };

    btn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  const root = document.documentElement;
  let ticking = false;
  let lastY = window.scrollY || 0;
  let scrollEndTimer = null;
  let backToTopBtn = null;

  function ensureBackToTopButton() {
    if (backToTopBtn) return backToTopBtn;
    backToTopBtn = document.createElement('button');
    backToTopBtn.type = 'button';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5l-7 7 1.4 1.4L11 8.8V20h2V8.8l4.6 4.6L19 12z"/></svg>';
    backToTopBtn.style.setProperty('left', 'auto', 'important');
    backToTopBtn.style.setProperty('right', '18px', 'important');
    backToTopBtn.style.setProperty('bottom', '20px', 'important');
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopBtn);
    return backToTopBtn;
  }

  function updateScrollUI() {
    const y = window.scrollY || 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, y / max));
    root.style.setProperty('--scroll-progress', String(progress));
    document.body.classList.toggle('is-scrolled', y > 4);
    const topBtn = ensureBackToTopButton();
    topBtn.classList.toggle('show', y > 420);

    const isDown = y > lastY;
    if (isDown && y > 4) {
      document.body.classList.add('scrolling-down');
    }

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      document.body.classList.remove('scrolling-down');
    }, 180);

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });

  updateScrollUI();
})();
