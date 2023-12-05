import { LANGUAGE_CODE } from "../../../constants/languages";

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = Credentials & {
  language: LANGUAGE_CODE;
};

export type LoginResponse = {
  token: string;
};

export type AuthApi = {
  login: (credentials: Credentials) => Promise<LoginResponse>;
};
