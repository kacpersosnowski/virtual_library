import {
  Typography,
  Rating as MUIRating,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  label: string;
  formik: FormikProps<FormikValues>;
  sx?: SxProps<Theme>;
};

const Rating: React.FC<Props> = (props) => {
  const { id, label, formik, sx } = props;

  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  return (
    <Box>
      <Typography component="legend">{label}</Typography>
      <MUIRating
        id={id}
        name={id}
        value={formik.values[id]}
        onChange={(event, newValue) => {
          formik.setFieldValue(id, newValue);
        }}
        sx={sx}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          sx={{ mt: "0.4rem" }}
          alertStyle={{ flex: 1 }}
        />
      )}
    </Box>
  );
};

export default Rating;
