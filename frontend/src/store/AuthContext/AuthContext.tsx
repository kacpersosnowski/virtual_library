import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { AuthContextType } from "./AuthContext.types";
import { authApi } from "../../config/api/auth/auth";
import { Credentials } from "../../config/api/auth/auth.types";
import AccessTokenService from "./AccessTokenService";

export const AuthContext = createContext<AuthContextType>(null);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    mutate: loginMutate,
    data: loginResponse,
    isLoading: loginIsLoading,
    error: loginError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      AccessTokenService.storeToken(data.token);
      setIsAuthenticated(true);
    },
  });

  useEffect(() => {
    const token = AccessTokenService.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Wrapper for better ts typing
  const login = (credentials: Credentials) => {
    loginMutate(credentials);
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
        logout,
        loginResponse,
        isLoading: loginIsLoading,
        error: loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
