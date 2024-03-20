import { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import ActionButton from "../../UI/ActionButton";
import PasswordInput from "./PasswordInput";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";
import validationMessages from "../../../messages/validationMessages";
import useFormikLanguage from "../../../hooks/useFormikLanguage";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import Card from "../../UI/Card/Card";
import errorMessages from "../../../messages/errorMessages";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated, loginQueryData, resetLoginQueryData } =
    useContext(AuthContext);
  const location = useLocation();
  const dispatch = useDispatch();

  const formik = useFormikLanguage({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required(t(validationMessages.fieldRequired.key)),
      password: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  useEffect(() => {
    if (location?.state?.accountActivated) {
      dispatch(snackbarActions.show(t(authMessages.accountActivated.key)));
      window.history.replaceState({}, document.title);
    }
  }, []);

  const { isLoading, error, isSuccess } = loginQueryData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSuccess) {
      resetLoginQueryData();
    }
  }, [isSuccess]);

  const errorMessage =
    error?.response?.status === 403
      ? t(validationMessages.invalidCredentials.key)
      : t(errorMessages.somethingWentWrongError.key);

  return (
    <Card>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography sx={{ mb: "2rem" }} variant="h3">
          {t(authMessages.loginHeader.key)}
        </Typography>
        <Input
          id="username"
          label={t(authMessages.usernameLabel.key)}
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
            message={errorMessage}
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
