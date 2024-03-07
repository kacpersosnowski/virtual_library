import { Box, SxProps, Theme } from "@mui/material";
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

type Props = {
  initialValues?: { id: string; rating: number; content: string };
  sx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  onCancel?: () => void;
};

const AddEditReviewForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    isLoading: isCreatingLoading,
    isError: isCreatingError,
    mutate: createReview,
  } = useMutation({
    mutationFn: reviewsApi.createReview,
    onSuccess: () => {
      formik.handleReset(null);
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries(["books", id]);
      dispatch(
        snackbarActions.show(t(booksMessages.bookReviewsAddFormSuccess.key)),
      );
    },
  });
  const {
    isLoading: isUpdatingLoading,
    isError: isUpdatingError,
    mutate: updateReview,
  } = useMutation({
    mutationFn: reviewsApi.updateReview,
    onSuccess: () => {
      props.onCancel();
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries(["books", id]);
      dispatch(
        snackbarActions.show(t(booksMessages.bookReviewsUpdateFormSuccess.key)),
      );
    },
  });

  const initialValues = {
    reviewRating: props.initialValues?.rating || 0,
    reviewContent: props.initialValues?.content || "",
  };

  const formik = useFormikLanguage({
    initialValues,
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
      const data = {
        bookId: id,
        rating: values.reviewRating,
        content: values.reviewContent,
      };
      if (!props.initialValues) {
        createReview(data);
      } else {
        updateReview({ id: props.initialValues.id, newData: data });
      }
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
        ...props.sx,
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
        sx={{ width: { xs: "100%", md: "80%" }, ...props.inputSx }}
      />
      {(isCreatingLoading || isUpdatingLoading) && <LoadingSpinner />}
      {!isCreatingLoading && !isUpdatingLoading && (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {props.initialValues && (
            <ActionButton
              type="button"
              sx={{ mt: "0.5rem" }}
              variant="outlined"
              color="primary"
              onClick={props.onCancel}
            >
              {t(booksMessages.bookReviewsUpdateFormCancelButton.key)}
            </ActionButton>
          )}
          <ActionButton type="submit" sx={{ mt: "0.5rem" }}>
            {props.initialValues
              ? t(booksMessages.bookReviewsUpdateFormSaveButton.key)
              : t(booksMessages.bookReviewsAddFormSubmitButton.key)}
          </ActionButton>
        </Box>
      )}
      {(isCreatingError || isUpdatingError) && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddEditReviewForm;
