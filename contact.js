// Contact form validation & UX enhancements
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const statusEl = document.getElementById('formStatus');

  function setStatus(msg, ok){
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + (ok ? 'ok' : 'error');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('user_name').trim();
    const email = data.get('user_email').trim();
    const subject = data.get('subject').trim();
    const message = data.get('message').trim();

    if (!name || !email || !subject || !message){
      setStatus('Please fill all fields.', false);
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      setStatus('Invalid email format.', false);
      return;
    }

    // EmailJS Integration (replace with your IDs)
    const SERVICE_ID = 'service_7tirqc1';  // Replace with your EmailJS service ID
    const TEMPLATE_ID = 'template_8236677'; // Replace with your EmailJS template ID
    const PUBLIC_KEY = 'aosrbD6dybqS0AnHQ';   // Replace with your EmailJS public key

    setStatus('Sending...', true);

    try {
      // Using EmailJS to send email
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message
      }, PUBLIC_KEY);

      setStatus('Message sent successfully!', true);
      form.reset();
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('Failed to send message. Please try again.', false);
    }
  });

  // Glow focus states
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('focus', () => el.classList.add('focus-glow'));
    el.addEventListener('blur', () => el.classList.remove('focus-glow'));
  });
})();
