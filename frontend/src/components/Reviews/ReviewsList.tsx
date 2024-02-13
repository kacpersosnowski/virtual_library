import { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { reviewsApi } from "../../config/api/reviews/reviews";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import ReviewItem from "./ReviewItem";
import booksMessages from "../../messages/booksMessages";
import errorMessages from "../../messages/errorMessages";
import useIsAdmin from "../../hooks/useIsAdmin";
import useFetchUserData from "../../hooks/useFetchUserData";

const ReviewsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: reviewsReponse,
    isLoading: isFetchingReviewsLoading,
    isError: isFetchingReviewsError,
  } = useQuery({
    queryKey: ["reviews", { page: currentPage, bookId: id }],
    queryFn: () =>
      reviewsApi.getReviewsForBook({
        bookId: id,
        queryData: { page: currentPage },
      }),
  });
  const isAdmin = useIsAdmin();
  const {
    data: user,
    isLoading: isFetchingUserLoading,
    isError: isFetchingUserError,
  } = useFetchUserData();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const reviews = reviewsReponse?.content;
  const totalPages = reviewsReponse
    ? Math.ceil(reviewsReponse.totalElements / 5)
    : 0;

  let currentUser = user;

  if (isFetchingReviewsLoading || isFetchingUserLoading) {
    return <LoadingSpinner />;
  }

  if (isFetchingReviewsError) {
    return (
      <ErrorMessage message={t(errorMessages.fetchBookReviewsError.key)} />
    );
  }

  if (isFetchingUserError) {
    currentUser = null;
  }

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "70%" },
        ml: "auto",
        mr: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 2,
      }}
    >
      {reviews.length === 0 && (
        <Typography sx={{ fontSize: "1.5rem" }}>
          {t(booksMessages.bookReviewsNoReviews.key)}
        </Typography>
      )}
      {reviews.map((review, index) => {
        return (
          <ReviewItem
            review={review}
            currentUser={currentUser}
            isAdmin={isAdmin}
            key={index}
          />
        );
      })}
      {totalPages > 1 && (
        <Pagination
          color="secondary"
          count={totalPages}
          siblingCount={2}
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default ReviewsList;
