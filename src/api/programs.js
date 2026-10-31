import api from './axios';
export const getPrograms = () => api.get('/programs');
export const addProgram = (data) => api.post('/programs', data);
export const deleteProgram = (id) => api.delete('/programs/' + id);
