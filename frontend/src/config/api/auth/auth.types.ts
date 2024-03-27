import { UserData } from "../users/users.types";

export type Credentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = Credentials & {
  email: string;
  language: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ResetPasswordData = {
  username: string;
  newPassword: string;
  token: string;
};

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type AuthApi = {
  login: (credentials: Credentials) => Promise<LoginResponse>;
  register: (credentials: RegisterCredentials) => Promise<LoginResponse>;
  finalizeRegistration: (token: string) => Promise<LoginResponse>;
  refreshToken: () => Promise<LoginResponse>;
  resetPassword: (email: string) => Promise<void>;
  finalizeResetPassword: (data: ResetPasswordData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<UserData>;
};
