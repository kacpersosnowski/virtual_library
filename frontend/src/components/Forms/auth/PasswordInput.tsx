import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl
      sx={{ width: "80%", mt: "0.5rem", mb: "0.5rem" }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Hasło</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Hasło"
      />
    </FormControl>
  );
};

export default PasswordInput;
