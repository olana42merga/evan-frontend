import axios from 'axios';

const api = axios.create({
  // Uses Vercel environment variable if it exists, otherwise uses your live Render backend
  baseURL: import.meta.env.VITE_API_URL || 'https://ddu-evangelical-backend-6.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
