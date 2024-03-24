import { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { reviewsApi } from "../../config/api/reviews/reviews";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import ReviewItem from "./ReviewItem";
import booksMessages from "../../messages/booksMessages";
import errorMessages from "../../messages/errorMessages";
import useFetchUserData from "../../hooks/useFetchUserData";
import { Review } from "../../config/api/reviews/reviews.types";
import AlertDialog from "../Layout/common/AlertDialog";
import { queryClient } from "../../config/api";
import { snackbarActions } from "../../store/redux/slices/snackbar-slice";
import commonMessages from "../../messages/commonMessages";

const ReviewsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review>(null);
  const dispatch = useDispatch();
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
  const {
    user,
    isLoading: isFetchingUserLoading,
    error: fetchingUserError,
  } = useFetchUserData();
  const {
    mutate: deleteReview,
    isLoading: isDeletingLoading,
    isError: isDeletingError,
  } = useMutation({
    mutationFn: reviewsApi.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["books", id]);
      handleDeleteDialogClose();
      dispatch(
        snackbarActions.show(t(booksMessages.bookReviewsDeleteFormSuccess.key)),
      );
    },
    onError: () => {
      handleDeleteDialogClose();
    },
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const handleDeleteDialogOpen = (review: Review) => {
    setReviewToDelete(review);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setReviewToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteReview = () => {
    deleteReview(reviewToDelete.id);
  };

  const reviews = reviewsReponse?.content;
  const totalPages = reviewsReponse
    ? Math.ceil(reviewsReponse.totalElements / 10)
    : 0;

  if (isFetchingReviewsLoading || isFetchingUserLoading || isDeletingLoading) {
    return <LoadingSpinner />;
  }

  if (isFetchingReviewsError) {
    return (
      <ErrorMessage message={t(errorMessages.fetchBookReviewsError.key)} />
    );
  }

  if (fetchingUserError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      {isDeletingError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={handleDeleteDialogClose}
        title={t(booksMessages.bookReviewsDeleteFormDialogTitle.key)}
        contentText={t(booksMessages.bookReviewsDeleteFormDialogContent.key)}
        cancelButtonText={t(commonMessages.cancelButtonText.key)}
        agreeButton={
          <Button
            onClick={handleDeleteReview}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(commonMessages.deleteButtonText.key)}
          </Button>
        }
      />
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
        {reviews.map((review) => {
          return (
            <ReviewItem
              review={review}
              currentUser={user}
              handleDeleteDialogOpen={handleDeleteDialogOpen}
              key={review.id}
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
    </>
  );
};

export default ReviewsList;
