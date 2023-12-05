import { Dispatch, SetStateAction } from "react";

import { Credentials, LoginResponse } from "../../config/api/auth/auth.types";

export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  login: (credentials: Credentials) => void;
  logout: () => void;
  loginResponse: LoginResponse;
  isLoading: boolean;
  error: unknown;
};
