import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export async function registerUser({ name, email, password }) {
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rowCount > 0) {
    throw new Error('Email already registered');
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await query(
    'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, hash]
  );

  return result.rows[0];
}

export async function loginUser({ email, password }) {
  const result = await query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
  if (result.rowCount === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return { token, user: { id: user.id, name: user.name, email: user.email } };
}
