(() => {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('closeDrawer');

  if (!btn || !drawer || !overlay || !closeBtn) return;

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
})();
