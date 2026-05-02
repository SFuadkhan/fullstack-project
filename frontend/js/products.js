import { request } from './api.js';
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
const root = document.getElementById('products');
const { products } = await request('/products');
root.innerHTML = products.map((p, i) => `<article class="card" style="animation-delay:${i * 80}ms"><h3>${p.name}</h3><p>${p.description}</p><strong>$${p.price}</strong></article>`).join('');
