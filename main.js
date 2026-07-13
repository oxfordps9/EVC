// ============================================================
// The Excellence Visa Consultancy & Global Education — shared JS
// ============================================================

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const openIcon = document.getElementById('menuIconOpen');
  const closeIcon = document.getElementById('menuIconClose');
  const btn = document.querySelector('[aria-controls="mobileMenu"]');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (openIcon && closeIcon) {
    openIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
  }
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Close mobile menu automatically when a nav link inside it is tapped
function initMobileMenuAutoClose() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('open')) toggleMobileMenu();
    });
  });
}

// Scroll reveal for elements marked .reveal
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

// Animated stat counters (elements with data-count attribute)
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = current + suffix;
          requestAnimationFrame(tick);
        }
      };
      tick();
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => io.observe(el));
}

// Accordion (FAQ, checklists)
function initAccordions() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// Gallery filter buttons (data-filter) toggling .gallery-item[data-cat]
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.gallery-item').forEach(item => {
        const cat = item.getAttribute('data-cat');
        item.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
      });
    });
  });
}

// Contact / assessment form submit
function handleFormSubmit(event) {
  event.preventDefault();
  const box = document.getElementById('formSuccess');
  if (box) {
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert("Profile Data Successfully Registered! The processing command desk at Altaf Excellence School will review your eligibility parameters and initiate contact via WhatsApp shortly.");
  }
  event.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initAccordions();
  initGalleryFilter();
  initMobileMenuAutoClose();
});
