/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { push } from 'connected-react-router';

const ACCESS_TOKEN_KEY = 'access_token';
// export const API_URL = 'http://127.0.0.1:8080/api/';
export const API_URL = 'http://vizblocks-i.comp.nus.edu.sg/api/';

const vizAxios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  xhrFields: {
    withCredentials: true,
  },
  validateStatus: () => true,
});

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

vizAxios.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

vizAxios.interceptors.response.use(
  response => {
    if (response.data.access_token) {
      setAccessToken(response.data.access_token);
    }
    return response;
  },
  error => {
    const originalRequest = error.config;
    if (
      (!error.response || error.response.status === 401) &&
      originalRequest.url.endsWith('refresh')
    ) {
      push('/');
      return Promise.reject(error);
    }
    if (
      (!error.response || (error.response && error.response.status === 401)) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // eslint-disable-next-line consistent-return
      return vizAxios.post('/refresh', {}).then(res => {
        if (res.status === 200) {
          setAccessToken(res.data.access_token);
          vizAxios.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
          return vizAxios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  },
);

export function post(url, payload, callback, errorHandler) {
  return vizAxios
    .post(url, payload)
    .then(response => [response.status === 200, callback(response)])
    .catch(error => [false, errorHandler(error)]);
}

export function get(url, callback, errorHandler) {
  return vizAxios
    .get(url)
    .then(response => [response.status === 200, callback(response)])
    .catch(error => [false, errorHandler(error)]);
}

export function patch(url, payload, callback, errorHandler) {
  return vizAxios
    .patch(url, payload)
    .then(response => [response.status === 200, callback(response)])
    .catch(error => [false, errorHandler(error)]);
}

export function put(url, payload, callback, errorHandler) {
  return vizAxios
    .put(url, payload)
    .then(response => [response.status === 200, callback(response)])
    .catch(error => [false, errorHandler(error)]);
}
