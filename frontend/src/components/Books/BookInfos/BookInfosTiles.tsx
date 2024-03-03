import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

import BookInfosTile from "./BookInfosTile";
import { ReadBookDTO } from "../../../config/api/books/books.types";
import booksMessages from "../../../messages/booksMessages";

type Props = {
  book: ReadBookDTO;
};

const BookInfosTiles: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { book } = props;

  return (
    <Grid container spacing={2} sx={{ mt: "0.1rem" }}>
      <BookInfosTile
        icon={<PersonIcon color="primary" />}
        label={t(booksMessages.bookAuthor.key) + ":"}
        infos={book.authors}
        avatar
      />
      <BookInfosTile
        icon={<CategoryIcon color="primary" />}
        label={t(booksMessages.bookGenre.key) + ":"}
        infos={book.genres}
      />
      <BookInfosTile
        icon={<LocalOfferIcon color="primary" />}
        label={t(booksMessages.bookTags.key) + ":"}
        infos={book.tags}
      />
      <BookInfosTile
        icon={<LanguageIcon color="primary" />}
        label={t(booksMessages.bookLanguage.key) + ":"}
        infos={book.language}
      />
    </Grid>
  );
};

export default BookInfosTiles;
