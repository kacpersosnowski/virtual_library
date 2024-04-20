import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Banner from "../components/Layout/Banner/Banner";
import BooksList from "../components/Books/BooksList/BooksList";
import mainPageMessages from "../messages/mainPageMessages";
import { booksApi } from "../config/api/books/books";

const MainPage = () => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getMostPopularBooks,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Banner />
      <BooksList
        headerText={t(mainPageMessages.booksListHeader.key)}
        books={books}
        isLoading={isLoading}
        isError={isError}
        displayFooter
        footerText={t(mainPageMessages.buttonsSeeMore.key)}
        footerOnClick={() => navigate("/books-by-category")}
      />
    </>
  );
};

export default MainPage;
