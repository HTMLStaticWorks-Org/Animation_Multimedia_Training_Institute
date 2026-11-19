/* ==========================================================================
   KROMA ACADEMY - Global Layout, Theme, Navigation & Animation Engine
   ========================================================================== */

(function () {
document.documentElement.classList.add('js-reveal');

const KROMA_LOGO_SVG = `<img src="assets/images/logo.svg" alt="KROMA Logo" width="38" height="38" style="flex-shrink:0;">`;

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'home-2', label: 'Home 2', href: 'home-2.html' },
  { id: 'about', label: 'About', href: 'about.html' },
  { id: 'courses', label: 'Courses', href: 'courses.html' },
  { id: 'showcase', label: 'Showcase', href: 'showcase.html' },
  { id: 'placements', label: 'Placements', href: 'placements.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' },
  { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html' }
];

function initTheme() {
  const saved = localStorage.getItem('kroma-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  return saved;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kroma-theme', next);
  updateThemeIcons(next);
}

function initDir() {
  const saved = localStorage.getItem('kroma-dir') || 'ltr';
  document.documentElement.setAttribute('dir', saved);
  return saved;
}

function toggleDir() {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  const next = current === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', next);
  localStorage.setItem('kroma-dir', next);
  updateDirIcons(next);
}

function updateDirIcons(dir) {
  document.querySelectorAll('[data-dir-icon]').forEach((el) => {
    el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M21 7H3"/><path d="M7 21l-4-4 4-4"/><path d="M3 17h18"/></svg>`;
    const btn = el.closest('button');
    if (btn) {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      btn.classList.toggle('is-rtl', dir === 'rtl');
    }
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('[data-theme-icon]').forEach((el) => {
    el.innerHTML = theme === 'dark'
      ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  });
}

function renderHeader(activePage) {
  const headerMount = document.getElementById('site-header');
  if (!headerMount) return;

  const linksHtml = NAV_ITEMS.map(item => `
    <a href="${item.href}" class="nav-link ${activePage === item.id ? 'active' : ''}">${item.label}</a>
  `).join('');

  headerMount.innerHTML = `
    <header class="site-header" id="mainHeader">
      <div class="container header-inner">
        <a href="index.html" class="brand-logo" aria-label="KROMA Academy Home">
          ${KROMA_LOGO_SVG}
          <span>KROMA</span>
        </a>

        <nav class="nav-links" aria-label="Primary Navigation">
          ${linksHtml}
        </nav>

        <div class="header-actions">
          <div class="header-desktop-toggles">
            <button type="button" class="theme-toggle dir-toggle" id="dirToggleBtn" data-dir-toggle aria-label="Toggle RTL and LTR Direction" title="Switch to RTL">
              <span data-dir-icon></span>
            </button>
            <button type="button" class="theme-toggle" id="themeToggleBtn" data-theme-toggle aria-label="Toggle Light and Dark Mode" title="Switch Theme">
              <span data-theme-icon></span>
            </button>
          </div>
          <div class="header-cta-group">
            <a href="login.html" class="btn btn-outline btn-sm">Login</a>
            <a href="signup.html" class="btn btn-primary btn-sm">Apply Now</a>
          </div>
          <button type="button" class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open Menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-drawer" id="mobileDrawer" aria-label="Mobile Navigation">
      ${linksHtml}
      <div class="mobile-drawer-controls">
        <div class="mobile-drawer-toggles">
          <button type="button" class="theme-toggle dir-toggle" data-dir-toggle aria-label="Toggle RTL and LTR Direction" title="Switch Direction">
            <span data-dir-icon></span>
          </button>
          <button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle Light and Dark Mode" title="Switch Theme">
            <span data-theme-icon></span>
          </button>
        </div>
        <div class="mobile-drawer-ctas">
          <a href="login.html" class="btn btn-outline btn-sm" style="flex:1;">Login</a>
          <a href="signup.html" class="btn btn-primary btn-sm" style="flex:1;">Apply Now</a>
        </div>
      </div>
    </div>
  `;

  updateThemeIcons(initTheme());
  updateDirIcons(initDir());

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => btn.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-dir-toggle]').forEach((btn) => btn.addEventListener('click', toggleDir));

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  mobileBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', String(isOpen));
  });

  window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

function renderFooter() {
  const footerMount = document.getElementById('site-footer');
  if (!footerMount) return;

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="brand-logo" style="margin-bottom:1rem;">
              ${KROMA_LOGO_SVG}
              <span>KROMA</span>
            </a>
            <p style="color:var(--text-secondary);font-size:0.93rem;max-width:34ch;margin-bottom:1.35rem;">
              A premier Animation & Multimedia Training Institute shaping the next generation of 3D artists, VFX supervisors, motion designers, and creative directors.
            </p>
            <div class="social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-icon-btn ig" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-icon-btn fb" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" class="social-icon-btn yt" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-icon-btn li" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home 1</a></li>
              <li><a href="home-2.html">Home 2</a></li>
              <li><a href="about.html">About Institute</a></li>
              <li><a href="showcase.html">Student Showcase</a></li>
              <li><a href="placements.html">Placements & Careers</a></li>
              <li><a href="contact.html">Contact Campus</a></li>
              <li><a href="dashboard.html">Student Portal</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Popular Courses</h3>
            <ul class="footer-links">
              <li><a href="courses.html#course-grid">3D Animation & Rigging</a></li>
              <li><a href="courses.html#course-grid">Visual Effects (VFX)</a></li>
              <li><a href="courses.html#course-grid">Motion Graphics</a></li>
              <li><a href="courses.html#course-grid">UI/UX Product Design</a></li>
              <li><a href="courses.html#course-grid">Game Design & Unreal</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Studio Updates</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:0.85rem;">
              740 Creative District Blvd, Suite 4B<br>
              +1 (555) 394-8820 · admissions@kromaacademy.edu
            </p>
            <form id="footerNewsletterForm" novalidate>
              <div style="display:flex;gap:0.5rem;">
                <input type="email" id="newsletterEmail" class="form-control" placeholder="Your email address" required style="padding:0.65rem 0.9rem;font-size:0.86rem;">
                <button type="submit" class="btn btn-primary btn-sm">Join</button>
              </div>
              <div id="newsletterMsg" style="font-size:0.8rem;margin-top:0.45rem;color:var(--brand-lime);"></div>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; 2026 KROMA Academy of Animation &amp; Multimedia. All rights reserved.</span>
          <div style="display:flex;gap:1.5rem;">
            <a href="about.html">Academic Policy</a>
            <a href="contact.html">Campus Tour</a>
          </div>
        </div>
      </div>
    </footer>

    <button type="button" class="back-to-top" id="backToTopBtn" aria-label="Scroll back to top" title="Back to Top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  `;

  const backBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (backBtn) backBtn.classList.toggle('visible', window.scrollY > 360);
  }, { passive: true });
  backBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const newsForm = document.getElementById('footerNewsletterForm');
  newsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    const msg = document.getElementById('newsletterMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.color = '#EF4444';
      msg.textContent = 'Please enter a valid email address.';
      return;
    }
    msg.style.color = 'var(--brand-lime)';
    msg.textContent = 'Subscribed! Check your inbox for our 2026 prospectus.';
    newsForm.reset();
  });
}

