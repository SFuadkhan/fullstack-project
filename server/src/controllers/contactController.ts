import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { AuthRequest } from '../middleware/auth';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Please provide name, email, and message' });
      return;
    }

    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'No subject',
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      submissionId: contact._id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Error submitting contact form' });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact/submissions
// @access  Private/Admin
export const getSubmissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const submissions = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      submissions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSubmissions: total,
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Error fetching contact submissions' });
  }
};

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ error: 'Contact submission not found' });
      return;
    }

    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ error: 'Error fetching contact submission' });
  }
};

// @desc    Update contact submission status
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    if (!status || !['new', 'read', 'replied', 'archived'].includes(status)) {
      res.status(400).json({ error: 'Invalid status value' });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404).json({ error: 'Contact submission not found' });
      return;
    }

    res.json(contact);
  } catch (error) {
    console.error('Update submission error:', error);
    res.status(500).json({ error: 'Error updating contact submission' });
  }
};

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ error: 'Contact submission not found' });
      return;
    }

    await contact.deleteOne();

    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ error: 'Error deleting contact submission' });
  }
};
