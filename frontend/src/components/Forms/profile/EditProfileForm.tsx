import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import validationMessages from "../../../messages/validationMessages";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import ChangeAvatarForm from "./ChangeAvatarForm";
import profileMessages from "../../../messages/profileMessages";
import { UserData } from "../../../config/api/users/users.types";
import { usersApi } from "../../../config/api/users/users";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import { queryClient } from "../../../config/api";

type Props = {
  user: UserData;
  profilePictureFile: File;
};

const EditProfileForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    mutate: updateUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: () => {
      dispatch(
        snackbarActions.show(t(profileMessages.profileFormSuccessMesage.key)),
      );
      queryClient.invalidateQueries(["users", "profilePicture"]);
      queryClient.invalidateQueries(["user"]);
    },
  });

  const { user, profilePictureFile } = props;

  const formik = useFormikLanguage({
    initialValues: {
      profilePicture: profilePictureFile,
      username: user.username,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      const userData = {
        email: user.email,
        firstName: values.firstName,
        lastName: values.lastName,
        language: user.language,
        profilePicture: values.profilePicture,
      };
      updateUser(userData);
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "100%", md: "75%" },
        ml: "auto",
        mr: "auto",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <ChangeAvatarForm
          id="profilePicture"
          formik={formik}
          username={user.username}
        />
        <Box>
          <Input
            id="username"
            label={t(profileMessages.profileFormUsername.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
            disabled
          />
          <Input
            id="email"
            label={t(profileMessages.profileFormEmail.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
            disabled
          />
          <Input
            id="firstName"
            label={t(profileMessages.profileFormFirstName.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
          />
          <Input
            id="lastName"
            label={t(profileMessages.profileFormLastName.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
          />
        </Box>
      </Box>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton type="submit" sx={{ mt: "1.5rem" }}>
          {t(profileMessages.profileFormSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default EditProfileForm;
