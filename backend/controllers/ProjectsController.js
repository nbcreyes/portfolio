import ProjectModel from '../models/ProjectModel.js';

const ProjectsController = {
  // Public
  async getAll(req, res) {
    try {
      const projects = await ProjectModel.findAll();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getFeatured(req, res) {
    try {
      const projects = await ProjectModel.findFeatured();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getOne(req, res) {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Admin
  async create(req, res) {
    try {
      const project = await ProjectModel.create(req.body);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      const updated = await ProjectModel.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      await ProjectModel.delete(req.params.id);
      res.json({ message: 'Project deleted.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ProjectsController;