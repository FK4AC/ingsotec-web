document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', () => header.classList.toggle('is-open'));
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.classList.remove('form-status--ok', 'form-status--error');
      }

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Error desconocido');

        form.reset();
        if (statusEl) {
          statusEl.textContent = 'Mensaje enviado. Te responderemos pronto.';
          statusEl.classList.add('form-status--ok');
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbenos a contacto@ingsotec.co.';
          statusEl.classList.add('form-status--error');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
      }
    });
  }

  const caseSelect = document.getElementById('case-select');
  if (caseSelect) {
    const cases = document.querySelectorAll('.case-study');
    const showCase = (value) => {
      cases.forEach((el) => {
        el.style.display = el.dataset.case === value ? '' : 'none';
      });
    };

    const requested = new URLSearchParams(window.location.search).get('empresa');
    if (requested && caseSelect.querySelector(`option[value="${requested}"]`)) {
      caseSelect.value = requested;
    }

    showCase(caseSelect.value);
    caseSelect.addEventListener('change', () => showCase(caseSelect.value));
  }

  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    document.addEventListener('click', (e) => {
      if (dropdown.open && !dropdown.contains(e.target)) {
        dropdown.open = false;
      }
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      observer.observe(el);
    });
  }
});