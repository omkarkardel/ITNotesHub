(function(){
  const API_BASES = ['', 'http://localhost:3000'];
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupMsg = document.getElementById('signupMsg');
  const loginMsg = document.getElementById('loginMsg');

  const qs = new URLSearchParams(window.location.search);
  const redirectTo = qs.get('redirect') || 'notes.html';

  function setMsg(el, msg, ok){
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'msg ' + (ok ? 'ok' : 'err');
  }

  function saveAuth(data){
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_user', JSON.stringify(data.user || {}));
  }

  async function request(path, body){
    let last = { resp: null, data: {}, error: 'No backend reachable' };
    for (const base of API_BASES) {
      const url = base ? `${base}${path}` : path;
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await resp.json().catch(() => ({}));
        if (resp.ok) return { resp, data };
        last = { resp, data, error: data.error || `HTTP ${resp.status}` };
      } catch (e) {
        last = { resp: null, data: {}, error: e.message };
      }
    }
    return last;
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', async () => {
      const name = document.getElementById('suName').value.trim();
      const email = document.getElementById('suEmail').value.trim();
      const password = document.getElementById('suPassword').value;
      const { resp, data } = await request('/auth/signup', { name, email, password });
      if (!resp || !resp.ok || !data.ok) {
        setMsg(signupMsg, data.error || 'Signup failed. Start backend with npm start.', false);
        return;
      }
      saveAuth(data);
      setMsg(signupMsg, 'Signup successful. Redirecting...', true);
      setTimeout(() => { window.location.href = redirectTo; }, 500);
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const email = document.getElementById('liEmail').value.trim();
      const password = document.getElementById('liPassword').value;
      const { resp, data } = await request('/auth/login', { email, password });
      if (!resp || !resp.ok || !data.ok) {
        setMsg(loginMsg, data.error || 'Login failed. Start backend with npm start.', false);
        return;
      }
      saveAuth(data);
      setMsg(loginMsg, 'Login successful. Redirecting...', true);
      setTimeout(() => { window.location.href = redirectTo; }, 500);
    });
  }
})();
