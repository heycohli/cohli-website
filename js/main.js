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

// ============================================
// LIGHTBOX — click any gallery/accommodation image to view full-screen
// Supports captions via data-caption attribute
// Navigate with arrows, keyboard, swipe, or click outside to close
// ============================================
(function() {
  // Create lightbox DOM
  const lbOverlay = document.createElement('div');
  lbOverlay.className = 'lightbox-overlay';
  lbOverlay.innerHTML = `
    <button class="lb-close" aria-label="Close">&times;</button>
    <button class="lb-prev" aria-label="Previous">&lsaquo;</button>
    <button class="lb-next" aria-label="Next">&rsaquo;</button>
    <div class="lb-content">
      <img class="lb-img" src="" alt="">
      <div class="lb-caption"></div>
      <div class="lb-counter"></div>
    </div>
  `;
  document.body.appendChild(lbOverlay);

  const lbImg = lbOverlay.querySelector('.lb-img');
  const lbCaption = lbOverlay.querySelector('.lb-caption');
  const lbCounter = lbOverlay.querySelector('.lb-counter');
  let currentSet = [];
  let currentIdx = 0;

  function openLightbox(set, idx) {
    currentSet = set;
    currentIdx = idx;
    showSlide();
    lbOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lbOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showSlide() {
    const item = currentSet[currentIdx];
    lbImg.src = item.src;
    lbImg.alt = item.alt || '';
    lbCaption.textContent = item.caption || '';
    lbCaption.style.display = item.caption ? '' : 'none';
    lbCounter.textContent = currentSet.length > 1 ? `${currentIdx + 1} / ${currentSet.length}` : '';
    // Show/hide arrows
    lbOverlay.querySelector('.lb-prev').style.display = currentSet.length > 1 ? '' : 'none';
    lbOverlay.querySelector('.lb-next').style.display = currentSet.length > 1 ? '' : 'none';
  }

  function nextSlide() { currentIdx = (currentIdx + 1) % currentSet.length; showSlide(); }
  function prevSlide() { currentIdx = (currentIdx - 1 + currentSet.length) % currentSet.length; showSlide(); }

  // Event listeners
  lbOverlay.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lbOverlay.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
  lbOverlay.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
  lbOverlay.addEventListener('click', (e) => { if (e.target === lbOverlay) closeLightbox(); });

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (!lbOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Touch swipe support
  let touchStartX = 0;
  lbOverlay.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lbOverlay.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff > 0 ? prevSlide() : nextSlide(); }
  }, { passive: true });

  // Attach to all gallery groups — finds .gallery containers and treats each as a set
  function initLightboxes() {
    // Gallery sections
    document.querySelectorAll('.gallery').forEach(gallery => {
      const imgs = gallery.querySelectorAll('img');
      imgs.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          const set = Array.from(imgs).map(im => ({
            src: im.src,
            alt: im.alt,
            caption: im.closest('[data-caption]')?.dataset.caption || im.alt || ''
          }));
          openLightbox(set, i);
        });
      });
    });

    // Accommodation images (pricing sections with images)
    document.querySelectorAll('.accom-gallery').forEach(gallery => {
      const imgs = gallery.querySelectorAll('img');
      imgs.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          const set = Array.from(imgs).map(im => ({
            src: im.src,
            alt: im.alt,
            caption: im.closest('[data-caption]')?.dataset.caption || im.alt || ''
          }));
          openLightbox(set, i);
        });
      });
    });

    // Any standalone clickable images with .lightbox-trigger
    document.querySelectorAll('.lightbox-trigger img, img.lightbox-trigger').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        openLightbox([{
          src: img.src,
          alt: img.alt,
          caption: img.closest('[data-caption]')?.dataset.caption || img.alt || ''
        }], 0);
      });
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightboxes);
  } else {
    initLightboxes();
  }
})();

// Trust bar animation
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
