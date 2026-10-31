import api from './axios';
export const getMessages = () => api.get('/messages');
export const sendMessage = (data) => api.post('/messages', data);
