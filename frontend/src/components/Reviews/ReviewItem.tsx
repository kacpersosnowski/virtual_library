import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import COLORS from "../../palette/colors";
import { Review } from "../../config/api/reviews/reviews.types";
import ColoredAvatar from "../Layout/common/ColoredAvatar";
import FormattedDateParagraph from "../Layout/common/FormattedDateParagraph";
import booksMessages from "../../messages/booksMessages";
import { UserData } from "../../config/api/users/users.types";
import { AUTHORITIES } from "../../constants/authorities";
import AddEditReviewForm from "../Forms/reviews/AddEditReviewForm";

const canEditReview = (user: UserData, review: Review) => {
  return user && user.id === review.author.id;
};

const canDeleteReview = (user: UserData, review: Review) => {
  return (
    user &&
    (user.authority === AUTHORITIES.ADMIN || user.id === review.author.id)
  );
};

type ActionsProps = {
  review: Review;
  user: UserData;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  handleDeleteDialogOpen: (review: Review) => void;
};

const ReviewActions: React.FC<ActionsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {canEditReview(props.user, props.review) && (
        <Tooltip title={t(booksMessages.bookReviewsEditTooltip.key)} arrow>
          <IconButton color="primary" onClick={() => props.setIsEditMode(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {canDeleteReview(props.user, props.review) && (
        <Tooltip title={t(booksMessages.bookReviewsDeleteTooltip.key)} arrow>
          <IconButton
            color="error"
            onClick={() => props.handleDeleteDialogOpen(props.review)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

type Props = {
  review: Review;
  currentUser: UserData;
  handleDeleteDialogOpen: (review: Review) => void;
};

const ReviewItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);

  const editForm = (
    <AddEditReviewForm
      initialValues={{
        id: props.review.id,
        rating: props.review.rating,
        content: props.review.content,
      }}
      sx={{ flex: 1, border: "none", m: 0 }}
      inputSx={{ width: "100%" }}
      onCancel={() => setIsEditMode(false)}
    />
  );

  const updatedDate = (date: string) => {
    return `${t(booksMessages.bookReviewsUpdated.key)} ${date}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: `2px solid ${COLORS.gray300}`,
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: COLORS.gray200,
        p: "1rem",
        gap: "1rem",
        boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
        WebkitBoxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: "1rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ColoredAvatar
              baseName={props.review.author.username.toUpperCase()}
              tooltipTitle={props.review.author.username}
            />
          </Box>
          {!isEditMode && (
            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  maxWidth: { xs: "250px", sm: "500px" },
                }}
              >
                <Typography
                  sx={{
                    overflowWrap: "break-word",
                    textAlign: "left",
                    maxWidth: "100%",
                  }}
                >
                  {props.review.author.username.slice(0, 37)}
                </Typography>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <Rating value={props.review.rating} readOnly />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <FormattedDateParagraph date={props.review.created} />
                {props.review.created !== props.review.lastModified && (
                  <FormattedDateParagraph
                    date={props.review.lastModified}
                    transformFn={updatedDate}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
        {isEditMode && editForm}
        {!isEditMode && (
          <ReviewActions
            setIsEditMode={setIsEditMode}
            review={props.review}
            user={props.currentUser}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
          />
        )}
      </Box>
      {!isEditMode && (
        <Box sx={{ textAlign: "justify" }}>{props.review.content}</Box>
      )}
    </Box>
  );
};

export default ReviewItem;
