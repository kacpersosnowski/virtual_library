import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
import AddAuthorPopover from "../authors/AddAuthorPopover";
import { Author } from "../../../config/api/authors/authors.types";
import { Genre } from "../../../config/api/genres/genres.types";
import AddGenrePopover from "../genres/AddGenrePopover";

type Props = {
  initialValues?: CreateBookDTO;
};

const AddEditBookForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const {
    isLoading: isUpdatingLoading,
    isError: isUpdatingError,
    mutate: updateBook,
  } = useMutation({
    mutationFn: booksApi.updateBook,
    onSuccess: () => {
      dispatch(
        snackbarActions.show(t(adminMessages.updateBookFormSuccessMessage.key)),
      );
    },
  });

  const initialValues =
    props.initialValues ||
    ({
      title: "",
      description: "",
      authors: [],
      genres: [],
      tags: [],
      cover: null,
      content: null,
    } as CreateBookDTO);

  const formik = useFormikLanguage({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required(t(validationMessages.fieldRequired.key)),
      description: Yup.string().required(
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
      if (!props.initialValues) {
        createBook(values);
      } else {
        updateBook({ id, book: values });
      }
    },
  });

  const addChosenAuthor = (author: Author) => {
    formik.setFieldValue("authors", [...formik.values.authors, author]);
  };

  const addChosenGenre = (genre: Genre) => {
    formik.setFieldValue("genres", [...formik.values.genres, genre]);
  };

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
      <Box sx={{ width: "100%", textAlign: "left", mb: "0.5rem" }}>
        <ActionButton onClick={() => navigate("/admin/books")}>
          <ArrowBackIcon />
          {t(adminMessages.addBookFormBackToList.key)}
        </ActionButton>
      </Box>
      <Typography variant="h4" sx={{ mb: "1rem" }}>
        {props.initialValues
          ? t(adminMessages.updateBookFormHeader.key)
          : t(adminMessages.addBookFormHeader.key)}
      </Typography>
      <Input
        id="title"
        label={t(adminMessages.addBookFormTitle.key)}
        formik={formik}
      />
      <Input
        id="description"
        label={t(adminMessages.addBookFormDescription.key)}
        multiline
        minRows={4}
        maxRows={10}
        formik={formik}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "0.5rem",
          width: "80%",
        }}
      >
        <AutocompleteInput
          id="authors"
          label={t(adminMessages.addBookFormAuthors.key)}
          multiple
          formik={formik}
          options={authors}
          getOptionLabel={(option) => {
            return option.firstName + " " + option.lastName;
          }}
          sx={{ flex: 1 }}
          errorSx={{ width: "100%" }}
          errorPortalId="authors-error"
        />
        <AddAuthorPopover addChosenAuthor={addChosenAuthor} />
      </Box>
      <Box id="authors-error" sx={{ width: "80%" }}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
          width: "80%",
        }}
      >
        <AutocompleteInput
          id="genres"
          label={t(adminMessages.addBookFormGenres.key)}
          multiple
          formik={formik}
          options={genres}
          getOptionLabel={(option) => {
            return option.name;
          }}
          sx={{ flex: 1 }}
          errorSx={{ width: "100%" }}
          errorPortalId="genres-error"
        />
        <AddGenrePopover addChosenGenre={addChosenGenre} />
      </Box>
      <Box id="genres-error" sx={{ width: "80%" }}></Box>
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
      {(isCreatingLoading || isUpdatingLoading) && <LoadingSpinner />}
      {!isCreatingLoading && !isUpdatingLoading && (
        <ActionButton
          sx={{ mt: "0.5rem", width: "80%", mb: "1rem" }}
          type="submit"
        >
          {props.initialValues
            ? t(adminMessages.updateBookFormSubmitButton.key)
            : t(adminMessages.addBookFormSubmitButton.key)}
        </ActionButton>
      )}
      {(isCreatingError || isUpdatingError) && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddEditBookForm;
