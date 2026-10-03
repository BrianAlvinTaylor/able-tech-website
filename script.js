const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((node) => observer.observe(node));
} else {
  reveals.forEach((node) => node.classList.add('visible'));
}

// Reveal the contact address only when the visitor requests it.
document.querySelectorAll('[data-email-reveal]').forEach((button, index) => {
  const result = button.parentElement.querySelector('.email-result');
  result.id = `email-result-${index}`;
  button.setAttribute('aria-controls', result.id);
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') return;
    const address = ['support', 'abletech9g.com'].join('@');
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = `mailto:${address}?subject=${encodeURIComponent(button.dataset.subject || 'ABLE Tech support')}`;
    link.textContent = address;
    result.append(link);
    result.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.textContent = 'Email address shown';
  });
});
