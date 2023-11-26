import { Box, Typography } from "@mui/material";

import classes from "./AuthForms.module.css";
import ActionButton from "../../UI/ActionButton";
import PasswordInput from "./PasswordInput";
import Input from "../common/Input";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <Box className={classes["auth-form-wrapper"]}>
      <Box component="form">
        <Typography sx={{ mb: "2rem" }} variant="h3">
          Dobrze, że jesteś
        </Typography>
        <Input id="outlined-email" label="Adres e-mail" />
        <PasswordInput />
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          Zaloguj się
        </ActionButton>
        <Typography paragraph>
          Nie pamiętasz hasła? Zresetuj je tutaj.
        </Typography>
        <Typography paragraph>
          Nie masz jeszcze konta? <Link to="/">Zarejestruj się tutaj.</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
