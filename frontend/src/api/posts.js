import client from './client.js';

const PostsAPI = {
  getPublished: () => client.get('/posts/published'),
  getLatest: () => client.get('/posts/latest'),
  getPublicOne: (id) => client.get(`/posts/public/${id}`),
  getAll: () => client.get('/posts'),
  getOne: (id) => client.get(`/posts/${id}`),
  create: (data) => client.post('/posts', data),
  update: (id, data) => client.put(`/posts/${id}`, data),
  delete: (id) => client.delete(`/posts/${id}`),
};

export default PostsAPI;