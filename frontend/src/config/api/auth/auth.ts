import axios from "axios";
import {
  AuthApi,
  Credentials,
  LoginResponse,
  RegisterCredentials,
} from "./auth.types";

const loginUrl = "/auth/login";
const registerUrl = "/auth/register";
const finalizeRegistrationUrl = "/auth/finalize-registration";

export const authApi: AuthApi = {
  login: async (credentials: Credentials) => {
    const response = await axios.post<LoginResponse>(loginUrl, credentials);
    return response.data;
  },
  register: async (credentials: RegisterCredentials) => {
    const response = await axios.post<LoginResponse>(registerUrl, credentials);
    return response.data;
  },
  finalizeRegistration: async (token: string) => {
    const response = await axios.post<LoginResponse>(
      finalizeRegistrationUrl,
      String(token),
      { headers: { "Content-Type": "text/plain" } },
    );
    return response.data;
  },
};
