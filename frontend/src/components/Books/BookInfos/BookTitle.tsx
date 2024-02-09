import { Box, Rating, Typography } from "@mui/material";

import COLORS from "../../../palette/colors";

type Props = {
  title: string;
};

const BookTitle: React.FC<Props> = (props) => {
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
          4.3
        </Typography>
        <Rating value={4.3} precision={0.1} size="large" readOnly />
      </Box>
    </Box>
  );
};

export default BookTitle;
