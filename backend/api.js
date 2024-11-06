import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for backend API
});

// User endpoints
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Product endpoints
export const fetchProducts = () => api.get('/products');

export default api;
