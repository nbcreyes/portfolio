import express from 'express';
import ContactController from '../controllers/ContactController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public — visitor sends message
router.post('/', ContactController.send);

// Admin — manage messages
router.get('/', authMiddleware, ContactController.getAll);
router.put('/:id/read', authMiddleware, ContactController.markRead);
router.delete('/:id', authMiddleware, ContactController.delete);

export default router;