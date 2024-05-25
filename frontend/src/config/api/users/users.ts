import axios from "axios";

import { UpdateUserDTO, UserData, UsersApi } from "./users.types";
import { parseUserFormDataForUpdate } from "./users.parsers";
import { BACKEND_BASE_URL } from "../../../constants/api";
import bookListsApi from "../bookLists/bookLists";
import { PagedResponse } from "../common/common.types";
// import { PagedResponse } from "../common/common.types";

const url = "/users";
const languageUrl = `${url}/language`;
const meUrl = `${url}/me`;
const profilePictureUrl = `/files/image`;

export const usersApi: UsersApi = {
  getUserData: async () => {
    const response = await axios.get<UserData>(meUrl);
    return response.data;
  },
  getUsers: async (params) => {
    const response = await axios.get<PagedResponse<UserData>>(url, { params });
    const me = await usersApi.getUserData();
    const id = me.id;
    return {
      totalElements: response.data.totalElements,
      content: response.data.content.filter((user) => user.id !== id),
    };
  },
  getUserDetails: async (id) => {
    const bookLists = await bookListsApi.getUserBookLists(id);
    const response = await axios.get<UserData>(`${url}/${id}`);
    const user = response.data;
    user.bookLists = bookLists;
    return user;
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
  updateUser: async (user: UpdateUserDTO) => {
    const formData = parseUserFormDataForUpdate(user);
    const response = await axios.put<UserData>(`${url}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  getUserProfilePicture: async () => {
    const user = await usersApi.getUserData();
    if (!user.profilePictureId) {
      return null;
    }
    const response = await fetch(
      `${BACKEND_BASE_URL}${profilePictureUrl}/${user.profilePictureId}`,
    );
    const blob = await response.blob();
    const fileNameResponse = await axios.get<string>(
      `${BACKEND_BASE_URL}${profilePictureUrl}/${user.profilePictureId}/filename`,
    );
    const fileName = fileNameResponse.data;
    const imageFile = new File([blob], fileName, { type: blob.type });
    return imageFile;
  },
};
