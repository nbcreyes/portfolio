import express from 'express';
import PostsController from '../controllers/PostsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/published', PostsController.getPublished);
router.get('/latest', PostsController.getLatest);
router.get('/public/:id', PostsController.getOnePublic);

// Admin routes
router.get('/', authMiddleware, PostsController.getAll);
router.get('/:id', authMiddleware, PostsController.getOne);
router.post('/', authMiddleware, PostsController.create);
router.put('/:id', authMiddleware, PostsController.update);
router.delete('/:id', authMiddleware, PostsController.delete);

export default router;