/* ==========================================================================
   KROMA ACADEMY - Authentication Pages (Login & Signup)
   ========================================================================== */
const { initTheme, toggleTheme, updateThemeIcons, initDir, toggleDir, updateDirIcons } = window.KromaLayout;

updateThemeIcons(initTheme());
updateDirIcons(initDir());

document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', toggleTheme);
});
document.querySelectorAll('[data-dir-toggle]').forEach((btn) => {
  btn.addEventListener('click', toggleDir);
});

// Password visibility toggles (supports multiple fields on Signup)
document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-toggle-password');
    const input = document.getElementById(targetId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    btn.innerHTML = isPassword
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });
});

// Forgot password feedback
const forgotLink = document.getElementById('forgotPasswordLink');
forgotLink?.addEventListener('click', (e) => {
  e.preventDefault();
  const toast = document.getElementById('authToast');
  if (!toast) return;
  toast.className = 'form-toast success';
  toast.textContent = 'Demo Mode: Password reset instructions would be sent to your registered email.';
});

// Social icon demo feedback
document.querySelectorAll('.social-auth-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const provider = btn.getAttribute('data-provider');
    const toast = document.getElementById('authToast');
    if (toast) {
      toast.className = 'form-toast success';
      toast.textContent = `Demo ${provider} sign-in selected. Redirecting to Student Dashboard...`;
    }
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 850);
  });
});

// Login Form Validation
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const emailErr = document.getElementById('loginEmailErr');
  const passErr = document.getElementById('loginPasswordErr');
  const toast = document.getElementById('authToast');

  emailErr.textContent = '';
  passErr.textContent = '';
  toast.className = 'form-toast';

  let valid = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailErr.textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (password.length < 6) {
    passErr.textContent = 'Password must be at least 6 characters.';
    valid = false;
  }
  if (!valid) return;

  localStorage.setItem('kroma-demo-user', JSON.stringify({
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    email
  }));
  toast.className = 'form-toast success';
  toast.textContent = 'Demo sign-in successful! Opening your Student Dashboard...';
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 750);
});

// Signup Form Validation
const signupForm = document.getElementById('signupForm');
signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const pass = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirmPassword').value;
  const terms = document.getElementById('signupTerms').checked;
  const toast = document.getElementById('authToast');

  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  toast.className = 'form-toast';

  let valid = true;
  if (name.length < 2) {
    document.getElementById('signupNameErr').textContent = 'Please enter your full name.';
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('signupEmailErr').textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (!/^[+\d\s()-]{7,18}$/.test(phone)) {
    document.getElementById('signupPhoneErr').textContent = 'Please enter a valid phone number.';
    valid = false;
  }
  if (pass.length < 6) {
    document.getElementById('signupPasswordErr').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }
  if (confirm !== pass) {
    document.getElementById('signupConfirmErr').textContent = 'Passwords do not match.';
    valid = false;
  }
  if (!terms) {
    document.getElementById('signupTermsErr').textContent = 'You must agree to the Terms and Conditions.';
    valid = false;
  }
  if (!valid) return;

  localStorage.setItem('kroma-demo-user', JSON.stringify({ name, email, phone }));
  toast.className = 'form-toast success';
  toast.textContent = 'Demo account created! Redirecting to your Student Dashboard...';
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
});
