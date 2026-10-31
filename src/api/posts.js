import api from './axios';
export const getPosts = () => api.get('/posts');
export const deletePost = (id) => api.delete('/posts/' + id);
