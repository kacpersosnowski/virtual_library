import { PropsWithChildren, createContext, useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { AuthContextType } from "./AuthContext.types";
import { authApi } from "../../config/api/auth/auth";
import {
  Credentials,
  RegisterCredentials,
} from "../../config/api/auth/auth.types";
import AccessTokenService from "./AccessTokenService";

export const AuthContext = createContext<AuthContextType>(null);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AccessTokenService.getToken() !== null,
  );
  const {
    mutate: loginMutate,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
    error: loginError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      AccessTokenService.storeToken(data.token);
      setIsAuthenticated(true);
    },
  });
  const {
    mutate: registerMutate,
    isLoading: registerIsLoading,
    isSuccess: registerIsSuccess,
    error: registerError,
  } = useMutation({
    mutationFn: authApi.register,
  });

  // Wrapper for better ts typing
  const login = (credentials: Credentials) => {
    loginMutate(credentials);
  };

  const register = (credentials: RegisterCredentials) => {
    registerMutate(credentials);
  };

  const logout = () => {
    AccessTokenService.deleteToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        loginQueryData: {
          isLoading: loginIsLoading,
          isSuccess: loginIsSuccess,
          error: loginError as AxiosError,
        },
        registerQueryData: {
          isLoading: registerIsLoading,
          isSuccess: registerIsSuccess,
          error: registerError as AxiosError,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
