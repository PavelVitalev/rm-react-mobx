import axios from 'axios';

import { environments } from '@constants/environments';

import { getToken } from '@utils/auth/index';

axios.defaults.baseURL = environments;

axios.defaults.headers.common['authorization'] = getToken();

axios.defaults.headers.common['Content-Type'] = 'application/json';


const requestInretceptSuccess = (config) => {
  return config;
};

const requestInterceptError = (error) => {
  console.warn(error);
  return Promise.reject(error);
};

axios.interceptors.request.use(
  requestInretceptSuccess,
  requestInterceptError
);

const responseInterceptSuccess = (response) => {
  return response;
};

const responseInterceptError = (error) => {
  if (error && error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(
  responseInterceptSuccess,
  responseInterceptError
);
