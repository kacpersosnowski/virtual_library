import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import COLORS from "../../palette/colors";
import AddEditReviewForm from "../Forms/reviews/AddEditReviewForm";
import ReviewsList from "./ReviewsList";
import booksMessages from "../../messages/booksMessages";
import { AuthContext } from "../../store/AuthContext/AuthContext";
import ActionButton from "../UI/ActionButton";

const ReviewsSection = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        borderTop: `1px dashed ${COLORS.gray200}`,
        mt: "1rem",
        padding: "1.5rem",
      }}
    >
      <Typography sx={{ textAlign: "left", mb: "1rem" }} variant="h4">
        {t(booksMessages.bookReviewsTitle.key)}
      </Typography>
      {isAuthenticated ? (
        <AddEditReviewForm />
      ) : (
        <ActionButton onClick={() => navigate("/login")} sx={{ mb: "2rem" }}>
          {t(booksMessages.bookReviewsAddFormLogin.key)}
        </ActionButton>
      )}
      <ReviewsList />
    </Box>
  );
};

export default ReviewsSection;
