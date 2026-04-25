/* Cohli analytics — supplements GA4 Enhanced Measurement with custom events
   for the actions GA4 doesn't catch by default.
   Loaded on every page after the GA4 base snippet, so window.gtag is available.

   Events fired:
   - newsletter_subscribe   →  when AC newsletter form succeeds (homepage + footer)
   - whatsapp_click          →  any wa.me link click (floating button or in-content)
   - email_click             →  any mailto: link click
   - cta_click               →  primary CTA buttons (nav, sticky, hero, footer)
*/
(function() {
  // Bail if gtag isn't loaded — page would break otherwise
  if (typeof window.gtag !== 'function') return;

  var track = function(eventName, params) {
    try {
      window.gtag('event', eventName, params || {});
    } catch (err) {
      // Don't let analytics errors break user experience
      if (window.console && console.warn) console.warn('[analytics]', err);
    }
  };

  // Helper — get current page identifier for event params
  var pageId = function() {
    var path = location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    return path.replace(/^\//, '').replace(/\.html$/, '');
  };

  // ──────── 1. WhatsApp clicks (floating button + any in-content wa.me link) ────────
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (!link) return;
    track('whatsapp_click', {
      page: pageId(),
      link_url: link.href,
      source: link.classList.contains('whatsapp-float') || link.id === 'whatsapp-float-btn'
        ? 'floating-button'
        : 'in-content'
    });
  }, { capture: true });

  // ──────── 2. Email (mailto:) clicks ────────
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var subject = (href.match(/subject=([^&]*)/) || [])[1] || '';
    track('email_click', {
      page: pageId(),
      subject: subject ? decodeURIComponent(subject).slice(0, 100) : '',
      link_text: (link.textContent || '').trim().slice(0, 60)
    });
  }, { capture: true });

  // ──────── 3. CTA button clicks (nav, sticky, hero, footer, in-content primary) ────────
  // We capture this even though they're outbound (Typeform) because GA4's outbound-click
  // event is generic — it doesn't tell us WHICH cta on WHICH page fired.
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.nav-cta, .sticky-cta, .btn-primary, .btn-white, .hero-cta, .hero-facilitator-cta, .hero-role-page-cta, .hero-educator-cta, .region-card');
    if (!link) return;

    // Try to derive the CTA's "name" from class, href, or content
    var classes = (link.className || '').toString();
    var ctaName = '';
    if (classes.indexOf('nav-cta') >= 0) ctaName = 'nav';
    else if (classes.indexOf('sticky-cta') >= 0) ctaName = 'sticky-bar';
    else if (classes.indexOf('hero') >= 0) ctaName = 'hero';
    else if (classes.indexOf('region-card') >= 0) ctaName = 'partner-region';
    else if (classes.indexOf('btn-white') >= 0) ctaName = 'inline-primary';
    else if (classes.indexOf('btn-primary') >= 0) ctaName = 'inline-primary';

    // utm_content from the destination URL gives us the most precise identifier
    var href = link.getAttribute('href') || '';
    var utmContent = (href.match(/utm_content=([^&]*)/) || [])[1] || '';
    var utmCampaign = (href.match(/utm_campaign=([^&]*)/) || [])[1] || '';

    track('cta_click', {
      page: pageId(),
      cta_position: ctaName,
      utm_content: utmContent ? decodeURIComponent(utmContent) : '',
      utm_campaign: utmCampaign ? decodeURIComponent(utmCampaign) : '',
      link_text: (link.textContent || '').trim().slice(0, 60)
    });
  }, { capture: true });

  // ──────── 4. Newsletter subscribe (wrap AC's success callback) ────────
  // AC's _show_thank_you fires when a submission lands successfully.
  // We wrap it so our event runs alongside the existing AC behavior.
  var wrapACSuccess = function() {
    if (typeof window._show_thank_you !== 'function') return false;
    if (window._show_thank_you.__cohliWrapped) return true;
    var original = window._show_thank_you;
    var wrapped = function(id, message, trackcmp_url, email) {
      track('newsletter_subscribe', {
        page: pageId(),
        list_id: id || 3,
        method: 'ac_inline_form'
      });
      return original.apply(this, arguments);
    };
    wrapped.__cohliWrapped = true;
    window._show_thank_you = wrapped;
    return true;
  };
  // Try immediately, and again after a beat in case AC's form JS hasn't initialized yet
  if (!wrapACSuccess()) {
    setTimeout(wrapACSuccess, 500);
    setTimeout(wrapACSuccess, 2000);
  }
})();
