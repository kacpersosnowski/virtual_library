import {
  FormControl,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme,
} from "@mui/material";
import { FormikProps } from "formik";
import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  type?: string;
  variant?: "standard" | "outlined" | "filled";
  sx?: SxProps<Theme>;
  className?: string;
};

const Input: React.FC<Props> = (props) => {
  const { id, label, formik, type, variant, sx, className } = props;
  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  return (
    <FormControl
      className={className}
      variant={variant || "outlined"}
      sx={{
        width: "80%",
        mt: !errorMessage ? "0.5rem" : 0,
        mb: !errorMessage ? "0.5rem" : 0,
        ...sx,
      }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type || "text"}
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

export default Input;
