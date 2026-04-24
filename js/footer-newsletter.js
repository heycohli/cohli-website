/* Cohli footer newsletter — injected on every non-homepage page.
   Finds <div id="footer-newsletter"></div> and injects the AC form + submission logic.
   Safe to include on the homepage too — it no-ops if the mount point isn't present. */
(function() {
  var mount = document.getElementById('footer-newsletter');
  if (!mount) return;

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
