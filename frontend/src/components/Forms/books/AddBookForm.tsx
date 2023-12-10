import { Box } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import validationMessages from "../../../messages/validationMessages";
import AutocompleteInput from "../common/AutocompleteInput";
import authorsApi from "../../../config/api/authors/authors";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import FilePicker from "../common/FilePicker";
import { CreateBookDTO } from "../../../config/api/books/books.types";
import { booksApi } from "../../../config/api/books/books";

const AddBookForm = () => {
  const { t } = useTranslation();

  const {
    data: authors,
    isLoading: isFetchingAuthorsLoading,
    isError: isFetchingAuthorsError,
  } = useQuery({
    queryFn: authorsApi.getAllAuthors,
    queryKey: ["authors"],
  });
  const {
    isLoading: isCreatingLoading,
    isError: isCreatingError,
    mutate: createBook,
  } = useMutation({
    mutationFn: booksApi.createBook,
  });

  const formik = useFormikLanguage({
    initialValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      authors: [],
      cover: null,
    } as CreateBookDTO,
    validationSchema: Yup.object({
      title: Yup.string().required(t(validationMessages.fieldRequired.key)),
      shortDescription: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
      longDescription: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
      authors: Yup.array().test(
        "at-least-one",
        t(validationMessages.fieldRequired.key),
        function (value) {
          return value && value.length > 0;
        },
      ),
      cover: Yup.mixed().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      console.log("Add a new book");
      console.log(values);
      createBook(values);
    },
  });

  if (isFetchingAuthorsError) {
    return <ErrorMessage message="Something went wrong. Try again later" />;
  }

  if (isFetchingAuthorsLoading) {
    return <LoadingSpinner />;
  }

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
      <Input id="title" label="Title" formik={formik} />
      <Input
        id="shortDescription"
        label="Short description"
        formik={formik}
        multiline
        maxLength={100}
      />
      <Input
        id="longDescription"
        label="Long description"
        multiline
        minRows={4}
        maxRows={10}
        formik={formik}
      />
      <AutocompleteInput
        id="authors"
        label="Authors"
        formik={formik}
        options={authors}
        getOptionLabel={(option) => {
          return option.firstName + " " + option.lastName;
        }}
      />
      <FilePicker id="cover" title="Book cover:" formik={formik} />
      {isCreatingLoading && <LoadingSpinner />}
      {!isCreatingLoading && (
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          Add book
        </ActionButton>
      )}
      {isCreatingError && (
        <ErrorMessage message="Something went wrong. Try again later" />
      )}
    </Box>
  );
};

export default AddBookForm;
