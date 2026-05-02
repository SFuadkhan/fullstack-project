import { Router } from 'express';
import { body } from 'express-validator';
import { submitContact } from '../controllers/contactController.js';

const router = Router();
router.post('/', [body('name').isLength({ min: 2 }), body('email').isEmail(), body('message').isLength({ min: 10 })], submitContact);

export default router;
