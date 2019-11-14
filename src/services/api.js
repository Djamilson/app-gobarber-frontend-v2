import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:3000',
  baseURL: 'http://138.197.79.44',
});

export default api;
