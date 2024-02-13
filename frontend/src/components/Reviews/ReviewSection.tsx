import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

import COLORS from "../../palette/colors";
import ReviewsList from "./ReviewsList";
import booksMessages from "../../messages/booksMessages";

const ReviewsSection = () => {
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
      <ReviewsList />
    </Box>
  );
};

export default ReviewsSection;
