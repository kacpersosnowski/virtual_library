import { Box } from "@mui/material";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";

const AddBookForm = () => {
  const formik = useFormikLanguage({
    initialValues: { bookTitle: "" },
    onSubmit: () => {
      console.log("Add a new book");
    },
  });

  return (
    <Box
      component="form"
      sx={{
        width: { xs: "95%", sm: "70%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "2rem",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Input id="bookTitle" label="Title" formik={formik} />
      <ActionButton
        sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
        type="submit"
      >
        Add book
      </ActionButton>
    </Box>
  );
};

export default AddBookForm;
