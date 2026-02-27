import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { startScheduler } from './controllers/SchedulerController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running.' });
});

startScheduler();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});