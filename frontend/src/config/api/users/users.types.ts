import { BookListDTO } from "../bookLists/bookLists.types";
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
  publicAccount: boolean;
  bookLists?: BookListDTO[];
};

export type UpdateUserDTO = {
  firstName: string;
  lastName: string;
  language: string;
  email: string;
  publicAccount: boolean;
  profilePicture?: File;
};

export type UsersApi = {
  getUserData: () => Promise<UserData>;
  getUsers: (queryData: PageSearchData) => Promise<PagedResponse<UserData>>;
  getUserDetails: (id: string) => Promise<UserData>;
  changeUserLanguage: (language: string) => Promise<UserData>;
  updateUser: (user: UpdateUserDTO) => Promise<UserData>;
  getUserProfilePicture: () => Promise<File>;
  deleteProfilePicture: () => Promise<void>;
};
