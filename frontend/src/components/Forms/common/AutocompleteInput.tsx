import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";
import { FormikProps, FormikValues } from "formik";

import ErrorMessage from "../../UI/ErrorMessage";
import { createPortal } from "react-dom";

type Props = {
  id: string;
  label: string;
  formik: FormikProps<FormikValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionLabel?: (option: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  multiple?: boolean;
  freeSolo?: boolean;
  sx?: SxProps<Theme>;
  errorSx?: SxProps<Theme>;
  errorPortalId?: string;
};

const AutocompleteInput: React.FC<Props> = (props) => {
  const {
    id,
    label,
    formik,
    options,
    getOptionLabel,
    isOptionEqualToValue,
    multiple,
    freeSolo,
    sx,
    errorSx,
    errorPortalId,
  } = props;

  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  return (
    <>
      <Autocomplete
        freeSolo={freeSolo}
        multiple={multiple}
        disablePortal
        id={id}
        options={options}
        sx={{ width: "80%", ...sx }}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={
          isOptionEqualToValue
            ? isOptionEqualToValue
            : (option, value) => option.id === value.id
        }
        {...formik.getFieldProps(id)}
        value={formik.values[id]}
        onChange={(event, newValue) => {
          formik.setFieldValue(id, newValue);
        }}
        renderInput={(params) => {
          return <TextField {...params} label={label} />;
        }}
      />
      {errorMessage &&
        errorPortalId &&
        createPortal(
          <ErrorMessage
            message={errorMessage}
            sx={{ my: "0.4rem", width: "80%", ...errorSx }}
            alertStyle={{ flex: 1 }}
          />,
          document.getElementById(errorPortalId),
        )}
      {errorMessage && !errorPortalId && (
        <ErrorMessage
          message={errorMessage}
          sx={{ my: "0.4rem", width: "80%", ...errorSx }}
          alertStyle={{ flex: 1 }}
        />
      )}
    </>
  );
};

export default AutocompleteInput;
