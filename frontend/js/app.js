import { API_BASE, request } from './api.js';

const e = React.createElement;

function useCursor() {
  React.useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const handler = (evt) => {
      cursor.style.left = `${evt.clientX}px`;
      cursor.style.top = `${evt.clientY}px`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
}

function Nav({ page, setPage }) {
  return e('header', { className: 'nav glass' },
    e('h1', null, 'Nebula Commerce'),
    e('nav', null,
      ['home', 'products', 'account', 'contact'].map((p) => e('a', {
        href: '#', key: p, onClick: (ev) => { ev.preventDefault(); setPage(p); },
        style: page === p ? { color: 'var(--accent)' } : {}
      }, p[0].toUpperCase() + p.slice(1)))
    )
  );
}

function Home({ setPage }) {
  return e('section', { className: 'hero' },
    e('h2', null, 'Scale your business with premium digital products.'),
    e('p', null, 'Fast checkout, secure accounts, and enterprise-ready architecture.'),
    e('button', { className: 'btn', onClick: () => setPage('products') }, 'Explore Products')
  );
}

function Products() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => { request('/products').then((d) => setProducts(d.products)).catch(console.error); }, []);
  return e('section', { className: 'panel' }, e('h3', null, 'Catalog'), e('div', { className: 'grid' }, products.map((p, i) =>
    e('article', { className: 'card', key: p.id, style: { animationDelay: `${i * 80}ms` } }, e('h4', null, p.name), e('p', null, p.description), e('strong', null, `$${p.price}`))
  )));
}

function Account() {
  const [message, setMessage] = React.useState('');
  const [profile, setProfile] = React.useState('');

  const onRegister = async (ev) => {
    ev.preventDefault();
    const payload = Object.fromEntries(new FormData(ev.currentTarget).entries());
    try { await request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }); setMessage('Registered successfully.'); }
    catch (err) { setMessage(err.message); }
  };

  const onLogin = async (ev) => {
    ev.preventDefault();
    const payload = Object.fromEntries(new FormData(ev.currentTarget).entries());
    try {
      const { token } = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
      const me = await fetch(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json());
      setProfile(JSON.stringify(me, null, 2));
      setMessage('Logged in.');
    } catch (err) { setMessage(err.message); }
  };

  return e('section', { className: 'grid two' },
    e('form', { className: 'panel', onSubmit: onRegister }, e('h3', null, 'Register'),
      e('input', { name: 'name', placeholder: 'Name', required: true }),
      e('input', { name: 'email', type: 'email', placeholder: 'Email', required: true }),
      e('input', { name: 'password', type: 'password', placeholder: 'Password (8+)', required: true }),
      e('button', { className: 'btn', type: 'submit' }, 'Create account')),
    e('form', { className: 'panel', onSubmit: onLogin }, e('h3', null, 'Login'),
      e('input', { name: 'email', type: 'email', placeholder: 'Email', required: true }),
      e('input', { name: 'password', type: 'password', placeholder: 'Password', required: true }),
      e('button', { className: 'btn', type: 'submit' }, 'Login'),
      e('p', null, message), e('pre', null, profile))
  );
}

function Contact() {
  const [status, setStatus] = React.useState('');
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = Object.fromEntries(new FormData(ev.currentTarget).entries());
    try { await request('/contact', { method: 'POST', body: JSON.stringify(payload) }); setStatus('Message sent.'); ev.currentTarget.reset(); }
    catch (err) { setStatus(err.message); }
  };
  return e('section', { className: 'panel glass reveal visible' }, e('h3', null, 'Contact Sales'),
    e('form', { onSubmit },
      e('input', { name: 'name', placeholder: 'Name', required: true }),
      e('input', { name: 'email', type: 'email', placeholder: 'Email', required: true }),
      e('textarea', { name: 'message', placeholder: 'Message', required: true }),
      e('button', { className: 'btn', type: 'submit' }, 'Send')
    ), e('p', null, status));
}

function App() {
  useCursor();
  const [page, setPage] = React.useState('home');
  return e(React.Fragment, null,
    e('div', { className: 'cursor' }),
    e(Nav, { page, setPage }),
    e('main', null,
      page === 'home' && e(Home, { setPage }),
      page === 'products' && e(Products),
      page === 'account' && e(Account),
      page === 'contact' && e(Contact)
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));
