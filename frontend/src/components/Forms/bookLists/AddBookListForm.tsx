import { useState } from "react";
import { useMutation } from "react-query";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import bookListsMessages from "../../../messages/bookListsMessages";
import useFormikLanguage from "../../../hooks/useFormikLanguage";
import validationMessages from "../../../messages/validationMessages";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import AddBookToListForm from "./AddBookToListForm";
import bookListsApi from "../../../config/api/bookLists/bookLists";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";

const AddBookListForm = () => {
  const [books, setBooks] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: createBookList,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: bookListsApi.addBookList,
    onSuccess: (values) => {
      queryClient.invalidateQueries(["bookLists"]);
      dispatch(
        snackbarActions.show(t(bookListsMessages.addNewListSuccessMessage.key)),
      );
      navigate(`/book-lists/${values.id}`);
    },
  });

  const formik = useFormikLanguage({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      const bookIds =
        books.length > 0
          ? books.map((book) => ({
              id: book,
            }))
          : [];
      createBookList({ name: values.name, books: bookIds });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: "1rem" }}>
        {t(bookListsMessages.addNewListHeader.key)}
      </Typography>
      <Input
        id="name"
        label="Nazwa listy"
        formik={formik}
        sx={{ width: { xs: "100%", md: "50%" } }}
      />
      <AddBookToListForm
        list={undefined}
        addComponent={
          <Typography variant="h6">
            {t(bookListsMessages.addChosenBooksToListPrompt.key)}
          </Typography>
        }
        setBooksToAdd={setBooks}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton type="submit" sx={{ mt: "2rem" }}>
          {t(bookListsMessages.createListSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage
          message={t(validationMessages.somethingWentWrongError.key)}
        />
      )}
    </Box>
  );
};

export default AddBookListForm;
