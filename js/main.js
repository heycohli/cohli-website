/* ============================================
   COHLI SHARED JAVASCRIPT
   Nav scroll, mobile menu, animations, FAQ
   ============================================ */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Scroll-triggered fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

// Count-up animation for trust bar numbers
function animateCount(el, target, suffix = '') {
  const isDecimal = target % 1 !== 0;
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
  }
  requestAnimationFrame(update);
}

const trustBar = document.querySelector('.trust-bar');
if (trustBar) {
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        entry.target.querySelectorAll('.trust-number').forEach(n => {
          const text = n.textContent.trim();
          const match = text.match(/^([\d.]+)(.*)$/);
          if (match) {
            const num = parseFloat(match[1]);
            const suffix = match[2] || '';
            animateCount(n, num, suffix);
          }
        });
      }
    });
  }, { threshold: 0.5 });
  trustObserver.observe(trustBar);
}
