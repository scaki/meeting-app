/* eslint-disable */
import axios from 'axios';

class BaseService {
  validateStatus = status => {
    return status >= 200 && status < 300;
  };

  successInterceptor = response => {
    return response;
  };

  failureInterceptor = error => {
    return Promise.reject(error);
  };

  createAxiosInstance = () => {
    const token = localStorage.getItem('token');
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const instance = axios.create({
      headers: defaultHeaders,
      validateStatus: this.validateStatus,
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 15000,
    });

    instance.interceptors.response.use(
      this.successInterceptor,
      this.failureInterceptor
    );

    return instance;
  };

  get = (url = '', ...params) => async () => {
    const axiosInstance = await this.createAxiosInstance();
    return axiosInstance.get(url, ...params);
  };

  post = (url = '', ...params) => async () => {
    const axiosInstance = await this.createAxiosInstance();
    return axiosInstance.post(url, ...params);
  };

  put = (url = '', ...params) => async () => {
    const axiosInstance = await this.createAxiosInstance();
    return axiosInstance.put(url, ...params);
  };

  delete = (url = '', ...params) => async () => {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.delete(url, ...params);
  };
}

export default new BaseService();