function initAnimations() {
  // 1. Bulletproof Scroll Reveal for [data-reveal] (works for static + dynamic elements)
  function revealInView() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + 60 && rect.bottom > -60) {
        const delay = el.getAttribute('data-delay') || '0';
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('revealed');
      }
    });
  }

  let obs = null;
  if ('IntersectionObserver' in window) {
    obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || '0';
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '60px 0px 60px 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el));
  }

  // Observe dynamically added [data-reveal] elements (e.g. courses grid)
  if ('MutationObserver' in window) {
    const mObs = new MutationObserver(() => {
      if (obs) {
        document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => obs.observe(el));
      }
      revealInView();
    });
    mObs.observe(document.body, { childList: true, subtree: true });
  }

  // Initial + scroll fallback so fast scrolling never leaves elements hidden
  revealInView();
  setTimeout(revealInView, 120);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        revealInView();
        ticking = false;
      });
    }
  }, { passive: true });

  // 2. Animated Counters [data-counter]
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cObs.unobserve(el);
      });
    }, { threshold: 0.35 });
    counters.forEach((c) => cObs.observe(c));
  }

  // 3. Subtle 3D Tilt on [data-tilt]
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

function initShowreelModal() {
  if (document.getElementById('showreelModal')) return;
  const modal = document.createElement('div');
  modal.id = 'showreelModal';
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="showreelTitle">
      <div class="modal-header" style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.4rem;border-bottom:1px solid var(--border-subtle);">
        <div>
          <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--brand-orange);text-transform:uppercase;">KROMA Studio Preview</span>
          <h3 id="showreelTitle" style="font-size:1.15rem;margin-top:0.15rem;">Student Showreel 2026</h3>
        </div>
        <button type="button" id="closeShowreelBtn" class="theme-toggle" style="flex-shrink:0;" aria-label="Close Preview">&times;</button>
      </div>
      <div class="modal-body" style="padding:1.25rem 1.4rem;">
        <div class="modal-preview-frame" style="position:relative;min-height:210px;aspect-ratio:16/9;border-radius:var(--radius-md);overflow:hidden;background:#090B14;border:1px solid var(--border-strong);display:flex;align-items:stretch;">
          <img id="showreelPreviewImg" src="" alt="Showreel frame" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.85;">
          <div class="modal-preview-overlay" style="position:relative;z-index:1;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(to top, rgba(9,11,20,0.9), rgba(9,11,20,0.35));padding:1.25rem;text-align:center;">
            <span class="modal-preview-badge" style="display:inline-flex;align-items:center;justify-content:center;gap:0.45rem;padding:0.42rem 0.95rem;border-radius:999px;background:rgba(124,58,237,0.88);color:#fff;font-size:0.78rem;font-weight:600;line-height:1.35;margin-bottom:0.75rem;max-width:100%;">
              4K Render · 60 FPS · Blender / Maya / Nuke
            </span>
            <p id="showreelDesc" style="color:#E2E8F0;max-width:52ch;font-size:0.92rem;line-height:1.55;margin:0;"></p>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.classList.remove('open');
  document.getElementById('closeShowreelBtn')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-showreel-trigger]');
    if (!trigger) return;
    const title = trigger.getAttribute('data-title') || 'KROMA 2026 Showreel';
    const img = trigger.getAttribute('data-img') || 'assets/images/hero-home1.jpg';
    const desc = trigger.getAttribute('data-desc') || 'Featuring final thesis reels from our 3D Animation, VFX Compositing, and Motion Design cohorts.';
    document.getElementById('showreelTitle').textContent = title;
    document.getElementById('showreelPreviewImg').src = img;
    document.getElementById('showreelDesc').textContent = desc;
    modal.classList.add('open');
  });
}

function bootstrapPublicPage(activePage) {
  initTheme();
  initDir();
  renderHeader(activePage);
  renderFooter();
  initAnimations();
  initShowreelModal();
}

window.KromaLayout = {
  KROMA_LOGO_SVG,
  initTheme,
  toggleTheme,
  updateThemeIcons,
  initDir,
  toggleDir,
  updateDirIcons,
  renderHeader,
  renderFooter,
  initAnimations,
  initShowreelModal,
  bootstrapPublicPage
};
})();
