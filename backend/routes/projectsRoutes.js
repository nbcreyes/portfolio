import express from 'express';
import ProjectsController from '../controllers/ProjectsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', ProjectsController.getAll);
router.get('/featured', ProjectsController.getFeatured);
router.get('/:id', ProjectsController.getOne);

// Admin routes
router.post('/', authMiddleware, ProjectsController.create);
router.put('/:id', authMiddleware, ProjectsController.update);
router.delete('/:id', authMiddleware, ProjectsController.delete);

export default router;