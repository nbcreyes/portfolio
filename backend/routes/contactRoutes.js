import express from 'express';
import ContactController from '../controllers/ContactController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public
router.post('/', ContactController.send);

// Admin
router.get('/', authMiddleware, ContactController.getAll);
router.put('/:id/read', authMiddleware, ContactController.markRead);
router.post('/:id/reply', authMiddleware, ContactController.reply);
router.delete('/:id', authMiddleware, ContactController.delete);

export default router;