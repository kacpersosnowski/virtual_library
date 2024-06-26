import React, {
  ChangeEvent,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import { useTranslation } from "react-i18next";

import ErrorMessage from "../../UI/ErrorMessage";
import { BOOK_HEIGHT, BOOK_WITDH } from "../../../constants/common";
import adminMessages from "../../../messages/adminMessages";

type Props = {
  id: string;
  title: string;
  formik: FormikProps<FormikValues>;
  acceptedFormats?: string;
  onFileSelected?: (file: File | null) => void;
  previewEnabled?: boolean;
};

const FilePicker = React.forwardRef((props: Props, ref) => {
  const { t } = useTranslation();
  const { id, title, formik, acceptedFormats, onFileSelected, previewEnabled } =
    props;
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        resetPreview() {
          setPreviewImage(null);
          setSelectedFile(null);
        },
      };
    },
    [],
  );

  const readPreviewImage = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    const file = formik?.values[id];
    if (file) {
      setSelectedFile(formik.values[id]);
      readPreviewImage(file);
    }
  }, [id, formik]);

  const { touched, errors } = formik;

  const errorMessage =
    touched[id] && errors[id] ? formik.errors[id].toString() : null;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    formik.setFieldValue(id, file);

    if (onFileSelected) {
      onFileSelected(file);
    }

    readPreviewImage(file);
  };

  const preview = (
    <Box
      sx={{
        width: `${BOOK_WITDH}px`,
        height: `${BOOK_HEIGHT}px`,
        ml: "1rem",
        border: "2px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!previewImage && (
        <Box component="span" sx={{ color: "#ccc" }}>
          {t(adminMessages.addBookFormCoverPreview.key)}
        </Box>
      )}
      {previewImage && (
        <Box
          component="img"
          src={previewImage}
          alt={previewImage}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          my: "1rem",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
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
          inputProps={{ accept: acceptedFormats || "image/*" }}
          style={{ display: "none" }}
          id={id}
          onChange={handleFileChange}
          value=""
        />
        <Box component="label" htmlFor={id}>
          <Button variant="outlined" component="span">
            {t(adminMessages.addBookFormCoverChooseFile.key)}
          </Button>
        </Box>
        {previewEnabled && preview}
        {!previewEnabled && selectedFile && (
          <Box sx={{ color: "#666666", ml: "1rem" }}>{selectedFile.name}</Box>
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
});

FilePicker.displayName = "FilePicker";

export default FilePicker;
