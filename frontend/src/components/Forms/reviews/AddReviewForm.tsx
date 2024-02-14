import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import validationMessages from "../../../messages/validationMessages";
import Input from "../common/Input";
import Rating from "../common/Rating";
import ActionButton from "../../UI/ActionButton";
import COLORS from "../../../palette/colors";
import { useMutation } from "react-query";
import { reviewsApi } from "../../../config/api/reviews/reviews";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import booksMessages from "../../../messages/booksMessages";

const AddReviewForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    isLoading,
    isError,
    mutate: createReview,
  } = useMutation({
    mutationFn: reviewsApi.createReview,
    onSuccess: () => {
      formik.handleReset(null);
      queryClient.invalidateQueries("reviews");
      dispatch(
        snackbarActions.show(t(booksMessages.bookReviewsAddFormSuccess.key)),
      );
    },
  });

  const formik = useFormikLanguage({
    initialValues: { reviewRating: 0, reviewContent: "" },
    validationSchema: Yup.object({
      reviewRating: Yup.number()
        .integer()
        .min(1, t(validationMessages.fieldRequired.key))
        .required(t(validationMessages.fieldRequired.key)),
      reviewContent: Yup.string().required(
        t(validationMessages.fieldRequired.key),
      ),
    }),
    onSubmit: (values) => {
      createReview({
        bookId: id,
        rating: values.reviewRating,
        content: values.reviewContent,
      });
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "100%", md: "70%" },
        m: "0 auto 2rem auto",
        border: `1px solid ${COLORS.gray200}`,
        borderRadius: "10px",
        p: "10px",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Rating
        id="reviewRating"
        label={t(booksMessages.bookReviewsAddFormRating.key)}
        formik={formik}
        sx={{ mb: "0.5rem" }}
      />
      <Input
        id="reviewContent"
        label={t(booksMessages.bookReviewsAddFormContent.key)}
        multiline
        minRows={4}
        maxRows={10}
        formik={formik}
        sx={{ width: { xs: "100%", md: "80%" } }}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton type="submit" sx={{ mt: "0.5rem" }}>
          {t(booksMessages.bookReviewsAddFormSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddReviewForm;
