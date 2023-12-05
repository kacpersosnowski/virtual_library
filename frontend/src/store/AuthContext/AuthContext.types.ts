import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

import {
  Credentials,
  LoginResponse,
  RegisterCredentials,
} from "../../config/api/auth/auth.types";

export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  login: (credentials: Credentials) => void;
  logout: () => void;
  register: (credentials: RegisterCredentials) => void;
  loginResponse: LoginResponse;
  isSuccess: boolean;
  isLoading: boolean;
  error: AxiosError;
};
