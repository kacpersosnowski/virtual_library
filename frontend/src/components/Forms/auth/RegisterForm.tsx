import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import ActionButton from "../../UI/ActionButton";
import Input from "../common/Input";

import classes from "./AuthForms.module.css";

const RegisterForm = () => {
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
          Zacznij czytać już dziś
        </Typography>
        <Input id="outlined-email-register" label="Adres e-mail" />
        <PasswordInput label="Hasło" />
        <PasswordInput label="Powtórz hasło" />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <div>
              <span>Akceptuję </span>{" "}
              <Link to="/terms" className="primary-link">
                regulamin portalu
              </Link>
            </div>
          }
        />
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          Zarejestruj się
        </ActionButton>
        <Typography paragraph>
          Masz już konto?{" "}
          <Link to="/login" className="primary-link">
            Zaloguj się tutaj.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
