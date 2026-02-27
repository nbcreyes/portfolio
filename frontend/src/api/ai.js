import client from './client.js';

const AIAPI = {
  generateDraft: (data) => client.post('/ai/generate', data),
};

export default AIAPI;