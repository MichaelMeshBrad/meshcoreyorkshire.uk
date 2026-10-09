const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-navigation');
let previousFocus;
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  menu.inert = !open;
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  document.querySelector('.menu-scrim')?.remove();
  if (open) {
    previousFocus = document.activeElement;
    const scrim = document.createElement('button');
    scrim.className = 'menu-scrim';
    scrim.setAttribute('aria-label', 'Close menu');
    scrim.addEventListener('click', () => setMenu(false));
    menu.after(scrim);
    menu.querySelector('button').focus();
  } else {
    previousFocus?.focus();
  }
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelector('button').addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('hashchange', () => setMenu(false));
window.addEventListener('resize', () => { if (window.innerWidth > 1050) setMenu(false); });
document.addEventListener('keydown', event => {
  if (toggle.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const items = [...menu.querySelectorAll('a, button')];
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('.nav-dropdown a').forEach(link => link.addEventListener('click', () => link.closest('details').removeAttribute('open')));
