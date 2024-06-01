import { Box, Divider, Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";

import booksBg from "../../assets/books-bg3.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import Card from "../../components/UI/Card/Card";
import { booksApi } from "../../config/api/books/books";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import ActionButton from "../../components/UI/ActionButton";
import BookTitle from "../../components/Books/BookInfos/BookTitle";
import BookInfosTiles from "../../components/Books/BookInfos/BookInfosTiles";
import BookDescription from "../../components/Books/BookInfos/BookDescription";
import booksMessages from "../../messages/booksMessages";
import errorMessages from "../../messages/errorMessages";
import ReviewsSection from "../../components/Reviews/ReviewSection";
import SaveBookOnListModal from "../../components/BookLists/SaveBookOnListModal";
import { AuthContext } from "../../store/AuthContext/AuthContext";

const BookDetailPage = () => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: () => booksApi.getBookDetails(id),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  let content = null;

  if (book) {
    let isReadingAvailable = isAuthenticated;
    if (!isReadingAvailable && !book.readAuthenticatedOnly) {
      isReadingAvailable = true;
    }

    content = (
      <>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={book?.cover}
              sx={{ width: { xs: "100%", md: "70%" } }}
            ></Box>
          </Box>
          <Box
            sx={{
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              mt: { xs: "1rem", md: 0 },
              flex: 1,
            }}
          >
            <BookTitle title={book.title} rating={book.rating} />
            <BookInfosTiles book={book} />
            <Divider sx={{ margin: "1rem 0" }} />

            <Tooltip
              title={
                !isReadingAvailable ? t(booksMessages.readBookAccess.key) : ""
              }
              arrow
            >
              <Box sx={{ display: "flex", columnGap: 2 }}>
                <ActionButton
                  sx={{ mt: "1rem", flex: 1 }}
                  scaleOnHover={1.04}
                  onClick={() => navigate(`/book/read/${book.id}`)}
                  disabled={!isReadingAvailable}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BookIcon sx={{ mr: "0.5rem", color: "#0d402f" }} />
                    {t(booksMessages.readBook.key)}
                  </Box>
                </ActionButton>
                {isAuthenticated && (
                  <>
                    <ActionButton
                      sx={{ mt: "1rem" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => setSaveModalOpen(true)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <SaveIcon sx={{ mr: "0.5rem" }} />
                        {t(booksMessages.saveBookOnList.key)}
                      </Box>
                    </ActionButton>
                    <SaveBookOnListModal
                      bookId={id}
                      open={saveModalOpen}
                      handleClose={() => {
                        setSaveModalOpen(false);
                      }}
                    />
                  </>
                )}
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <BookDescription description={book.description} />
        <ReviewsSection />
      </>
    );
  }

  if (isError) {
    content = (
      <ErrorMessage message={t(errorMessages.fetchBookDetailsError.key)} />
    );
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "85%" } }}>{content}</Card>
    </ImageBackground>
  );
};

export default BookDetailPage;
