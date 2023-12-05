import axios from "axios";
import {
  AuthApi,
  Credentials,
  LoginResponse,
  RegisterCredentials,
} from "./auth.types";

const loginUrl = "/auth/login";
const registerUrl = "/auth/register";

export const authApi: AuthApi = {
  login: async (credentials: Credentials) => {
    const response = await axios.post<LoginResponse>(loginUrl, credentials);
    return response.data;
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await axios.post<LoginResponse>(registerUrl, credentials);
    return response.data;
  },
};
