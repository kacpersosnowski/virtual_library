import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import {
  Author,
  CreateAuthorDTO,
} from "../../../config/api/authors/authors.types";
import authorsApi from "../../../config/api/authors/authors";
import AddEditAuthorForm from "./AddEditAuthorForm";

const AuthorForm = () => {
  const [author, setAuthor] = useState<Author>();
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      authorsApi
        .getAuthorDetails(id)
        .then((author) => setAuthor(author))
        .catch(() => setIsError(true));
    }
  }, [id]);

  let initialValues: CreateAuthorDTO = null;
  if (author) {
    initialValues = {
      firstName: author.firstName,
      lastName: author.lastName,
    };
  }

  if (isError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <>
      {id ? (
        author ? (
          <AddEditAuthorForm
            initialValues={initialValues}
            sx={{ width: { xs: "95%", sm: "70%" }, mt: "2rem" }}
          />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <AddEditAuthorForm
          sx={{ width: { xs: "95%", sm: "70%" }, mt: "2rem" }}
        />
      )}
    </>
  );
};

export default AuthorForm;
