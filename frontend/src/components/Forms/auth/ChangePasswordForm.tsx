import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Box, Typography } from "@mui/material";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import passwordTranslatableSchema from "../../../config/validators/passwordTranslatableSchema";
import validationMessages from "../../../messages/validationMessages";
import PasswordInput from "./PasswordInput";
import ActionButton from "../../UI/ActionButton";
import { authApi } from "../../../config/api/auth/auth";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import { isAxiosError } from "axios";
import authMessages from "../../../messages/authMessages";

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    mutate: changePassword,
    isLoading,
    error,
  } = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      dispatch(snackbarActions.show(t(authMessages.changePasswordSuccess.key)));
      formik.handleReset(null);
    },
  });

  const formik = useFormikLanguage({
    initialValues: { oldPassword: "", newPassword: "", repeatNewPassword: "" },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
      newPassword: passwordTranslatableSchema(t),
      repeatNewPassword: Yup.string()
        .required(t(validationMessages.fieldRequired.key))
        .oneOf(
          [Yup.ref("newPassword")],
          t(validationMessages.passwordsNotMatch.key),
        ),
    }),
    onSubmit: (values) => {
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    },
  });

  let errorMessage = t(errorMessages.somethingWentWrongError.key);
  if (error && isAxiosError(error) && error.response.status === 403) {
    errorMessage = t(errorMessages.invalidOldPassword.key);
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mt: "2rem",
        width: { xs: "100%", sm: "75%", md: "50%" },
        ml: "auto",
        mr: "auto",
      }}
    >
      <Typography variant="h3" sx={{ mb: "1rem" }}>
        {t(authMessages.changePasswordHeader.key)}
      </Typography>
      <PasswordInput
        id="oldPassword"
        label={t(authMessages.oldPasswordLabel.key)}
        formik={formik}
      />
      <PasswordInput
        id="newPassword"
        label={t(authMessages.newPasswordLabel.key)}
        formik={formik}
      />
      <PasswordInput
        id="repeatNewPassword"
        label={t(authMessages.repeatNewPasswordLabel.key)}
        formik={formik}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton sx={{ mt: "0.5rem", mb: "1rem" }} type="submit">
          {t(authMessages.changePasswordSubmitButton.key)}
        </ActionButton>
      )}
      {error && (
        <ErrorMessage
          message={errorMessage}
          sx={{ mt: 0 }}
          alertStyle={{ width: "80%" }}
        />
      )}
    </Box>
  );
};

export default ChangePasswordForm;
