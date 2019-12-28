import axios from 'axios';

import host from '~/config/host';
const api = axios.create({
  //baseURL: `http://${host.WEBHOST}:${host.PORT}`,
  baseURL: 'http://138.197.79.44',
});

export default api;
