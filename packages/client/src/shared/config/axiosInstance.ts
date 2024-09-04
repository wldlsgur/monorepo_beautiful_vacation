import axios from 'axios';
import { CONFIG } from '@/shared/constant';

const axiosInstance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
