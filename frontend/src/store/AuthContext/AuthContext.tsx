import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { AuthContextType } from "./AuthContext.types";
import { authApi } from "../../config/api/auth/auth";
import {
  Credentials,
  RegisterCredentials,
} from "../../config/api/auth/auth.types";
import AccessTokenService from "./AccessTokenService";
import RefreshTokenService from "./RefreshTokenService";

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
      AccessTokenService.storeToken(data.accessToken);
      RefreshTokenService.storeToken(data.refreshToken);
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

  useEffect(() => {
    const refresh = async () => {
      try {
        await RefreshTokenService.refreshToken();
      } catch (error) {
        logout();
      }
    };

    let refreshInterval: NodeJS.Timeout;
    if (isAuthenticated) {
      refreshInterval = setInterval(
        () => {
          refresh();
        },
        (AccessTokenService.ACCESS_TOKEN_LIFETIME_IN_MINUTES - 1) * 60 * 1000,
      );
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated]);

  // Wrapper for better ts typing
  const login = (credentials: Credentials) => {
    loginMutate(credentials);
  };

  const register = (credentials: RegisterCredentials) => {
    registerMutate(credentials);
  };

  const logout = () => {
    AccessTokenService.deleteToken();
    RefreshTokenService.deleteToken();
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
