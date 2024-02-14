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

const ReviewActions = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title={t(booksMessages.bookReviewsEditTooltip.key)} arrow>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t(booksMessages.bookReviewsDeleteTooltip.key)} arrow>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

type Props = {
  review: Review;
  currentUser: UserData;
};

const ReviewItem: React.FC<Props> = (props) => {
  const canEditAndDelete = () => {
    return (
      props.currentUser &&
      (props.currentUser.id === props.review.author.id ||
        props.currentUser.authority === AUTHORITIES.ADMIN)
    );
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
              baseName={props.review.author.email.toUpperCase()}
              tooltipTitle={props.review.author.email}
            />
          </Box>
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
              {props.review.author.email.slice(0, 37)}
            </Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Rating value={props.review.rating} readOnly />
              <FormattedDateParagraph date={props.review.created} />
            </Box>
          </Box>
        </Box>
        {canEditAndDelete() && <ReviewActions />}
      </Box>
      <Box sx={{ textAlign: "justify" }}>{props.review.content}</Box>
    </Box>
  );
};

export default ReviewItem;
