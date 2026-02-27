import client from './client.js';

const ContactAPI = {
  send: (data) => client.post('/contact', data),
  getAll: () => client.get('/contact'),
  markRead: (id) => client.put(`/contact/${id}/read`),
  reply: (id, data) => client.post(`/contact/${id}/reply`, data),
  delete: (id) => client.delete(`/contact/${id}`),
};

export default ContactAPI;