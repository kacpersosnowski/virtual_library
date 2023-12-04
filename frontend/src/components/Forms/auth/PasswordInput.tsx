import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { FormikProps, FormikValues } from "formik";

import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  label: string;
  formik: FormikProps<FormikValues>;
};

const PasswordInput: React.FC<Props> = (props) => {
  const { id, label, formik } = props;
  const { touched, errors } = formik;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  return (
    <FormControl
      sx={{
        width: "80%",
        mt: !errorMessage ? "0.5rem" : 0,
        mb: !errorMessage ? "0.5rem" : 0,
      }}
      variant="outlined"
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
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
        label={label}
        error={!!errorMessage}
        {...formik.getFieldProps(id)}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          sx={{ mt: "0.4rem" }}
          alertStyle={{ flex: 1 }}
        />
      )}
    </FormControl>
  );
};

export default PasswordInput;
