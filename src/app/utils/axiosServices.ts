import axios, { AxiosRequestConfig } from 'axios';
import { Cookie } from 'ng2-cookies';
import { environment } from '../../environments/environment';
import { AuthConstant } from '../constants/auth.constant';

const service = axios.create({
  baseURL: environment.apiMainUrl,
});

service.interceptors.request.use(
  (config: any) => {
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: Cookie.get(AuthConstant.ACCESS_TOKEN_KEY)
        ? `Bearer ${Cookie.get(AuthConstant.ACCESS_TOKEN_KEY)}`
        : '',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
