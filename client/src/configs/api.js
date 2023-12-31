import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { store } from '../store/config';

const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use((config) => {
  let accessToken = null;
  const state = store.getState();

  if (state.userReducer.userInfo) {
    accessToken = state.userReducer.userInfo.token;

    config.headers.token = accessToken;
  }
  return config;
});

export { request };
