import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

import {
  Credentials,
  RegisterCredentials,
} from "../../config/api/auth/auth.types";

export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  login: (credentials: Credentials) => void;
  logout: () => void;
  register: (credentials: RegisterCredentials) => void;
  loginQueryData: AuthMutationData;
  registerQueryData: AuthMutationData;
  resetLoginQueryData: () => void;
  resetRegisterQueryData: () => void;
};

export type AuthMutationData = {
  isLoading: boolean;
  isSuccess: boolean;
  error: AxiosError;
};
