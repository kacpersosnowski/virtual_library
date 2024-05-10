import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import bookListsApi from "../../config/api/bookLists/bookLists";
import Card from "../../components/UI/Card/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import UserBookListView from "../../components/BookLists/UserBookListView";

import booksBg from "../../assets/books-bg3.jpg";

const BookListDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    data: bookList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookList", id],
    queryFn: () => bookListsApi.getBookList(id),
  });

  let content = <UserBookListView bookList={bookList} />;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        {content}
      </Card>
    </ImageBackground>
  );
};

export default BookListDetailsPage;
