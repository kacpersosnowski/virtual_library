import axios from "axios";

import { UpdateUserDTO, UserData, UsersApi } from "./users.types";
import { parseUserFormDataForUpdate } from "./users.parsers";
import { BACKEND_BASE_URL } from "../../../constants/api";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUsers: async (params) => {
    // const response = await axios.get<PagedResponse<UserData>>(url, { params });
    // return response.data;
    console.log(params);
    function wait(milliseconds: number) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    await wait(1000);
    return {
      totalElements: 3,
      content: [
        {
          id: "6586c730167d96419b938015",
          username: "Rotar07",
          firstName: "Sebastian",
          lastName: "Jędrzejewski",
          email: "sebastian.jedrzejewski12@gmail.com",
          authority: "ADMIN",
          language: "PL",
          profilePictureId: "663b3489f667103a0164336b",
        },
        {
          id: "6586c730167d96419b938016",
          username: "Rotar07",
          firstName: "Sebastian",
          lastName: "Jędrzejewski",
          email: "sebastian.jedrzejewski12@gmail.com",
          authority: "ADMIN",
          language: "PL",
          profilePictureId: "663b3489f667103a0164336b",
        },
        {
          id: "6586c730167d96419b938017",
          username: "Rotar07",
          firstName: "Sebastian",
          lastName: "Jędrzejewski",
          email: "sebastian.jedrzejewski12@gmail.com",
          authority: "ADMIN",
          language: "PL",
          profilePictureId: null,
        },
      ],
    };
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
