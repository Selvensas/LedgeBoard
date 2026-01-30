import axios from "axios";
const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api';
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;