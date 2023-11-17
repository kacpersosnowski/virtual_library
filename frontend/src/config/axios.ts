import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      error.message = error.response.data;
    }
    throw error;
  },
);
