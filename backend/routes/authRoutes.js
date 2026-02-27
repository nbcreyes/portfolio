import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/setup', AuthController.setup);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);

export default router;