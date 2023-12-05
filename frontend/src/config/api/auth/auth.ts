import axios from "axios";
import { AuthApi, Credentials, LoginResponse } from "./auth.types";

const url = "/auth/login";

export const authApi: AuthApi = {
  login: async (credentials: Credentials) => {
    const response = await axios.post<LoginResponse>(url, credentials);
    return response.data;
  },
};
