import { useTranslation } from "react-i18next";

import Banner from "../components/Layout/Banner/Banner";
import BooksList from "../components/Books/BooksList/BooksList";
import mainPageMessages from "../messages/mainPageMessages";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <BooksList
        headerText={t(mainPageMessages.booksListHeader.key)}
        footerText={t(mainPageMessages.buttonsSeeMore.key)}
      />
    </>
  );
};

export default MainPage;
