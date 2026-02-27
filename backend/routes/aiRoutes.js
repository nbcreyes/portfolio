import express from 'express';
import AIController from '../controllers/AIController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', authMiddleware, AIController.generateDraft);

export default router;