import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API'nizin temel URL'si
});

export default api;
