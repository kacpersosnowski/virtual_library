import { useTranslation } from "react-i18next";

import MainNavbar from "../components/Layout/MainNavbar";
import Banner from "../components/Layout/Banner/Banner";
import BooksList from "../components/Books/BooksList/BooksList";
import Footer from "../components/Layout/Footer";
import mainPageMessages from "../messages/mainPageMessages";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainNavbar />
      <Banner />
      <BooksList
        headerText={t(mainPageMessages.booksListHeader.key)}
        footerText={t(mainPageMessages.buttonsSeeMore.key)}
      />
      <Footer />
    </>
  );
};

export default MainPage;
