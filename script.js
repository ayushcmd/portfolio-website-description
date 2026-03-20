// ── CUSTOM CURSOR ────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '50px'; ring.style.height = '50px';
    ring.style.borderColor = 'var(--amber)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px'; ring.style.height = '32px';
  });
});

// ── SPA NAVIGATION ───────────────────────────
const navLinks = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.section');

function navigate(target) {
  sections.forEach(s => s.classList.toggle('active', s.id === target));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === target));
  document.getElementById('sidebar').classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); navigate(link.dataset.section); });
});

// ── MOBILE HAMBURGER ─────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// ── TYPEWRITER EFFECT ────────────────────────
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const twEl = document.getElementById('typewriter');
let phrases = [];

function typeLoop() {
  if (!phrases.length) return;
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    twEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { isDeleting = true; setTimeout(typeLoop, 2800); return; }  } else {
    twEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
  }
  setTimeout(typeLoop, isDeleting ? 90 : 120);
}

// Start typewriter after i18n loads
document.addEventListener('i18n:ready', () => {
  phrases = [
    window.translations['typewriter.0'] || 'data visualization dashboards',
    window.translations['typewriter.1'] || 'full-stack web interfaces',
    window.translations['typewriter.2'] || 'machine learning experiments',
    window.translations['typewriter.3'] || 'clean, readable code',
    window.translations['typewriter.4'] || 'solutions that actually matter',
  ];
  phraseIndex = 0; charIndex = 0; isDeleting = false;
  typeLoop();
});

// ── SKILLS TABS ──────────────────────────────
document.querySelectorAll('.skill-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skill-cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});

// ── ENQUIRY FORM ─────────────────────────────
const enquiryToggle = document.getElementById('enquiry-toggle');
const enquiryForm   = document.getElementById('enquiry-form');
const enquiryClose  = document.getElementById('enquiry-close');
const enqSubmit     = document.getElementById('enq-submit');
const enqStatus     = document.getElementById('enq-status');

enquiryToggle.addEventListener('click', () => enquiryForm.classList.toggle('open'));
enquiryClose.addEventListener('click',  () => enquiryForm.classList.remove('open'));

enqSubmit.addEventListener('click', async () => {
  const name  = document.getElementById('enq-name').value.trim();
  const email = document.getElementById('enq-email').value.trim();
  const msg   = document.getElementById('enq-msg').value.trim();
  if (!name || !email || !msg) {
    enqStatus.textContent = window.translations['form.error_fill'] || 'Please fill all fields.';
    enqStatus.className = 'enquiry-status error';
    return;
  }
  enqSubmit.textContent = window.translations['form.sending'] || 'Sending…';
  enqSubmit.disabled = true;
  try {
    const res = await fetch('https://formspree.io/f/mreyzbyr', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message: msg })
    });
    if (res.ok) {
      enqStatus.textContent = window.translations['form.success'] || '✓ Message sent!';
      enqStatus.className = 'enquiry-status success';
      document.getElementById('enq-name').value = '';
      document.getElementById('enq-email').value = '';
      document.getElementById('enq-msg').value = '';
    } else throw new Error();
  } catch {
    enqStatus.textContent = window.translations['form.error_failed'] || '✗ Failed. Try again.';
    enqStatus.className = 'enquiry-status error';
  }
  enqSubmit.textContent = window.translations['form.submit_btn'] || 'Send ↗';
  enqSubmit.disabled = false;
});

// ── SCROLL PROGRESS BAR ──────────────────────
const progressBar = document.getElementById('scroll-progress');
const mainEl = document.querySelector('.main');
function updateProgress() {
  const pct = mainEl.scrollHeight - mainEl.clientHeight > 0
    ? (mainEl.scrollTop / (mainEl.scrollHeight - mainEl.clientHeight)) * 100 : 0;
  progressBar.style.width = pct + '%';
}
mainEl.addEventListener('scroll', updateProgress, { passive: true });
document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', () => setTimeout(updateProgress, 80));
});

// ── KEYBOARD NAVIGATION ──────────────────────
const sectionKeys = { '1':'home', '2':'about', '3':'skills', '4':'projects', '5':'contact' };
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (sectionKeys[e.key]) {
    navigate(sectionKeys[e.key]);
    const hint = document.getElementById('keyboard-hint');
    if (hint) {
      hint.style.opacity = '1'; hint.style.color = 'var(--amber)';
      setTimeout(() => { hint.style.opacity = '0.5'; hint.style.color = ''; }, 600);
    }
  }
});

