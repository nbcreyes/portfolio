import PostModel from '../models/PostModel.js';

const PostsController = {
  // Public — only published posts
  async getPublished(req, res) {
    try {
      const posts = await PostModel.findPublished();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getLatest(req, res) {
    try {
      const posts = await PostModel.findLatestPublished(3);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getOnePublic(req, res) {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post || post.status !== 'published') {
        return res.status(404).json({ error: 'Post not found.' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Admin — all posts
  async getAll(req, res) {
    try {
      const posts = await PostModel.findAll();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getOne(req, res) {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const post = await PostModel.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      const updated = await PostModel.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      await PostModel.delete(req.params.id);
      res.json({ message: 'Post deleted.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default PostsController;