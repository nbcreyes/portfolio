import client from './client.js';

const ProjectsAPI = {
  getAll: () => client.get('/projects'),
  getFeatured: () => client.get('/projects/featured'),
  getOne: (id) => client.get(`/projects/${id}`),
  create: (data) => client.post('/projects', data),
  update: (id, data) => client.put(`/projects/${id}`, data),
  delete: (id) => client.delete(`/projects/${id}`),
};

export default ProjectsAPI;