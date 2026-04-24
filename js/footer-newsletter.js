/* Cohli footer newsletter — injected on every non-homepage page.
   Finds <div id="footer-newsletter"></div> and injects the AC form + submission logic.
   Safe to include on the homepage too — it no-ops if the mount point isn't present. */
(function() {
  var mount = document.getElementById('footer-newsletter');
  if (!mount) return;

  // Inject styles directly (don't rely on base.css — avoids CDN cache issues)
  if (!document.getElementById('footer-newsletter-styles')) {
    var style = document.createElement('style');
    style.id = 'footer-newsletter-styles';
    style.textContent = [
      '.footer-newsletter-section { background: linear-gradient(135deg, rgba(210,169,96,.08) 0%, rgba(180,107,82,.06) 100%); padding: 64px 24px; border-top: 1px solid var(--clay); }',
      '.footer-newsletter-inner { max-width: 620px; margin: 0 auto; text-align: center; }',
      '.footer-newsletter-label { font-size: .75rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; color: var(--terracotta); margin-bottom: 8px; }',
      '.footer-newsletter-title { font-family: var(--font-headline); font-size: 1.6rem; font-weight: 900; color: var(--dark); margin-bottom: 12px; line-height: 1.25; }',
      '.footer-newsletter-desc { font-size: .95rem; color: var(--stone); line-height: 1.6; margin-bottom: 20px; }',
      '.footer-newsletter-tiny { font-size: .75rem; color: var(--driftwood); margin-top: 12px; }',
      '.footer-newsletter-inner .newsletter-ac-wrap { margin-top: 8px; }',
      '.footer-newsletter-inner .newsletter-ac-wrap form, .footer-newsletter-inner .newsletter-ac-wrap ._form, .footer-newsletter-inner .newsletter-ac-wrap ._form_3 { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; max-width: none !important; width: 100% !important; color: var(--dark) !important; font-family: var(--font-body) !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap label, .footer-newsletter-inner .newsletter-ac-wrap ._form-label, .footer-newsletter-inner .newsletter-ac-wrap .field-required, .footer-newsletter-inner .newsletter-ac-wrap ._form-branding, .footer-newsletter-inner .newsletter-ac-wrap ._form-title, .footer-newsletter-inner .newsletter-ac-wrap ._form-subtitle { display: none !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._form-content { display: flex !important; gap: 12px !important; flex-wrap: wrap !important; justify-content: center !important; align-items: center !important; margin: 0 !important; padding: 0 !important; width: 100%; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._form_element { flex: 1 1 260px !important; min-width: 240px !important; max-width: 360px !important; margin: 0 !important; padding: 0 !important; width: auto !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._field-wrapper { margin: 0 !important; padding: 0 !important; width: 100% !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap input[type="text"], .footer-newsletter-inner .newsletter-ac-wrap input[type="email"], .footer-newsletter-inner .newsletter-ac-wrap input#email { width: 100% !important; padding: 14px 20px !important; border: 1.5px solid var(--driftwood) !important; border-radius: var(--radius-pill) !important; font-family: var(--font-body) !important; font-size: .95rem !important; background: white !important; color: var(--dark) !important; outline: none !important; transition: var(--ease) !important; box-shadow: none !important; height: auto !important; line-height: 1.4 !important; box-sizing: border-box !important; margin: 0 !important; text-align: left !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap input:focus { border-color: var(--terracotta) !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._button-wrapper { flex: 0 0 auto !important; margin: 0 !important; padding: 0 !important; width: auto !important; position: static !important; top: auto !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap button, .footer-newsletter-inner .newsletter-ac-wrap button._submit, .footer-newsletter-inner .newsletter-ac-wrap #_form_3_submit { background: var(--terracotta) !important; color: white !important; padding: 14px 28px !important; border: none !important; border-radius: var(--radius-pill) !important; font-size: .95rem !important; font-weight: 600 !important; font-family: var(--font-body) !important; cursor: pointer !important; transition: var(--ease) !important; width: auto !important; height: auto !important; line-height: 1 !important; box-shadow: none !important; text-transform: none !important; letter-spacing: 0 !important; margin: 0 !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap button:hover { background: var(--ember) !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._form-thank-you { font-family: var(--font-headline) !important; font-size: 1.2rem !important; color: var(--terracotta) !important; padding: 20px 0 !important; text-align: center !important; background: transparent !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._error, .footer-newsletter-inner .newsletter-ac-wrap ._error-inner { font-size: .85rem !important; color: var(--terracotta) !important; margin-top: 6px !important; background: transparent !important; border: none !important; padding: 0 !important; position: static !important; }',
      '.footer-newsletter-inner .newsletter-ac-wrap ._clear-element { display: none !important; }',
      '@media (max-width: 540px) {',
      '  .footer-newsletter-inner .newsletter-ac-wrap ._form-content { flex-direction: column !important; align-items: stretch !important; }',
      '  .footer-newsletter-inner .newsletter-ac-wrap ._form_element, .footer-newsletter-inner .newsletter-ac-wrap ._button-wrapper { width: 100% !important; max-width: none !important; flex: 1 1 100% !important; }',
      '  .footer-newsletter-inner .newsletter-ac-wrap button { width: 100% !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // Inject the newsletter HTML
  mount.innerHTML = [
    '<div class="footer-newsletter-inner">',
    '  <div class="footer-newsletter-label">The Village Post</div>',
    '  <h3 class="footer-newsletter-title">A letter from us, every other week</h3>',
    '  <p class="footer-newsletter-desc">What we\'re learning about each cohort, worldschooling, and what it really looks like when families choose differently. Written by us and sent to you.</p>',
    '  <div class="newsletter-ac-wrap">',
    '    <form method="POST" action="https://nomadnest.activehosted.com/proc.php" id="_form_3_" class="_form _form_3 _inline-form _inline-style _dark" novalidate data-styles-version="5">',
    '      <input type="hidden" name="u" value="3" />',
    '      <input type="hidden" name="f" value="3" />',
    '      <input type="hidden" name="s" />',
    '      <input type="hidden" name="c" value="0" />',
    '      <input type="hidden" name="m" value="0" />',
    '      <input type="hidden" name="act" value="sub" />',
    '      <input type="hidden" name="v" value="2" />',
    '      <input type="hidden" name="or" value="b5f41ae2-9847-49c2-bb00-7afb11c4fdfb" />',
    '      <div class="_form-content">',
    '        <div class="_form_element _x41618322 _inline-style">',
    '          <label for="email" class="_form-label">Email</label>',
    '          <div class="_field-wrapper">',
    '            <input type="email" id="email" name="email" placeholder="Your email address" required/>',
    '          </div>',
    '        </div>',
    '        <div class="_button-wrapper _inline-style">',
    '          <button id="_form_3_submit" class="_submit" type="submit">Subscribe</button>',
    '        </div>',
    '        <div class="_clear-element"></div>',
    '      </div>',
    '      <div class="_form-thank-you" style="display:none;"></div>',
    '    </form>',
    '  </div>',
    '  <p class="footer-newsletter-tiny">Join 1,500+ families. Unsubscribe anytime.</p>',
    '</div>'
  ].join('\n');

  // AC submission logic (same as homepage — keyed to form id _form_3_)
  window.cfields = window.cfields || [];
  window._show_thank_you = function(id, message, trackcmp_url, email) {
    var form = document.getElementById('_form_' + id + '_');
    if (!form) return;
    var thank_you = form.querySelector('._form-thank-you');
    form.querySelector('._form-content').style.display = 'none';
    thank_you.innerHTML = message || 'Thank you. Look for our first Village Post soon.';
    thank_you.style.display = 'block';
    if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) { _load_script(trackcmp_url); }
    thank_you.setAttribute('tabindex', '-1'); thank_you.focus();
  };
  window._show_error = function(id, message) {
    var form = document.getElementById('_form_' + id + '_');
    if (!form) return;
    var err = document.createElement('div'),
        button = form.querySelector('button[type="submit"]'),
        old_error = form.querySelector('._form_error');
    if (old_error) old_error.parentNode.removeChild(old_error);
    err.innerHTML = message;
    err.className = '_error-inner _form_error _no_arrow';
    var wrapper = document.createElement('div');
    wrapper.className = '_form-inner _show_be_error';
    wrapper.appendChild(err);
    button.parentNode.insertBefore(wrapper, button);
    button.disabled = false; button.classList.remove('processing');
  };
  window._load_script = function(url, callback, isSubmit) {
    var head = document.querySelector('head'), script = document.createElement('script'), r = false;
    var submitButton = document.querySelector('#_form_3_submit');
    script.charset = 'utf-8'; script.src = url;
    if (callback) {
      script.onload = script.onreadystatechange = function() {
        if (!r && (!this.readyState || this.readyState == 'complete')) { r = true; callback(); }
      };
    }
    script.onerror = function() {
      if (isSubmit) {
        _show_error('3', 'Sorry, your submission failed. Please try again.');
        submitButton.disabled = false; submitButton.classList.remove('processing');
      }
    };
    head.appendChild(script);
  };

  // Attach submission handler
  var form_to_submit = document.getElementById('_form_3_');
  if (!form_to_submit) return;

  var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;
  var addEvent = function(element, event, func) {
    if (element.addEventListener) { element.addEventListener(event, func); }
  };
  var remove_tooltips = function() { for (var i = 0; i < tooltips.length; i++) { tooltips[i].tip.parentNode.removeChild(tooltips[i].tip); } tooltips = []; };
  var remove_tooltip = function(elem) { for (var i = 0; i < tooltips.length; i++) { if (tooltips[i].elem === elem) { tooltips[i].tip.parentNode.removeChild(tooltips[i].tip); tooltips.splice(i, 1); return; } } };
  var create_tooltip = function(elem, text) {
    var tooltip = document.createElement('div'), inner = document.createElement('div'), new_tooltip = {};
    tooltip.className = '_error'; inner.className = '_error-inner'; inner.innerHTML = text;
    tooltip.appendChild(inner); elem.parentNode.appendChild(tooltip);
    new_tooltip.tip = tooltip; new_tooltip.elem = elem; tooltips.push(new_tooltip); return new_tooltip;
  };
  var validate_field = function(elem, remove) {
    var value = elem.value, no_error = true;
    remove ? remove_tooltip(elem) : false;
    elem.className = elem.className.replace(/ ?_has_error ?/g, '');
    if (elem.getAttribute('required') !== null && (value === undefined || value === null || value === '')) {
      elem.className = elem.className + ' _has_error'; no_error = false;
      create_tooltip(elem, 'This field is required.');
    }
    if (no_error && elem.name == 'email') {
      if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
        elem.className = elem.className + ' _has_error'; no_error = false;
        create_tooltip(elem, 'Enter a valid email address.');
      }
    }
    return no_error;
  };
  var validate_form = function(e) {
    var no_error = true;
    if (!submitted) {
      submitted = true;
      for (var i = 0; i < allInputs.length; i++) {
        var input = allInputs[i];
        if (input.getAttribute('required') !== null || (input.name === 'email' && input.value !== '')) {
          if (input.type == 'text' || input.type == 'email') {
            addEvent(input, 'blur', function() { this.value = this.value.trim(); validate_field(this, true); });
            addEvent(input, 'input', function() { validate_field(this, true); });
          }
        }
      }
    }
    remove_tooltips();
    for (var i = 0; i < allInputs.length; i++) {
      var elem = allInputs[i];
      if (elem.getAttribute('required') !== null || (elem.name === 'email' && elem.value !== '')) {
        if (elem.tagName.toLowerCase() !== 'select') elem.value = elem.value.trim();
        validate_field(elem) ? true : no_error = false;
      }
    }
    if (!no_error && e) e.preventDefault();
    return no_error;
  };
  var _form_serialize = function(form) {
    if (!form || form.nodeName !== 'FORM') return;
    var q = [];
    for (var i = 0; i < form.elements.length; i++) {
      if (form.elements[i].name === '') continue;
      if (form.elements[i].nodeName === 'INPUT') {
        var t = form.elements[i].type;
        if (t === 'text' || t === 'email' || t === 'hidden' || t === 'number' || t === 'date' || t === 'time' || t === 'password') {
          q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value));
        }
      }
    }
    return q.join('&');
  };
  var form_submit = function(e) {
    e.preventDefault();
    if (validate_form()) {
      var submitButton = e.target.querySelector('#_form_3_submit');
      submitButton.disabled = true; submitButton.classList.add('processing');
      var serialized = _form_serialize(form_to_submit).replace(/%0A/g, '\\n');
      var err = form_to_submit.querySelector('._form_error'); if (err) err.parentNode.removeChild(err);
      _load_script('https://nomadnest.activehosted.com/proc.php?' + serialized + '&jsonp=true', null, true);
    }
    return false;
  };
  addEvent(form_to_submit, 'submit', form_submit);
})();
