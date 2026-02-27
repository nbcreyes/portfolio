import client from './client.js';

const ContactAPI = {
  send: (data) => client.post('/contact', data),
  getAll: () => client.get('/contact'),
  markRead: (id) => client.put(`/contact/${id}/read`),
  delete: (id) => client.delete(`/contact/${id}`),
};

export default ContactAPI;