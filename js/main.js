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
});