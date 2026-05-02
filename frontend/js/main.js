import { request } from './api.js';

const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });

const reveal = document.querySelector('.reveal');
const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) reveal.classList.add('visible'); });
observer.observe(reveal);

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const payload = Object.fromEntries(form.entries());
  const status = document.getElementById('contactStatus');
  try {
    await request('/contact', { method: 'POST', body: JSON.stringify(payload) });
    status.textContent = 'Message sent successfully.';
    e.target.reset();
  } catch (err) { status.textContent = err.message; }
});
