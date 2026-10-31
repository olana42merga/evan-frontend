import api from './axios';
export const getPhotos = () => api.get('/photos');
export const addPhoto = (data) => api.post('/photos', data);
export const deletePhoto = (id) => api.delete('/photos/' + id);
