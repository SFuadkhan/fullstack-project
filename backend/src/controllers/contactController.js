import { validationResult } from 'express-validator';
import { query } from '../config/db.js';

export async function submitContact(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;
  await query('INSERT INTO contact_submissions(name, email, message) VALUES ($1, $2, $3)', [name, email, message]);

  return res.status(201).json({ status: 'received' });
}
