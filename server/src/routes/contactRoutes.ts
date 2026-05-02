import express from 'express';
import {
  submitContact,
  getSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
} from '../controllers/contactController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', submitContact);
router.get('/submissions', protect, authorize('admin'), getSubmissions);
router.get('/:id', protect, authorize('admin'), getSubmission);
router.put('/:id', protect, authorize('admin'), updateSubmission);
router.delete('/:id', protect, authorize('admin'), deleteSubmission);

export default router;
