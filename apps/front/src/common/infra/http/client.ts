import axios from 'axios';
import env from '../../config/env';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const apiClientWalmart = axios.create({
  baseURL: env.walmartApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': env.walmartApiKey,
    'x-rapidapi-host': 'axesso-walmart-data-service.p.rapidapi.com',
  },
});
