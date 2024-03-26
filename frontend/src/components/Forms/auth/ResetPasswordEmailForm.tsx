import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Box, Typography } from "@mui/material";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import emailValidator from "../../../config/validators/emailValidator";
import validationMessages from "../../../messages/validationMessages";
import authMessages from "../../../messages/authMessages";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import { authApi } from "../../../config/api/auth/auth";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";

const ResetPasswordEmailForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      navigate("/reset-password-email-sent", {
        state: { email: formik.values.resetPasswordEmail },
      });
    },
  });

  const formik = useFormikLanguage({
    initialValues: { resetPasswordEmail: "" },
    validationSchema: Yup.object({
      resetPasswordEmail: emailValidator({
        invalid: t(validationMessages.emailInvalid.key),
        required: t(validationMessages.fieldRequired.key),
      }),
    }),
    onSubmit: (values) => {
      mutate(values.resetPasswordEmail);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography sx={{ mb: "2rem" }} variant="h3">
        {t(authMessages.resetPasswordHeader.key)}
      </Typography>
      <Typography sx={{ mb: "0.5rem" }}>
        {t(authMessages.resetPasswordEmailPrompt.key)}
      </Typography>
      <Input
        id="resetPasswordEmail"
        label={t(authMessages.emailLabel.key)}
        formik={formik}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {t(authMessages.resetPasswordEmailSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage
          message={t(errorMessages.somethingWentWrongError.key)}
          sx={{ mt: 0 }}
          alertStyle={{ width: "80%" }}
        />
      )}
    </Box>
  );
};

export default ResetPasswordEmailForm;
