(function () {
  'use strict';

  const modal = document.getElementById('lead-modal');
  const form = document.getElementById('lead-form');
  const secondPageUrl = 'watch.html'; // Lead to second page after capture

  if (!modal || !form) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = form.querySelector('input');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (el) {
    el.addEventListener('click', openModal);
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameEl = form.querySelector('#lead-name');
    var emailEl = form.querySelector('#lead-email');
    var name = nameEl && nameEl.value ? nameEl.value.trim() : '';
    var email = emailEl && emailEl.value ? emailEl.value.trim() : '';
    if (!name || !email) {
      if (!name) nameEl && nameEl.focus();
      else if (!email) emailEl && emailEl.focus();
      return;
    }
    // Optional: send to your backend or save in localStorage
    try {
      localStorage.setItem('webinar_lead', JSON.stringify({
        name: name,
        email: email,
        phone: (form.querySelector('#lead-phone') || {}).value || '',
        at: new Date().toISOString()
      }));
    } catch (err) {}
    closeModal();
    window.location.href = secondPageUrl;
  });

  // Accordion
  document.querySelectorAll('[data-accordion]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  });
})();
