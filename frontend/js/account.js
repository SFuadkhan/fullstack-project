import { request, API_BASE } from './api.js';
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(registerForm).entries());
  try { await request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }); document.getElementById('registerStatus').textContent = 'Registered.'; } catch (err) { document.getElementById('registerStatus').textContent = err.message; }
});
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(loginForm).entries());
  try {
    const { token } = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    localStorage.setItem('token', token);
    const me = await fetch(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
    document.getElementById('profile').textContent = JSON.stringify(me, null, 2);
    document.getElementById('loginStatus').textContent = 'Logged in.';
  } catch (err) { document.getElementById('loginStatus').textContent = err.message; }
});
