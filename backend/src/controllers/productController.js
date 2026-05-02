import { query } from '../config/db.js';

export async function listProducts(_req, res) {
  const result = await query('SELECT id, name, description, price, category, image_url FROM products ORDER BY created_at DESC');
  res.json({ products: result.rows });
}

export async function getProduct(req, res) {
  const result = await query('SELECT id, name, description, price, category, image_url FROM products WHERE id = $1', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Product not found' });
  return res.json({ product: result.rows[0] });
}
