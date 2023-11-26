import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PasswordInput from "./PasswordInput";
import ActionButton from "../../UI/ActionButton";
import Input from "../common/Input";
import authMessages from "../../../messages/authMessages";

import classes from "./AuthForms.module.css";

const RegisterForm = () => {
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
          {t(authMessages.registerHeader.key)}
        </Typography>
        <Input
          id="outlined-email-register"
          label={t(authMessages.emailLabel.key)}
        />
        <PasswordInput label={t(authMessages.passwordLabel.key)} />
        <PasswordInput label={t(authMessages.repeatPasswordLabel.key)} />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <div>
              <span>{t(authMessages.acceptTerms.key)} </span>{" "}
              <Link to="/terms" className="primary-link">
                {t(authMessages.acceptTermsLink.key)}
              </Link>
            </div>
          }
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
