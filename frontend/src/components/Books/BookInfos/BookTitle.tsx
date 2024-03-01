import { Box, Rating, Typography } from "@mui/material";

import COLORS from "../../../palette/colors";
import { BookRating } from "../../../config/api/common/common.types";

type Props = {
  title: string;
  rating: BookRating;
};

const BookTitle: React.FC<Props> = (props) => {
  const ratingValue = props.rating
    ? Math.round(props.rating.rateAverage * 10) / 10
    : 0;
  const ratingCount = props.rating.rateCount;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        borderBottom: `1px dashed ${COLORS.gray200}`,
        padding: "0.5rem",
      }}
    >
      <Typography variant="h3" sx={{ color: COLORS.gray200 }}>
        {props.title}
      </Typography>
      <Box>
        <Typography
          component="legend"
          sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          {ratingValue} ({ratingCount})
        </Typography>
        <Rating value={ratingValue} precision={0.1} size="large" readOnly />
      </Box>
    </Box>
  );
};

export default BookTitle;
