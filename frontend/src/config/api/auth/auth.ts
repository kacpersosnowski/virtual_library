import axios from "axios";
import {
  AuthApi,
  Credentials,
  LoginResponse,
  RegisterCredentials,
  ResetPasswordData,
} from "./auth.types";
import { customFetch } from "../../axios";
import RefreshTokenService from "../../../store/AuthContext/RefreshTokenService";

const loginUrl = "/auth/login";
const registerUrl = "/auth/register";
const finalizeRegistrationUrl = "/auth/finalize-registration";
const refreshTokenUrl = "/auth/refresh-token";
const resetPasswordUrl = "users/reset-password";
const finalizeResetPasswordUrl = "users/finalize-password-reset";

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
  refreshToken: async () => {
    const response = await customFetch.post<LoginResponse>(refreshTokenUrl, {
      refreshToken: RefreshTokenService.getToken(),
    });
    return response.data;
  },
  resetPassword: async (email: string) => {
    await axios.post(resetPasswordUrl, String(email), {
      headers: { "Content-Type": "text/plain" },
    });
  },
  finalizeResetPassword: async (data: ResetPasswordData) => {
    await axios.post(finalizeResetPasswordUrl, data);
  },
};
