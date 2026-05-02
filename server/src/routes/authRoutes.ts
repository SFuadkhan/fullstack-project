import express from 'express';
import { signup, signin, getMe, logout } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
