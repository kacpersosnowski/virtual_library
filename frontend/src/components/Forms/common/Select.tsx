import {
  FormControl,
  InputLabel,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import MUISelect from "@mui/material/Select";
import { FormikProps, FormikValues } from "formik";
import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  label: string;
  formik: FormikProps<FormikValues>;
  items: { label: string; value: string }[];
  sx?: SxProps<Theme>;
};

const Select: React.FC<Props> = (props) => {
  const { id, label, formik, items, sx } = props;
  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  return (
    <FormControl sx={{ mt: "1rem", ...sx }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <MUISelect
        labelId={`${id}-label`}
        id={id}
        label={label}
        {...formik.getFieldProps(id)}
      >
        {items.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MUISelect>
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

export default Select;
