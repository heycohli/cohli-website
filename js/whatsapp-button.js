/* ═══════════════════════════════════════════════════════════
   Cohli WhatsApp floating button
   Injects a branded chat bubble on every page. Opens WhatsApp
   with Lauren's number + a pre-filled greeting.

   Config: update WHATSAPP_NUMBER + GREETING below.
   Number format: country code + number, digits only, no + or spaces.
   ═══════════════════════════════════════════════════════════ */
(function () {
  var WHATSAPP_NUMBER = '34613061673';
  var GREETING = "Hi Lauren, I'm on cohli.com and I'd like to ask...";

  // Build wa.me URL with URL-encoded message
  var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(GREETING);

  // Inject CSS (scoped to .cohli-wa-btn to avoid collisions)
  var css = '' +
    '.cohli-wa-btn{position:fixed;right:20px;bottom:20px;width:56px;height:56px;' +
    'background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 4px 16px rgba(67,49,40,.22);z-index:9999;text-decoration:none;' +
    'transition:transform .18s ease, box-shadow .18s ease;}' +
    '.cohli-wa-btn:hover{transform:translateY(-2px) scale(1.05);' +
    'box-shadow:0 8px 24px rgba(67,49,40,.28);}' +
    '.cohli-wa-btn svg{width:30px;height:30px;fill:#fff;}' +
    '@media (max-width:768px){.cohli-wa-btn{right:16px;bottom:16px;width:52px;height:52px;}' +
    '.cohli-wa-btn svg{width:26px;height:26px;}}' +
    '@media print{.cohli-wa-btn{display:none;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Build button
  var a = document.createElement('a');
  a.className = 'cohli-wa-btn';
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Chat with Lauren on WhatsApp');
  a.setAttribute('title', 'Chat with Lauren on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.47 0 .15 5.3.15 11.84c0 2.08.55 4.11 1.6 5.9L0 24l6.4-1.67a11.9 11.9 0 0 0 5.64 1.44h.01c6.57 0 11.9-5.3 11.9-11.84 0-3.16-1.24-6.14-3.43-8.45Zm-8.48 18.2h-.01a9.9 9.9 0 0 1-5.02-1.37l-.36-.21-3.72.97.99-3.62-.24-.37a9.84 9.84 0 0 1-1.52-5.24c0-5.44 4.44-9.87 9.9-9.87a9.8 9.8 0 0 1 6.99 2.9 9.78 9.78 0 0 1 2.9 6.97c0 5.44-4.44 9.84-9.9 9.84Zm5.42-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.08a8.1 8.1 0 0 1-2.4-1.48 9.06 9.06 0 0 1-1.66-2.07c-.18-.3-.02-.46.13-.62.14-.14.3-.36.45-.55.15-.2.2-.34.3-.54.1-.2.05-.38-.02-.54-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.22 5.1 4.52.7.3 1.26.48 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/>' +
    '</svg>';

  // Inject when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(a);
    });
  } else {
    document.body.appendChild(a);
  }
})();
