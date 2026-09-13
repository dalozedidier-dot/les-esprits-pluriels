(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');
  const destination = 'contact@les-esprits-pluriels.be';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = form.elements.message.value.trim();
    if (!message) {
      status.textContent = 'Ajoutez votre message avant de continuer.';
      form.elements.message.focus();
      return;
    }

    const type = form.elements.type.value || 'Message';
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const page = form.elements.page.value.trim();

    const lines = [];
    if (name) lines.push(`Nom ou prénom : ${name}`);
    if (email) lines.push(`Adresse de réponse : ${email}`);
    if (page) lines.push(`Page concernée : ${page}`);
    if (lines.length) lines.push('');
    lines.push(message);

    const subject = `[Les Esprits Pluriels] ${type}`;
    const mailto = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    status.textContent = 'Ouverture de votre messagerie avec le message prérempli.';
    window.location.href = mailto;
  });
})();
