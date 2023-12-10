import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";
import { FormikProps, FormikValues } from "formik";

import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  id: string;
  title: string;
  formik: FormikProps<FormikValues>;
  onFileSelected?: (file: File | null) => void;
};

const FilePicker: React.FC<Props> = (props) => {
  const { id, title, formik, onFileSelected } = props;

  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    formik.setFieldValue(id, file);

    if (onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", my: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: "1rem",
            color: "#666666",
          }}
        >
          {title}
        </Box>
        <Input
          type="file"
          inputProps={{ accept: "image/*" }}
          style={{ display: "none" }}
          id={id}
          onChange={handleFileChange}
        />
        <Box component="label" htmlFor={id}>
          <Button variant="outlined" component="span">
            Choose File
          </Button>
        </Box>
        {selectedFile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: "1rem",
              color: "#666666",
            }}
          >
            Selected File: {selectedFile.name}
          </Box>
        )}
      </Box>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          sx={{ mt: 0, width: "80%" }}
          alertStyle={{ flex: 1 }}
        />
      )}
    </>
  );
};

export default FilePicker;
