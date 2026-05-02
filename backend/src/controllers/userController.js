import { query } from '../config/db.js';

export async function me(req, res) {
  const result = await query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.sub]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: result.rows[0] });
}
