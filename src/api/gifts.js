import api from './axios';
export const getGifts = () => api.get('/gifts');
export const sendGift = (data) => api.post('/gifts', data);
