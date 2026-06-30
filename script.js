/* =========================================================
   DON MANIA — PORTFOLIO SCRIPT
   Modules: Particles, Navbar, Mobile Menu, Smooth Scroll +
   Active Link, Typing Animation, Scroll Reveal, Skill Bars,
   Contact Form Validation, Back To Top, Footer Year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileMenu();
  initActiveNavOnScroll();
  initTypingAnimation();
  initScrollReveal();
  initContactForm();
  initBackToTop();
  setFooterYear();
});

/* ---------- Background Particles ---------- */
function initParticles () {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  const COUNT = 28;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const left = Math.random() * 100;
    const duration = 12 + Math.random() * 18;
    const delay = Math.random() * 20;
    const size = 2 + Math.random() * 2;

    p.style.left = `${left}%`;
    p.style.bottom = `-10px`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;

    frag.appendChild(p);
  }
  container.appendChild(frag);
}

/* ---------- Navbar background on scroll ---------- */
function initNavbar () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const close = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', close);
  });
}

/* ---------- Active nav link highlighting on scroll ---------- */
function initActiveNavOnScroll () {
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu__link');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------- Typing animation (rotating roles) ---------- */
function initTypingAnimation () {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'HTML Developer',
    'CSS Designer',
    'JavaScript Developer',
    'Python Developer',
    'FastAPI Backend Developer',
    'Django Developer',
    'Flask Developer',
    'REST API Developer',
    'MySQL Database Designer',
    'PostgreSQL Developer',
    'SQLite Specialist',
    'Backend Security Enthusiast',
    'CRUD Systems Developer',
    'IT Solutions Provider'
  ];

  const TYPE_SPEED = 65;       // ms per character while typing
  const DELETE_SPEED = 35;     // ms per character while deleting
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 350;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick () {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        return setTimeout(tick, PAUSE_AFTER_TYPE);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      return setTimeout(tick, PAUSE_AFTER_DELETE);
    }
    return setTimeout(tick, DELETE_SPEED);
  }

  tick();
}

/* ---------- Scroll reveal (fade-up / fade-left / fade-right / zoom-in) ---------- */
function initScrollReveal () {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const skillCategories = document.querySelectorAll('.skill-category');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Animate skill bars once their parent category is in view
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCategories.forEach(cat => skillObserver.observe(cat));
}

/* ---------- Contact form validation ---------- */
function initContactForm () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('formSuccess');

  const fields = [
    {
      input: nameInput,
      errorEl: document.getElementById('nameError'),
      validate: (val) => val.trim().length >= 2,
      message: 'Please enter your name (at least 2 characters).'
    },
    {
      input: emailInput,
      errorEl: document.getElementById('emailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      message: 'Please enter a valid email address.'
    },
    {
      input: messageInput,
      errorEl: document.getElementById('messageError'),
      validate: (val) => val.trim().length >= 10,
      message: 'Your message should be at least 10 characters.'
    }
  ];

  const validateField = (field) => {
    const isValid = field.validate(field.input.value);
    field.input.closest('.form-group').classList.toggle('error', !isValid);
    field.errorEl.textContent = isValid ? '' : field.message;
    return isValid;
  };

  fields.forEach(field => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => {
      if (field.input.closest('.form-group').classList.contains('error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('show');

    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) return;

    // Simulate sending — replace with a real endpoint call when ready.
    successMsg.classList.add('show');
    form.reset();
    fields.forEach(field => field.input.closest('.form-group').classList.remove('error'));

    setTimeout(() => successMsg.classList.remove('show'), 5000);
  });
}

/* ---------- Back to top button ---------- */
function initBackToTop () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Footer year ---------- */
function setFooterYear () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
