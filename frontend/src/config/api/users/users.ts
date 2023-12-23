import axios from "axios";

import { UserData, UsersApi } from "./users.types";

const languageUrl = "/users/language";
const meUrl = "/users/me";

export const usersApi: UsersApi = {
  getUserData: async () => {
    const response = await axios.get<UserData>(meUrl);
    return response.data;
  },
  changeUserLanguage: async (language: string) => {
    const user = await usersApi.getUserData();
    const response = await axios.patch<UserData>(
      `${languageUrl}/${user.id}`,
      language,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },
};
