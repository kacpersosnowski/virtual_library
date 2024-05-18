import { PageSearchData, PagedResponse } from "../common/common.types";

export type UserData = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  authority: string;
  language: string;
  profilePictureId: string;
};

export type UpdateUserDTO = {
  firstName: string;
  lastName: string;
  language: string;
  email: string;
  profilePicture?: File;
};

export type UsersApi = {
  getUserData: () => Promise<UserData>;
  getUsers: (queryData: PageSearchData) => Promise<PagedResponse<UserData>>;
  changeUserLanguage: (language: string) => Promise<UserData>;
  updateUser: (user: UpdateUserDTO) => Promise<UserData>;
  getUserProfilePicture: () => Promise<File>;
};
