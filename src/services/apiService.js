/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import axios from 'axios';
import { notification } from 'antd';

const validateStatus = status => status >= 200 && status < 300;
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus,
  baseURL: process.env.REACT_APP_API_URL,
});
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    notification.error({
      message: 'Error',
      description: error.response.data.message,
    });
    return Promise.reject(error);
  }
);

class ApiService {
  get = (url = '', params) => async () => axiosInstance.get(url, { params });

  post = (url = '', params) => async () => axiosInstance.post(url, params);

  put = (url = '', params) => async () => axiosInstance.put(url, params);

  delete = (url = '', params) => async () => axiosInstance.delete(url, params);
}

export default new ApiService();
