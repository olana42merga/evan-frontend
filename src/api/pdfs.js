import api from './axios';
export const getPdfs = () => api.get('/pdfs');
export const addPdf = (data) => api.post('/pdfs', data);
export const deletePdf = (id) => api.delete('/pdfs/' + id);
