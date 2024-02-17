import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import { CreateGenreDTO, Genre } from "../../../config/api/genres/genres.types";
import genresApi from "../../../config/api/genres/genres";
import AddEditGenreForm from "./AddEditGenreForm";

const GenreForm = () => {
  const [genre, setGenre] = useState<Genre>();
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      genresApi
        .getGenreDetails(id)
        .then((genre) => setGenre(genre))
        .catch(() => setIsError(true));
    }
  }, [id]);

  let initialValues: CreateGenreDTO = null;
  if (genre) {
    initialValues = {
      name: genre.name,
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
        genre ? (
          <AddEditGenreForm
            initialValues={initialValues}
            sx={{ width: { xs: "95%", sm: "70%" }, mt: "2rem" }}
          />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <AddEditGenreForm
          sx={{ width: { xs: "95%", sm: "70%" }, mt: "2rem" }}
        />
      )}
    </>
  );
};

export default GenreForm;
