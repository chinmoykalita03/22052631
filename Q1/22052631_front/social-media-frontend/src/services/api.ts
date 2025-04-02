import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Your backend URL
  timeout: 10000,
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;