// ── GITHUB ACTIVITY FEED ─────────────────────
async function loadGithubActivity() {
  const container = document.getElementById('gh-events');
  if (!container) return;
  try {
    const res = await fetch('https://api.github.com/users/ayushcmd/events/public?per_page=15');
    if (!res.ok) throw new Error();
    const events = await res.json();
    const iconMap = { PushEvent:'↑', CreateEvent:'+', WatchEvent:'★', ForkEvent:'⑂', PullRequestEvent:'⤷' };
    const rendered = [];
    for (const ev of events) {
      if (rendered.length >= 5) break;
      let text = '', icon = iconMap[ev.type] || '·';
      const repo = ev.repo.name.replace('ayushcmd/', '');
      if (ev.type === 'PushEvent') {
        const msg = ev.payload.commits?.[0]?.message?.split('\n')[0] || 'pushed commits';
        const count = ev.payload.size || 1;
        text = `pushed ${count} commit${count > 1 ? 's' : ''} to <strong>${repo}</strong> — ${msg.length > 52 ? msg.slice(0,52)+'…' : msg}`;
      } else if (ev.type === 'CreateEvent') {
        const ref = ev.payload.ref || ev.payload.ref_type;
        text = `created ${ev.payload.ref_type} <strong>${ref || repo}</strong>${ev.payload.ref_type === 'repository' ? '' : ` in <strong>${repo}</strong>`}`;
      } else if (ev.type === 'WatchEvent') { text = `starred <strong>${repo}</strong>`;
      } else if (ev.type === 'ForkEvent')  { text = `forked <strong>${repo}</strong>`;
      } else if (ev.type === 'PullRequestEvent') {
        text = `${ev.payload.action} PR in <strong>${repo}</strong>: ${(ev.payload.pull_request?.title || '').slice(0,50)}`;
      } else continue;
      rendered.push({ icon, text, ago: getRelativeTime(new Date(ev.created_at)) });
    }
    if (rendered.length === 0) {
      container.innerHTML = `<div class="gh-error">${window.translations['home.activity.empty'] || 'No recent public activity.'}</div>`;
      return;
    }
    container.innerHTML = rendered.map(ev => `
      <div class="gh-event">
        <span class="gh-event-icon">${ev.icon}</span>
        <div class="gh-event-body">
          <div class="gh-event-text">${ev.text}</div>
          <div class="gh-event-meta">${ev.ago}</div>
        </div>
      </div>`).join('');
  } catch {
    document.getElementById('gh-events').innerHTML = `<div class="gh-error">${window.translations['home.activity.error'] || 'Could not load activity — check back later.'}</div>`;
  }
}
function getRelativeTime(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}
loadGithubActivity();

// ── GITHUB CONTRIBUTION HEATMAP ──────────────
async function loadHeatmap() {
  const body = document.getElementById('gh-heatmap-body');
  const totalEl = document.getElementById('gh-heatmap-total');
  if (!body) return;

  try {
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/ayushcmd?y=last');
    if (!res.ok) throw new Error();
    const data = await res.json();

    const contributions = data.contributions;
    if (!contributions || !contributions.length) throw new Error();

    const total = contributions.reduce((sum, d) => sum + d.count, 0);
    totalEl.innerHTML = `<span>${total}</span> contributions in the last year`;

    const weeks = [];
    let week = [];
    contributions.forEach((day) => {
      week.push(day);
      if (week.length === 7) { weeks.push(week); week = []; }
    });
    if (week.length) weeks.push(week);

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let lastMonth = -1;
    const monthLabels = weeks.map(w => {
      const m = new Date(w[0].date).getMonth();
      if (m !== lastMonth) { lastMonth = m; return monthNames[m]; }
      return '';
    });

    const monthRow = document.createElement('div');
    monthRow.className = 'gh-heatmap-months';
    monthLabels.forEach(label => {
      const span = document.createElement('span');
      span.className = 'gh-heatmap-month-label';
      span.textContent = label;
      monthRow.appendChild(span);
    });

    const grid = document.createElement('div');
    grid.className = 'gh-heatmap-grid-wrap';

    weeks.forEach(w => {
      const col = document.createElement('div');
      col.className = 'gh-heatmap-col';
      w.forEach(day => {
        const cell = document.createElement('div');
        cell.className = `gh-heatmap-cell gh-cell-${day.level}`;
        const dateStr = new Date(day.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
        cell.setAttribute('data-tip', `${day.count} contribution${day.count !== 1 ? 's' : ''} · ${dateStr}`);
        col.appendChild(cell);
      });
      grid.appendChild(col);
    });

    const legend = document.createElement('div');
    legend.className = 'gh-heatmap-legend';
    legend.innerHTML = `
      <span class="gh-heatmap-legend-label">${window.translations['home.heatmap.less'] || 'Less'}</span>
      <div class="gh-heatmap-legend-cell gh-cell-0"></div>
      <div class="gh-heatmap-legend-cell gh-cell-1"></div>
      <div class="gh-heatmap-legend-cell gh-cell-2"></div>
      <div class="gh-heatmap-legend-cell gh-cell-3"></div>
      <div class="gh-heatmap-legend-cell gh-cell-4"></div>
      <span class="gh-heatmap-legend-label">${window.translations['home.heatmap.more'] || 'More'}</span>
    `;

    body.innerHTML = '';
    body.appendChild(monthRow);
    body.appendChild(grid);
    body.appendChild(legend);

  } catch {
    body.innerHTML = `<div class="gh-heatmap-loading" style="color:var(--text-dim)">${window.translations['home.heatmap.error'] || 'Could not load heatmap.'}</div>`;
  }
}
loadHeatmap();