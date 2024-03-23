import { UpdateUserDTO } from "./users.types";

export const parseUserFormDataForUpdate = (data: UpdateUserDTO) => {
  const formData = new FormData();
  if (data.profilePicture) {
    formData.append(
      "profilePicture",
      data.profilePicture,
      data.profilePicture.name,
    );
  }
  const user = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    language: data.language,
  };
  formData.append(
    "user",
    new Blob([JSON.stringify(user)], { type: "application/json" }),
  );

  return formData;
};
