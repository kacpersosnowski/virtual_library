import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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

import classes from "./AuthForms.module.css";
import passwordTranslatableSchema from "../../../config/validators/passwordTranslatableSchema";

const RegisterForm = () => {
  const { t } = useTranslation();

  const formik = useFormikLanguage({
    initialValues: {
      newEmail: "",
      password1: "",
      password2: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      newEmail: emailValidator({
        invalid: t(validationMessages.emailInvalid.key),
        required: t(validationMessages.fieldRequired.key),
      }),
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
      console.log("Register", JSON.stringify(values));
    },
  });

  return (
    <Box
      className={classes["auth-form-wrapper"]}
      sx={{ width: { xs: "100%", sm: "50%", lg: "25%" } }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography sx={{ mb: "2rem" }} variant="h3">
          {t(authMessages.registerHeader.key)}
        </Typography>
        <Input
          id="newEmail"
          label={t(authMessages.emailLabel.key)}
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
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {t(authMessages.registerButton.key)}
        </ActionButton>
        <Typography paragraph>
          {t(authMessages.loginPrompt.key)}{" "}
          <Link to="/login" className="primary-link">
            {t(authMessages.loginPromptLink.key)}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
