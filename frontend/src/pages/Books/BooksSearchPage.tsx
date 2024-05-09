import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Box, Pagination, Typography } from "@mui/material";

import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import booksBg from "../../assets/books-bg3.jpg";
import Card from "../../components/UI/Card/Card";
import { booksApi } from "../../config/api/books/books";
import BookItemCompressed from "../../components/Books/BookItemCompressed";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import booksMessages from "../../messages/booksMessages";

const BooksSearchPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const {
    data: booksResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "books",
      { page: currentPage, search: searchParams.get("search") },
    ],
    queryFn: () =>
      booksApi.getAllBooksWithParams({
        page: currentPage,
        search: searchParams.get("search"),
      }),
  });

  const books = booksResponse?.content;
  const totalPages = booksResponse
    ? Math.ceil(booksResponse.totalElements / 10)
    : 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  let content = (
    <>
      <Typography sx={{ textAlign: "left", px: "4rem" }} variant="h4">
        {t(booksMessages.searchResultsHeader.key)} (
        {booksResponse?.totalElements})
      </Typography>
      {books?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h3">
            {t(booksMessages.noSearchResults.key)}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        {books?.map((book) => {
          return <BookItemCompressed book={book} key={book.id} />;
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        {totalPages > 1 && (
          <Pagination
            color="secondary"
            count={totalPages}
            siblingCount={2}
            page={currentPage + 1}
            onChange={handlePageChange}
            disabled={totalPages <= 1}
          />
        )}
      </Box>
    </>
  );

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <ImageBackground image={booksBg}>
      <Card
        sx={{
          width: { xs: "100%", sm: "70%" },
          py: "2rem",
          minHeight: "70vh",
        }}
      >
        {content}
      </Card>
    </ImageBackground>
  );
};

export default BooksSearchPage;
