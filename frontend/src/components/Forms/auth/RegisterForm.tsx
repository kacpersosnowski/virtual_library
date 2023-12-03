import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import PasswordInput from "./PasswordInput";
import ActionButton from "../../UI/ActionButton";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";

import classes from "./AuthForms.module.css";
import Checkbox from "../common/Checkbox";

const RegisterForm = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      newEmail: "",
      password1: "",
      password2: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      newEmail: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      password1: Yup.string().required("This field is required"),
      password2: Yup.string().required("This field is required"),
      acceptTerms: Yup.boolean().isTrue("You have to accept our terms"),
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
