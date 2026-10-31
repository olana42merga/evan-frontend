import api from './axios';

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
// Assuming you might need this for the Admin dashboard later:
export const createMember = (data) => api.post('/auth/create-member', data);
