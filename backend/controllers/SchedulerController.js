import cron from 'node-cron';
import PostModel from '../models/PostModel.js';

export const startScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const duePosts = await PostModel.findScheduled();
      for (const post of duePosts) {
        await PostModel.publish(post.id);
        console.log(`Auto-published: "${post.title}"`);
      }
    } catch (err) {
      console.error('Scheduler error:', err.message);
    }
  });

  console.log('Scheduler running — checks every minute for scheduled posts.');
};