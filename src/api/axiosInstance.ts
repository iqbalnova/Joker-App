import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
