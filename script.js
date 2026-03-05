// ============================================
//   Ayush Raj Portfolio — Script
//   Features: Custom cursor, SPA nav,
//             Typewriter, Skills tabs, Mobile menu
// ============================================

// ── CUSTOM CURSOR ────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const blob = document.getElementById('glow-blob');

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';

  // Ring follows with slight lag
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);

  // Ambient glow follows cursor (slow ease)
  blob.style.left = e.clientX + 'px';
  blob.style.top  = e.clientY + 'px';
});

// Cursor scales on interactive elements
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '50px';
    ring.style.height      = '50px';
    ring.style.borderColor = 'var(--amber)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '32px';
    ring.style.height = '32px';
  });
});


// ── SPA NAVIGATION ───────────────────────────
const navLinks = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.section');

function navigate(target) {
  sections.forEach(s => s.classList.toggle('active', s.id === target));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === target));
  // Close mobile sidebar on navigate
  document.getElementById('sidebar').classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.section);
  });
});


// ── MOBILE HAMBURGER ─────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});


// ── TYPEWRITER EFFECT ────────────────────────
const phrases = [
  "data visualization dashboards",
  "full-stack web interfaces",
  "machine learning experiments",
  "clean, readable code",
  "solutions that actually matter"
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const twEl       = document.getElementById('typewriter');

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    twEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800); // pause at full phrase
      return;
    }
  } else {
    twEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting    = false;
      phraseIndex   = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 40 : 70);
}



typeLoop();


// ── SKILLS TABS ──────────────────────────────
document.querySelectorAll('.skill-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Deactivate all
    document.querySelectorAll('.skill-cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});

//enquiryform
// ── ENQUIRY FORM ─────────────────────────────
const enquiryToggle = document.getElementById('enquiry-toggle');
const enquiryForm   = document.getElementById('enquiry-form');
const enquiryClose  = document.getElementById('enquiry-close');
const enqSubmit     = document.getElementById('enq-submit');
const enqStatus     = document.getElementById('enq-status');

enquiryToggle.addEventListener('click', () => {
  enquiryForm.classList.toggle('open');
});

enquiryClose.addEventListener('click', () => {
  enquiryForm.classList.remove('open');
});

enqSubmit.addEventListener('click', async () => {
  const name  = document.getElementById('enq-name').value.trim();
  const email = document.getElementById('enq-email').value.trim();
  const msg   = document.getElementById('enq-msg').value.trim();

  if (!name || !email || !msg) {
    enqStatus.textContent = 'Please fill all fields.';
    enqStatus.className   = 'enquiry-status error';
    return;
  }

  enqSubmit.textContent = 'Sending…';
  enqSubmit.disabled    = true;

  try {
    const res = await fetch('https://formspree.io/f/mreyzbyr', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, message: msg })
    });

    if (res.ok) {
      enqStatus.textContent = '✓ Message sent!';
      enqStatus.className   = 'enquiry-status success';
      document.getElementById('enq-name').value  = '';
      document.getElementById('enq-email').value = '';
      document.getElementById('enq-msg').value   = '';
    } else {
      throw new Error();
    }
  } catch {
    enqStatus.textContent = '✗ Failed. Try again.';
    enqStatus.className   = 'enquiry-status error';
  }

  enqSubmit.textContent = 'Send ↗';
  enqSubmit.disabled    = false;
});