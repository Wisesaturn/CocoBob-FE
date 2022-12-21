import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 20000,
});

export default instance;
