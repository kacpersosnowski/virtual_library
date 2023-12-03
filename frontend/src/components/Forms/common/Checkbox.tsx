import { ReactNode } from "react";
import {
  FormControlLabel,
  Checkbox as MUICheckbox,
  FormControl,
  SxProps,
  Theme,
} from "@mui/material";
import { FormikProps } from "formik";
import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  label: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  sx?: SxProps<Theme>;
};

const Checkbox: React.FC<Props> = (props) => {
  const { id, label, formik, sx } = props;

  const errorMessage =
    formik.touched[id] && formik.errors[id]
      ? formik.errors[id].toString()
      : null;

  return (
    <FormControl
      sx={{
        width: "80%",
        mt: !errorMessage ? "0.5rem" : 0,
        mb: !errorMessage ? "0.5rem" : 0,
        ...sx,
      }}
    >
      <FormControlLabel
        control={<MUICheckbox id={props.id} {...formik.getFieldProps(id)} />}
        label={label}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          sx={{ mt: 0 }}
          alertStyle={{ flex: 1 }}
        />
      )}
    </FormControl>
  );
};

export default Checkbox;
