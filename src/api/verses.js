import api from './axios';
export const getVerses = () => api.get('/verses');
export const addVerse = (data) => api.post('/verses', data);
export const deleteVerse = (id) => api.delete('/verses/' + id);
