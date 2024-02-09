export type UserData = {
  id: string;
  email: string;
  authority: string;
  language: string;
};

export type UsersApi = {
  getUserData: () => Promise<UserData>;
  changeUserLanguage: (language: string) => Promise<UserData>;
};
