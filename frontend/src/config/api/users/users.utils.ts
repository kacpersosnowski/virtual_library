import { BACKEND_BASE_URL } from "../../../constants/api";

export const getProfilePictureUrl = (profilePictureId: string) => {
  return `${BACKEND_BASE_URL}/files/image/${profilePictureId}`;
};
