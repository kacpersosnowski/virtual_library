import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import PasswordInput from "./PasswordInput";
import ActionButton from "../../UI/ActionButton";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";
import Checkbox from "../common/Checkbox";
import useFormikLanguage from "../../../hooks/useFormikLanguage";
import emailValidator from "../../../config/validators/emailValidator";
import validationMessages from "../../../messages/validationMessages";

import passwordTranslatableSchema from "../../../config/validators/passwordTranslatableSchema";
import Card from "../../UI/Card/Card";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import LoadingSpinner from "../../UI/LoadingSpinner";

const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const { register, registerQueryData, resetRegisterQueryData } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormikLanguage({
    initialValues: {
      newEmail: "",
      username: "",
      password1: "",
      password2: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      newEmail: emailValidator({
        invalid: t(validationMessages.emailInvalid.key),
        required: t(validationMessages.fieldRequired.key),
      }),
      username: Yup.string().required(t(validationMessages.fieldRequired.key)),
      password1: passwordTranslatableSchema(t),
      password2: Yup.string()
        .required(t(validationMessages.fieldRequired.key))
        .oneOf(
          [Yup.ref("password1")],
          t(validationMessages.passwordsNotMatch.key),
        ),
      acceptTerms: Yup.boolean().isTrue(t(validationMessages.acceptTerms.key)),
    }),
    onSubmit: (values) => {
      const credentials = {
        email: values.newEmail,
        username: values.username,
        password: values.password1,
        language: i18n.language !== "en" ? i18n.language.toUpperCase() : "ENG",
      };
      register(credentials);
    },
  });

  const { isSuccess, error, isLoading } = registerQueryData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/verification-email-sent", {
        state: { email: formik.values.newEmail },
      });
      resetRegisterQueryData();
    }
  }, [isSuccess]);

  const errorMessage =
    error?.response?.status === 409
      ? t(validationMessages.emailAlreadyExists.key)
      : t(errorMessages.somethingWentWrongError.key);

  return (
    <Card>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography sx={{ mb: "2rem" }} variant="h3">
          {t(authMessages.registerHeader.key)}
        </Typography>
        <Input
          id="newEmail"
          label={t(authMessages.emailLabel.key)}
          formik={formik}
        />
        <Input
          id="username"
          label={t(authMessages.usernameLabel.key)}
          formik={formik}
        />
        <PasswordInput
          id="password1"
          label={t(authMessages.passwordLabel.key)}
          formik={formik}
        />
        <PasswordInput
          id="password2"
          label={t(authMessages.repeatPasswordLabel.key)}
          formik={formik}
        />
        <Checkbox
          id="acceptTerms"
          label={
            <div>
              <span>{t(authMessages.acceptTerms.key)} </span>{" "}
              <Link to="/terms" className="primary-link">
                {t(authMessages.acceptTermsLink.key)}
              </Link>
            </div>
          }
          formik={formik}
        />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <ActionButton
            sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
            type="submit"
          >
            {t(authMessages.registerButton.key)}
          </ActionButton>
        )}
        {error && (
          <ErrorMessage
            message={errorMessage}
            sx={{ mt: 0 }}
            alertStyle={{ width: "80%" }}
          />
        )}
        <Typography paragraph>
          {t(authMessages.loginPrompt.key)}{" "}
          <Link to="/login" className="primary-link">
            {t(authMessages.loginPromptLink.key)}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default RegisterForm;
