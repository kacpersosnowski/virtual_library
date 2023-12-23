export type Credentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = Credentials & {
  language: string;
};

export type LoginResponse = {
  token: string;
};

export type AuthApi = {
  login: (credentials: Credentials) => Promise<LoginResponse>;
  register: (credentials: RegisterCredentials) => Promise<LoginResponse>;
  finalizeRegistration: (token: string) => Promise<LoginResponse>;
};
