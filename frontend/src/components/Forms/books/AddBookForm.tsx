import { useRef } from "react";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import validationMessages from "../../../messages/validationMessages";
import errorMessages from "../../../messages/errorMessages";
import AutocompleteInput from "../common/AutocompleteInput";
import authorsApi from "../../../config/api/authors/authors";
import genresApi from "../../../config/api/genres/genres";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import FilePicker from "../common/FilePicker";
import { CreateBookDTO } from "../../../config/api/books/books.types";
import { booksApi } from "../../../config/api/books/books";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import adminMessages from "../../../messages/adminMessages";
import arrayNotEmptyValidator from "../../../config/validators/arrayNotEmptyValidator";

const AddBookForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);

  const {
    data: authors,
    isLoading: isFetchingAuthorsLoading,
    isError: isFetchingAuthorsError,
  } = useQuery({
    queryFn: authorsApi.getAllAuthors,
    queryKey: ["authors"],
  });
  const {
    data: genres,
    isLoading: isFetchingGenresLoading,
    isError: isFetchingGenresError,
  } = useQuery({
    queryFn: genresApi.getAllGenres,
    queryKey: ["genres"],
  });
  const {
    isLoading: isCreatingLoading,
    isError: isCreatingError,
    mutate: createBook,
  } = useMutation({
    mutationFn: booksApi.createBook,
    onSuccess: () => {
      dispatch(
        snackbarActions.show(t(adminMessages.addBookFormSuccessMessage.key)),
      );
      formik.handleReset(null);
      filePickerRef.current.resetPreview();
    },
  });

  const formik = useFormikLanguage({
    initialValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      authors: [],
      genres: [],
      tags: [],
      cover: null,
      content: null,
    } as CreateBookDTO,
    validationSchema: Yup.object({
      title: Yup.string().required(t(validationMessages.fieldRequired.key)),
      shortDescription: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
      longDescription: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
      authors: arrayNotEmptyValidator({
        required: t(validationMessages.fieldRequired.key),
      }),
      genres: arrayNotEmptyValidator({
        required: t(validationMessages.fieldRequired.key),
      }),
      tags: arrayNotEmptyValidator({
        required: t(validationMessages.fieldRequired.key),
      }),
      cover: Yup.mixed().required(t(validationMessages.fieldRequired.key)),
      content: Yup.mixed().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      createBook(values);
    },
  });

  if (isFetchingAuthorsError || isFetchingGenresError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  if (isFetchingAuthorsLoading || isFetchingGenresLoading) {
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
      <Input
        id="title"
        label={t(adminMessages.addBookFormTitle.key)}
        formik={formik}
      />
      <Input
        id="shortDescription"
        label={t(adminMessages.addBookFormShortDescription.key)}
        formik={formik}
        multiline
        maxLength={100}
      />
      <Input
        id="longDescription"
        label={t(adminMessages.addBookFormLongDescription.key)}
        multiline
        minRows={4}
        maxRows={10}
        formik={formik}
      />
      <AutocompleteInput
        id="authors"
        label={t(adminMessages.addBookFormAuthors.key)}
        multiple
        formik={formik}
        options={authors}
        getOptionLabel={(option) => {
          return option.firstName + " " + option.lastName;
        }}
        sx={{ mt: "0.5rem" }}
      />
      <AutocompleteInput
        id="genres"
        label={t(adminMessages.addBookFormGenres.key)}
        multiple
        formik={formik}
        options={genres}
        getOptionLabel={(option) => {
          return option.name;
        }}
        sx={{ mt: "1rem" }}
      />
      <AutocompleteInput
        id="tags"
        label={t(adminMessages.addBookFormTags.key)}
        freeSolo
        multiple
        formik={formik}
        options={[]}
        isOptionEqualToValue={(option, value) => option === value}
        sx={{ mt: "1rem" }}
      />
      <FilePicker
        id="cover"
        title={t(adminMessages.addBookFormCover.key)}
        formik={formik}
        previewEnabled
        ref={filePickerRef}
      />
      <FilePicker
        id="content"
        title="Treść:"
        formik={formik}
        acceptedFormats="application/pdf"
      />
      {isCreatingLoading && <LoadingSpinner />}
      {!isCreatingLoading && (
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {t(adminMessages.addBookFormSubmitButton.key)}
        </ActionButton>
      )}
      {isCreatingError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddBookForm;
