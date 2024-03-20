import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { AuthContextType, AuthMutationData } from "./AuthContext.types";
import { authApi } from "../../config/api/auth/auth";
import {
  Credentials,
  RegisterCredentials,
} from "../../config/api/auth/auth.types";
import AccessTokenService from "./AccessTokenService";
import RefreshTokenService from "./RefreshTokenService";

export const AuthContext = createContext<AuthContextType>(null);

const initialCredentialsData = {
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AccessTokenService.getToken() !== null,
  );
  const [loginData, setLoginData] = useState<AuthMutationData>(
    initialCredentialsData,
  );
  const [registerData, setRegisterData] = useState<AuthMutationData>(
    initialCredentialsData,
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
      refresh();

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

  useEffect(() => {
    setRegisterData({
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      error: loginError as AxiosError,
    });
  }, [loginIsLoading, loginIsSuccess, loginError]);

  useEffect(() => {
    setRegisterData({
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      error: registerError as AxiosError,
    });
  }, [registerIsLoading, registerIsSuccess, registerError]);

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

  const resetLoginQueryData = () => {
    setLoginData(initialCredentialsData);
  };

  const resetRegisterQueryData = () => {
    setRegisterData(initialCredentialsData);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        loginQueryData: loginData,
        registerQueryData: registerData,
        resetLoginQueryData,
        resetRegisterQueryData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
