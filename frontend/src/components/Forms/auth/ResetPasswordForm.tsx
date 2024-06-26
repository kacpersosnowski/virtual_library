import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Box, Typography } from "@mui/material";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import validationMessages from "../../../messages/validationMessages";
import passwordTranslatableSchema from "../../../config/validators/passwordTranslatableSchema";
import authMessages from "../../../messages/authMessages";
import ActionButton from "../../UI/ActionButton";
import PasswordInput from "./PasswordInput";
import { authApi } from "../../../config/api/auth/auth";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: authApi.finalizeResetPassword,
    onSuccess: () => {
      dispatch(snackbarActions.show(t(authMessages.passwordResetSuccess.key)));
      navigate("/login");
    },
  });

  const formik = useFormikLanguage({
    initialValues: {
      newPassword: "",
      repeatNewPassword: "",
      token: "",
    },
    validationSchema: Yup.object({
      newPassword: passwordTranslatableSchema(t),
      repeatNewPassword: Yup.string()
        .required(t(validationMessages.fieldRequired.key))
        .oneOf(
          [Yup.ref("newPassword")],
          t(validationMessages.passwordsNotMatch.key),
        ),
    }),
    onSubmit: (values) => {
      mutate({
        newPassword: values.newPassword,
        token,
      });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography sx={{ mb: "2rem" }} variant="h3">
        {t(authMessages.resetPasswordHeader.key)}
      </Typography>
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
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {t(authMessages.resetPasswordSubmitButton.key)}
        </ActionButton>
      )}
      {error && (
        <ErrorMessage
          message={t(errorMessages.resetPasswordError.key)}
          sx={{ mt: 0 }}
          alertStyle={{ width: "80%" }}
        />
      )}
    </Box>
  );
};

export default ResetPasswordForm;
