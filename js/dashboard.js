/* ==========================================================================
   KROMA ACADEMY - Student Dashboard Interactive Controller
   ========================================================================== */
const { initTheme, toggleTheme, initDir, toggleDir, updateDirIcons } = window.KromaLayout;

initTheme();
updateDirIcons(initDir());
document.getElementById('dashDirBtn')?.addEventListener('click', toggleDir);

function updateDashThemeIcons(theme) {
  document.querySelectorAll('[data-theme-icon]').forEach((el) => {
    el.innerHTML = theme === 'dark'
      ? `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  });
}

updateDashThemeIcons(document.documentElement.getAttribute('data-theme') || 'dark');
document.getElementById('dashThemeBtn')?.addEventListener('click', () => {
  toggleTheme();
  updateDashThemeIcons(document.documentElement.getAttribute('data-theme') || 'dark');
});

// Mobile Drawer
const sidebar = document.getElementById('dashSidebar');
const backdrop = document.getElementById('dashBackdrop');
const closeDrawer = () => {
  sidebar.classList.remove('open');
  backdrop.classList.remove('open');
};
document.getElementById('dashMenuBtn')?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('open');
});
backdrop?.addEventListener('click', closeDrawer);

// Demo State (Replaceable with Backend API)
const savedUser = JSON.parse(localStorage.getItem('kroma-demo-user') || 'null');
const state = {
  student: {
    name: savedUser?.name || 'Alex Mercer',
    email: savedUser?.email || 'alex.mercer@kromaacademy.edu',
    phone: savedUser?.phone || '+1 (555) 284-9910',
    batch: 'Batch 2026-A · 3D & VFX Track',
    studentId: 'KRM-2026-0418',
    avatar: 'assets/images/gallery/img_117.jpg'
  },
  courses: [
    { id: 'c1', title: '3D Character Animation & Rigging', duration: '12 Months', trainer: 'Elena Vance', progress: 74, nextLesson: 'Module 9: Facial Blendshapes & Lip Sync' },
    { id: 'c2', title: 'Visual Effects (VFX) & Nuke Compositing', duration: '10 Months', trainer: 'Marcus Thorne', progress: 58, nextLesson: 'Module 6: Deep Compositing & Keying' },
    { id: 'c3', title: 'Motion Graphics with After Effects', duration: '6 Months', trainer: 'Sora Takahashi', progress: 91, nextLesson: 'Module 11: Kinetic Typography Capstone' }
  ],
  schedule: [
    { day: 'Monday', time: '10:00 AM - 01:00 PM', date: 'Nov 18, 2026', course: '3D Character Animation', trainer: 'Elena Vance', room: 'Studio Lab A' },
    { day: 'Tuesday', time: '02:00 PM - 05:00 PM', date: 'Nov 19, 2026', course: 'VFX & Compositing', trainer: 'Marcus Thorne', room: 'Nuke Suite 2' },
    { day: 'Wednesday', time: '10:00 AM - 01:00 PM', date: 'Nov 20, 2026', course: 'Motion Graphics', trainer: 'Sora Takahashi', room: 'Motion Lab B' },
    { day: 'Thursday', time: '02:00 PM - 05:00 PM', date: 'Nov 21, 2026', course: '3D Character Animation', trainer: 'Elena Vance', room: 'Studio Lab A' },
    { day: 'Friday', time: '11:00 AM - 03:00 PM', date: 'Nov 22, 2026', course: 'Portfolio Critique & Open Lab', trainer: 'All Mentors', room: 'Main Cinema Hall' }
  ],
  assignments: [
    { id: 'a1', title: 'Walk Cycle Weight & Overlap', course: '3D Character Animation', deadline: 'Nov 22, 2026', status: 'Pending', file: '' },
    { id: 'a2', title: 'Green Screen Roto & Clean Plate', course: 'Visual Effects (VFX)', deadline: 'Nov 25, 2026', status: 'Pending', file: '' },
    { id: 'a3', title: '30s Broadcast Title Sequence', course: 'Motion Graphics', deadline: 'Nov 14, 2026', status: 'Submitted', file: 'title_seq_v2.mp4' }
  ],
  submissions: [
    { id: 's1', title: 'Mech Walker Turntable Render', desc: '4K Octane turntable with PBR shaders.', date: 'Nov 10, 2026', status: 'Approved', feedback: 'Strong metallic roughness breakup and rim lighting.', file: 'mech_turntable.zip' },
    { id: 's2', title: 'Cyber Alley Rain Compositing', desc: 'Multi-pass EXR comp with depth fog.', date: 'Nov 13, 2026', status: 'Needs Revision', feedback: 'Soften foreground rain bokeh and match black levels.', file: 'cyber_alley_v1.nk' }
  ],
  portfolio: [
    { id: 'p1', title: 'Chronos Robot Rig', desc: 'Full FK/IK bipedal rig built in Maya.', img: 'assets/images/portfolio-robot.jpg' },
    { id: 'p2', title: 'Neon Pulse Title Reel', desc: 'Kinetic 3D typography in Cinema 4D & After Effects.', img: 'assets/images/portfolio-neon.jpg' },
    { id: 'p3', title: 'Shattered Citadel VFX Shot', desc: 'Houdini RBD destruction & Nuke integration.', img: 'assets/images/portfolio-vfx.jpg' }
  ],
  fees: {
    total: 8400,
    paid: 5600,
    pending: 2800,
    nextDue: 'Dec 05, 2026 ($1,400)',
    history: [
      { id: 'RCPT-2026-101', date: 'Aug 05, 2026', desc: 'Term 1 Tuition & Lab Access', amount: '$2,800', status: 'Paid' },
      { id: 'RCPT-2026-248', date: 'Oct 05, 2026', desc: 'Term 2 Tuition & Render Farm', amount: '$2,800', status: 'Paid' },
      { id: 'INV-2026-390', date: 'Dec 05, 2026', desc: 'Term 3 Final Installment', amount: '$1,400', status: 'Upcoming' }
    ]
  },
  notifications: [
    { id: 'n1', title: 'Mentor Feedback Posted', text: 'Marcus Thorne reviewed "Cyber Alley Rain Compositing".', time: '2 hours ago', unread: true },
    { id: 'n2', title: 'Masterclass Guest Session', text: 'Unreal Engine 5.4 Lumen Lighting Workshop this Friday at 4 PM.', time: 'Yesterday', unread: true },
    { id: 'n3', title: 'Render Farm Quota Renewed', text: 'Your monthly 120 GPU-hours have been credited.', time: '3 days ago', unread: false }
  ]
};

function syncTopHeader() {
  const nameEl = document.getElementById('topStudentName');
  const avatarEl = document.getElementById('topAvatar');
  if (nameEl) nameEl.textContent = state.student.name;
  if (avatarEl) {
    const initials = state.student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    avatarEl.textContent = initials || 'ST';
  }
}
syncTopHeader();

const viewMount = document.getElementById('dashboardView');
const pageTitle = document.getElementById('dashPageTitle');

const VIEW_TITLES = {
  overview: 'Overview',
  courses: 'My Courses',
  schedule: 'Batch Schedule',
  assignments: 'Assignments',
  submissions: 'Project Submissions',
  portfolio: 'My Portfolio',
  fees: 'Fee Details',
  notifications: 'Notifications',
  profile: 'Profile Settings'
};

function renderView(view) {
  pageTitle.textContent = VIEW_TITLES[view] || 'Overview';
  document.querySelectorAll('.dash-nav-btn[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });

  if (view === 'overview') {
    const avgProgress = Math.round(state.courses.reduce((s, c) => s + c.progress, 0) / state.courses.length);
    const pendingCount = state.assignments.filter(a => a.status === 'Pending').length;
    viewMount.innerHTML = `
      <div class="glass-card" style="padding:1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;background:linear-gradient(135deg, rgba(124,58,237,0.16), rgba(249,115,22,0.1));">
        <div style="display:flex;align-items:center;gap:1rem;">
          <img src="${state.student.avatar}" alt="${state.student.name}" style="width:62px;height:62px;border-radius:50%;object-fit:cover;border:2px solid var(--brand-purple-light);">
          <div>
            <h2 style="font-size:1.4rem;">Welcome back, ${state.student.name}</h2>
            <p style="color:var(--text-secondary);font-size:0.9rem;">${state.student.batch} · ID: <span style="font-family:var(--font-mono);">${state.student.studentId}</span></p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" data-goto="portfolio">View My Portfolio</button>
      </div>

      <div class="dash-grid-4">
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Enrolled Courses</span>
          <div style="font-size:1.85rem;font-weight:800;font-family:var(--font-display);margin-top:0.25rem;">${state.courses.length}</div>
          <span class="badge badge-purple" style="margin-top:0.4rem;">Active Track</span>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Overall Progress</span>
          <div style="font-size:1.85rem;font-weight:800;font-family:var(--font-display);margin-top:0.25rem;">${avgProgress}%</div>
          <div class="progress-track"><div class="progress-fill" style="width:${avgProgress}%"></div></div>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Pending Assignments</span>
          <div style="font-size:1.85rem;font-weight:800;font-family:var(--font-display);margin-top:0.25rem;">${pendingCount}</div>
          <span class="badge badge-orange" style="margin-top:0.4rem;">Action Needed</span>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Fee Paid Summary</span>
          <div style="font-size:1.85rem;font-weight:800;font-family:var(--font-display);margin-top:0.25rem;">$${state.fees.paid.toLocaleString()}</div>
          <span style="font-size:0.8rem;color:var(--text-muted);">of $${state.fees.total.toLocaleString()} total</span>
        </div>
      </div>

      <div class="dash-grid-2">
        <div class="glass-card" style="padding:1.35rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="font-size:1.1rem;">Upcoming Classes</h3>
            <button class="btn btn-outline btn-sm" data-goto="schedule">Full Schedule</button>
          </div>
          ${state.schedule.slice(0, 3).map(s => `
            <div style="padding:0.75rem 0;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;">
              <div>
                <div style="font-weight:600;font-size:0.95rem;">${s.course}</div>
                <div style="font-size:0.82rem;color:var(--text-muted);">${s.trainer} · ${s.room}</div>
              </div>
              <div style="text-align:right;font-family:var(--font-mono);font-size:0.8rem;">
                <div style="color:var(--brand-orange);">${s.day}, ${s.date}</div>
                <div style="color:var(--text-secondary);">${s.time}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="glass-card" style="padding:1.35rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="font-size:1.1rem;">Recent Submissions &amp; Alerts</h3>
            <button class="btn btn-outline btn-sm" data-goto="notifications">All Alerts</button>
          </div>
          ${state.submissions.map(sub => `
            <div style="padding:0.75rem 0;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <div style="font-weight:600;font-size:0.93rem;">${sub.title}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);">${sub.date}</div>
              </div>
              <span class="badge ${sub.status === 'Approved' ? 'badge-lime' : 'badge-orange'}">${sub.status}</span>
            </div>
          `).join('')}
          ${state.notifications.slice(0, 2).map(n => `
            <div style="padding:0.65rem 0;font-size:0.85rem;color:var(--text-secondary);">
              <strong style="color:var(--text-primary);">${n.title}:</strong> ${n.text}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  else if (view === 'courses') {
    viewMount.innerHTML = `
      <div class="dash-grid-3">
        ${state.courses.map(c => `
          <article class="glass-card" style="padding:1.4rem;display:flex;flex-direction:column;gap:0.85rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="badge badge-purple">${c.duration}</span>
              <span style="font-family:var(--font-mono);font-size:0.85rem;color:var(--brand-lime);">${c.progress}%</span>
            </div>
            <h2 style="font-size:1.18rem;">${c.title}</h2>
            <p style="font-size:0.88rem;color:var(--text-muted);">Mentor: <strong style="color:var(--text-primary);">${c.trainer}</strong></p>
            <div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div>
            <p style="font-size:0.84rem;color:var(--text-secondary);">Up Next: ${c.nextLesson}</p>
            <button class="btn btn-primary btn-sm" style="margin-top:auto;" data-continue-course="${c.title}">Continue Learning</button>
          </article>
        `).join('')}
      </div>
      <div id="courseToast" class="form-toast" style="margin-top:1.25rem;"></div>
    `;
    viewMount.querySelectorAll('[data-continue-course]').forEach(btn => {
      btn.addEventListener('click', () => {
        const toast = document.getElementById('courseToast');
        toast.className = 'form-toast success';
        toast.textContent = `Resuming "${btn.getAttribute('data-continue-course')}" in Demo Studio Player.`;
      });
    });
  }

  else if (view === 'schedule') {
    viewMount.innerHTML = `
      <div class="glass-card" style="padding:1.35rem;">
        <h2 style="font-size:1.2rem;margin-bottom:1rem;">Weekly Batch Calendar</h2>
        <div class="table-wrap">
          <table class="dash-table">
            <thead>
              <tr><th>Day</th><th>Date</th><th>Timing</th><th>Course Session</th><th>Trainer</th><th>Studio Room</th></tr>
            </thead>
            <tbody>
              ${state.schedule.map(s => `
                <tr>
                  <td><strong>${s.day}</strong></td>
                  <td>${s.date}</td>
                  <td style="font-family:var(--font-mono);font-size:0.84rem;">${s.time}</td>
                  <td>${s.course}</td>
                  <td>${s.trainer}</td>
                  <td><span class="badge badge-purple">${s.room}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  else if (view === 'assignments') {
    viewMount.innerHTML = `
      <div class="glass-card" style="padding:1.35rem;">
        <h2 style="font-size:1.2rem;margin-bottom:1rem;">Course Assignments</h2>
        <div class="table-wrap">
          <table class="dash-table">
            <thead>
              <tr><th>Assignment Title</th><th>Course</th><th>Deadline</th><th>Status</th><th>Upload Work</th></tr>
            </thead>
            <tbody>
              ${state.assignments.map(a => `
                <tr>
                  <td><strong>${a.title}</strong>${a.file ? `<div style="font-size:0.78rem;color:var(--brand-lime);">File: ${a.file}</div>` : ''}</td>
                  <td>${a.course}</td>
                  <td style="font-family:var(--font-mono);font-size:0.84rem;">${a.deadline}</td>
                  <td><span class="badge ${a.status === 'Submitted' ? 'badge-lime' : 'badge-orange'}">${a.status}</span></td>
                  <td>
                    <label class="btn btn-outline btn-sm" style="cursor:pointer;">
                      ${a.status === 'Submitted' ? 'Replace File' : 'Upload File'}
                      <input type="file" data-assign-upload="${a.id}" style="display:none;" accept=".zip,.mp4,.blend,.ma,.psd,.pdf,.png,.jpg">
                    </label>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    viewMount.querySelectorAll('[data-assign-upload]').forEach(input => {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const item = state.assignments.find(x => x.id === input.getAttribute('data-assign-upload'));
        if (item) {
          item.status = 'Submitted';
          item.file = file.name;
          renderView('assignments');
        }
      });
    });
  }

  else if (view === 'submissions') {
    viewMount.innerHTML = `
      <div class="dash-grid-2">
        <div class="glass-card" style="padding:1.4rem;">
          <h2 style="font-size:1.18rem;margin-bottom:1rem;">Submit New Project</h2>
          <form id="projectSubmitForm" novalidate>
            <div class="form-group">
              <label for="projTitle" class="form-label">Project Title</label>
              <input type="text" id="projTitle" class="form-control" placeholder="e.g., Sci-Fi Environment Lighting" required>
            </div>
            <div class="form-group">
              <label for="projDesc" class="form-label">Description &amp; Software Used</label>
              <textarea id="projDesc" rows="3" class="form-control" placeholder="Describe your pipeline, render engine, and goals..." required></textarea>
            </div>
            <div class="form-group">
              <label for="projFile" class="form-label">Project Archive / Render Preview</label>
              <input type="file" id="projFile" class="form-control" accept=".zip,.rar,.mp4,.mov,.png,.jpg,.blend,.nk" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit Project for Review</button>
            <div id="projToast" class="form-toast"></div>
          </form>
        </div>

        <div class="glass-card" style="padding:1.4rem;">
          <h2 style="font-size:1.18rem;margin-bottom:1rem;">Submission History</h2>
          ${state.submissions.map(s => `
            <div style="padding:1rem;border-radius:var(--radius-sm);background:var(--bg-soft);border:1px solid var(--border-subtle);margin-bottom:0.85rem;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
                <strong>${s.title}</strong>
                <span class="badge ${s.status === 'Approved' ? 'badge-lime' : 'badge-orange'}">${s.status}</span>
              </div>
              <p style="font-size:0.85rem;color:var(--text-secondary);margin:0.4rem 0;">${s.desc}</p>
              <p style="font-size:0.82rem;color:var(--text-primary);"><strong style="color:var(--brand-purple-light);">Mentor Feedback:</strong> ${s.feedback}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.65rem;">
                <span style="font-family:var(--font-mono);font-size:0.76rem;color:var(--text-muted);">${s.file} · ${s.date}</span>
                ${s.status !== 'Approved' ? `
                  <label class="btn btn-outline btn-sm" style="cursor:pointer;">
                    Resubmit
                    <input type="file" data-resubmit="${s.id}" style="display:none;">
                  </label>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.getElementById('projectSubmitForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('projTitle').value.trim();
      const desc = document.getElementById('projDesc').value.trim();
      const file = document.getElementById('projFile').files[0];
      const toast = document.getElementById('projToast');
      if (!title || !desc || !file) {
        toast.className = 'form-toast error';
        toast.textContent = 'Please fill in title, description, and attach a project file.';
        return;
      }
      state.submissions.unshift({
        id: 's' + Date.now(),
        title,
        desc,
        date: 'Just now',
        status: 'Under Review',
        feedback: 'Queued for mentor critique.',
        file: file.name
      });
      renderView('submissions');
    });
    viewMount.querySelectorAll('[data-resubmit]').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const item = state.submissions.find(x => x.id === inp.getAttribute('data-resubmit'));
        if (item) {
          item.file = f.name;
          item.status = 'Resubmitted';
          item.date = 'Just now';
          renderView('submissions');
        }
      });
    });
  }

  else if (view === 'portfolio') {
    viewMount.innerHTML = `
      <div class="glass-card" style="padding:1.4rem;margin-bottom:1.5rem;">
        <h2 style="font-size:1.18rem;margin-bottom:0.85rem;">Add New Portfolio Piece</h2>
        <form id="portfolioAddForm" style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:0.85rem;align-items:end;" novalidate>
          <div class="form-group" style="margin:0;">
            <label for="portTitle" class="form-label">Project Title</label>
            <input type="text" id="portTitle" class="form-control" placeholder="e.g., Stylized Character Bust" required>
          </div>
          <div class="form-group" style="margin:0;">
            <label for="portDesc" class="form-label">Short Description</label>
            <input type="text" id="portDesc" class="form-control" placeholder="ZBrush + Substance Painter" required>
          </div>
          <div class="form-group" style="margin:0;">
            <label for="portImg" class="form-label">Artwork Image</label>
            <input type="file" id="portImg" class="form-control" accept="image/*" required>
          </div>
          <button type="submit" class="btn btn-primary">Add to Portfolio</button>
        </form>
        <div id="portToast" class="form-toast"></div>
      </div>

      <div class="dash-grid-3">
        ${state.portfolio.map(p => `
          <article class="glass-card" style="overflow:hidden;">
            <img src="${p.img}" alt="${p.title}" style="width:100%;aspect-ratio:16/10;height:auto;object-fit:cover;">
            <div style="padding:1.15rem;">
              <h3 style="font-size:1.05rem;">${p.title}</h3>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-top:0.35rem;">${p.desc}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;
    const form = document.getElementById('portfolioAddForm');
    if (window.innerWidth < 900 && form) form.style.gridTemplateColumns = '1fr';
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('portTitle').value.trim();
      const desc = document.getElementById('portDesc').value.trim();
      const file = document.getElementById('portImg').files[0];
      const toast = document.getElementById('portToast');
      if (!title || !desc || !file) {
        toast.className = 'form-toast error';
        toast.textContent = 'Please enter a title, description, and choose an image.';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        state.portfolio.unshift({ id: 'p' + Date.now(), title, desc, img: reader.result });
        renderView('portfolio');
      };
      reader.readAsDataURL(file);
    });
  }

  else if (view === 'fees') {
    viewMount.innerHTML = `
      <div class="dash-grid-4">
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Total Course Fees</span>
          <div style="font-size:1.75rem;font-weight:800;font-family:var(--font-display);">$${state.fees.total.toLocaleString()}</div>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Paid Amount</span>
          <div style="font-size:1.75rem;font-weight:800;font-family:var(--font-display);color:var(--brand-lime);">$${state.fees.paid.toLocaleString()}</div>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Pending Amount</span>
          <div style="font-size:1.75rem;font-weight:800;font-family:var(--font-display);color:var(--brand-orange);">$${state.fees.pending.toLocaleString()}</div>
        </div>
        <div class="glass-card stat-card">
          <span style="color:var(--text-muted);font-size:0.84rem;">Next Due Date</span>
          <div style="font-size:1.1rem;font-weight:700;margin-top:0.35rem;">${state.fees.nextDue}</div>
        </div>
      </div>

      <div class="glass-card" style="padding:1.35rem;">
        <h2 style="font-size:1.18rem;margin-bottom:1rem;">Payment History &amp; Receipts (Demo)</h2>
        <div class="table-wrap">
          <table class="dash-table">
            <thead>
              <tr><th>Reference</th><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th>Receipt</th></tr>
            </thead>
            <tbody>
              ${state.fees.history.map(h => `
                <tr>
                  <td style="font-family:var(--font-mono);font-size:0.84rem;">${h.id}</td>
                  <td>${h.date}</td>
                  <td>${h.desc}</td>
                  <td><strong>${h.amount}</strong></td>
                  <td><span class="badge ${h.status === 'Paid' ? 'badge-lime' : 'badge-orange'}">${h.status}</span></td>
                  <td>
                    ${h.status === 'Paid'
                      ? `<button class="btn btn-outline btn-sm" data-download-receipt="${h.id}">Download Receipt</button>`
                      : `<span style="font-size:0.82rem;color:var(--text-muted);">Scheduled</span>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    viewMount.querySelectorAll('[data-download-receipt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-download-receipt');
        const rec = state.fees.history.find(x => x.id === id);
        const text = `KROMA ACADEMY - DEMO FEE RECEIPT\nReceipt ID: ${rec.id}\nStudent: ${state.student.name} (${state.student.studentId})\nDate: ${rec.date}\nDescription: ${rec.desc}\nAmount: ${rec.amount}\nStatus: ${rec.status}\n`;
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${rec.id}.txt`;
        a.click();
      });
    });
  }

  else if (view === 'notifications') {
    viewMount.innerHTML = `
      <div class="glass-card" style="padding:1.4rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h2 style="font-size:1.18rem;">Campus &amp; Mentor Notifications</h2>
          <button class="btn btn-outline btn-sm" id="markAllReadBtn">Mark All Read</button>
        </div>
        ${state.notifications.map(n => `
          <div style="padding:1rem;border-radius:var(--radius-sm);background:var(--bg-soft);border:1px solid ${n.unread ? 'var(--brand-purple-light)' : 'var(--border-subtle)'};margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:start;gap:1rem;">
            <div>
              <div style="font-weight:700;">${n.title} ${n.unread ? '<span class="badge badge-orange" style="margin-left:0.4rem;">New</span>' : ''}</div>
              <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:0.25rem;">${n.text}</p>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted);white-space:nowrap;">${n.time}</span>
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('markAllReadBtn')?.addEventListener('click', () => {
      state.notifications.forEach(n => { n.unread = false; });
      renderView('notifications');
    });
  }

  else if (view === 'profile') {
    viewMount.innerHTML = `
      <div class="dash-grid-2">
        <div class="glass-card" style="padding:1.4rem;">
          <h2 style="font-size:1.18rem;margin-bottom:1rem;">Personal Information</h2>
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;">
            <img id="profilePreviewImg" src="${state.student.avatar}" alt="Profile" style="width:74px;height:74px;border-radius:50%;object-fit:cover;border:2px solid var(--brand-orange);">
            <label class="btn btn-outline btn-sm" style="cursor:pointer;">
              Change Photo
              <input type="file" id="profilePhotoInput" accept="image/*" style="display:none;">
            </label>
          </div>
          <form id="profileForm" novalidate>
            <div class="form-group">
              <label for="profName" class="form-label">Full Name</label>
              <input type="text" id="profName" class="form-control" value="${state.student.name}" required>
            </div>
            <div class="form-group">
              <label for="profEmail" class="form-label">Email Address</label>
              <input type="email" id="profEmail" class="form-control" value="${state.student.email}" required>
            </div>
            <div class="form-group">
              <label for="profPhone" class="form-label">Phone Number</label>
              <input type="tel" id="profPhone" class="form-control" value="${state.student.phone}" required>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <div id="profToast" class="form-toast"></div>
          </form>
        </div>

        <div class="glass-card" style="padding:1.4rem;">
          <h2 style="font-size:1.18rem;margin-bottom:1rem;">Change Password</h2>
          <form id="passwordForm" novalidate>
            <div class="form-group">
              <label for="currPass" class="form-label">Current Password</label>
              <input type="password" id="currPass" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="newPass" class="form-label">New Password</label>
              <input type="password" id="newPass" class="form-control" placeholder="Minimum 6 characters" required>
            </div>
            <div class="form-group">
              <label for="confNewPass" class="form-label">Confirm New Password</label>
              <input type="password" id="confNewPass" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-outline">Update Password</button>
            <div id="passToast" class="form-toast"></div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('profilePhotoInput')?.addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        state.student.avatar = r.result;
        document.getElementById('profilePreviewImg').src = r.result;
      };
      r.readAsDataURL(f);
    });
    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profName').value.trim();
      const email = document.getElementById('profEmail').value.trim();
      const phone = document.getElementById('profPhone').value.trim();
      const toast = document.getElementById('profToast');
      if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.className = 'form-toast error';
        toast.textContent = 'Please enter a valid name and email address.';
        return;
      }
      state.student.name = name;
      state.student.email = email;
      state.student.phone = phone;
      localStorage.setItem('kroma-demo-user', JSON.stringify({ name, email, phone }));
      syncTopHeader();
      toast.className = 'form-toast success';
      toast.textContent = 'Profile details updated successfully.';
    });
    document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const curr = document.getElementById('currPass').value;
      const np = document.getElementById('newPass').value;
      const cp = document.getElementById('confNewPass').value;
      const toast = document.getElementById('passToast');
      if (!curr || np.length < 6 || np !== cp) {
        toast.className = 'form-toast error';
        toast.textContent = 'Check current password and ensure new passwords match (min 6 chars).';
        return;
      }
      toast.className = 'form-toast success';
      toast.textContent = 'Demo password updated successfully.';
      e.target.reset();
    });
  }

  // Quick goto buttons inside overview
  viewMount.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => renderView(btn.getAttribute('data-goto')));
  });
}

// Sidebar navigation clicks
document.querySelectorAll('.dash-nav-btn[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    renderView(btn.getAttribute('data-view'));
    closeDrawer();
  });
});

// Logout -> Redirect to Home
document.getElementById('dashLogoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('kroma-demo-user');
  window.location.href = 'index.html';
});

renderView('overview');
