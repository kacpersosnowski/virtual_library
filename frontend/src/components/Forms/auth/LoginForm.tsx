import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./AuthForms.module.css";
import ActionButton from "../../UI/ActionButton";
import PasswordInput from "./PasswordInput";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <Box
      className={classes["auth-form-wrapper"]}
      sx={{ width: { xs: "100%", sm: "50%", lg: "25%" } }}
    >
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Typography sx={{ mb: "2rem" }} variant="h3">
          {t(authMessages.loginHeader.key)}
        </Typography>
        <Input
          id="outlined-email-login"
          label={t(authMessages.emailLabel.key)}
        />
        <PasswordInput label={t(authMessages.passwordLabel.key)} />
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {t(authMessages.loginButton.key)}
        </ActionButton>
        <Typography paragraph>{t(authMessages.resetPassword.key)}</Typography>
        <Typography paragraph>
          {t(authMessages.registerPrompt.key)}{" "}
          <Link to="/register" className="primary-link">
            {t(authMessages.registerPromptLink.key)}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;