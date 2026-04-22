/*
 * Cohli lightbox - v1.0
 * Zero dependencies. Click any .gallery img or img[data-lightbox] to open.
 * Keyboard: Esc closes, left/right navigate.
 */
(function () {
  'use strict';

  function init() {
    var imgs = Array.prototype.slice.call(
      document.querySelectorAll('.gallery img, img[data-lightbox]')
    );
    if (!imgs.length) return;

    // Build overlay once
    var overlay = document.createElement('div');
    overlay.className = 'cohli-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="cl-close" aria-label="Close">&times;</button>' +
      '<button class="cl-prev" aria-label="Previous photo">&#8249;</button>' +
      '<div class="cl-stage"><img class="cl-img" alt="" />' +
      '<div class="cl-caption"></div></div>' +
      '<button class="cl-next" aria-label="Next photo">&#8250;</button>' +
      '<div class="cl-counter"></div>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.cl-img');
    var capEl = overlay.querySelector('.cl-caption');
    var counterEl = overlay.querySelector('.cl-counter');
    var current = 0;

    function show(i) {
      current = (i + imgs.length) % imgs.length;
      var src = imgs[current];
      imgEl.src = src.src;
      imgEl.alt = src.alt || '';
      var parent = src.closest('.gallery-item');
      var caption = (parent && parent.getAttribute('data-caption')) || src.alt || '';
      capEl.textContent = caption;
      counterEl.textContent = (current + 1) + ' / ' + imgs.length;
    }
    function open(i) {
      show(i);
      overlay.classList.add('cl-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('cl-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    imgs.forEach(function (img, i) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { open(i); });
    });

    overlay.querySelector('.cl-close').addEventListener('click', close);
    overlay.querySelector('.cl-prev').addEventListener('click', function () { show(current - 1); });
    overlay.querySelector('.cl-next').addEventListener('click', function () { show(current + 1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('cl-stage')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('cl-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
