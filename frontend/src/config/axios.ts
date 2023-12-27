import axios from "axios";

import AccessTokenService from "../store/AuthContext/AccessTokenService";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  (config) => {
    const token = AccessTokenService.getToken();
    if (token) {
      config.headers.Authorization = AccessTokenService.bearerHeader();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      error.message = error.response.data;
    }
    throw error;
  },
);

export const customFetch = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});
