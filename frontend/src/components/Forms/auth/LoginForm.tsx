import { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import ActionButton from "../../UI/ActionButton";
import PasswordInput from "./PasswordInput";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";
import emailValidator from "../../../config/validators/emailValidator";
import validationMessages from "../../../messages/validationMessages";
import useFormikLanguage from "../../../hooks/useFormikLanguage";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import Card from "../../UI/Card/Card";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated, loginQueryData } = useContext(AuthContext);

  const formik = useFormikLanguage({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: emailValidator({
        invalid: t(validationMessages.emailInvalid.key),
        required: t(validationMessages.fieldRequired.key),
      }),
      password: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      login(values);
      localStorage.setItem("email", values.email); // TEMPORARY!!! There is no endpoint for user details
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const { isLoading, error } = loginQueryData;

  return (
    <Card>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography sx={{ mb: "2rem" }} variant="h3">
          {t(authMessages.loginHeader.key)}
        </Typography>
        <Input
          id="email"
          label={t(authMessages.emailLabel.key)}
          formik={formik}
        />
        <PasswordInput
          id="password"
          label={t(authMessages.passwordLabel.key)}
          formik={formik}
        />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <ActionButton
            sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
            type="submit"
          >
            {t(authMessages.loginButton.key)}
          </ActionButton>
        )}
        {error && (
          <ErrorMessage
            message={t(validationMessages.invalidCredentials.key)}
            sx={{ mt: 0 }}
            alertStyle={{ width: "80%" }}
          />
        )}
        <Typography paragraph>{t(authMessages.resetPassword.key)}</Typography>
        <Typography paragraph>
          {t(authMessages.registerPrompt.key)}{" "}
          <Link to="/register" className="primary-link">
            {t(authMessages.registerPromptLink.key)}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default LoginForm;
