document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', () => header.classList.toggle('is-open'));
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const correo = form.correo.value.trim();
      const mensaje = form.mensaje.value.trim();
      const asunto = encodeURIComponent(`Contacto web — ${nombre || 'Nuevo mensaje'}`);
      const cuerpo = encodeURIComponent(`${mensaje}\n\n— ${nombre} (${correo})`);
      window.location.href = `mailto:contacto@ingsotec.co?subject=${asunto}&body=${cuerpo}`;
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
    showCase(caseSelect.value);
    caseSelect.addEventListener('change', () => showCase(caseSelect.value));
  }

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