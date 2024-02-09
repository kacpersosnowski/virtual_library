import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import booksMessages from "../../../messages/booksMessages";
import COLORS from "../../../palette/colors";

type Props = {
  description: string;
};

const BookDescription: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const paragraphs = props.description.split("\n");
  return (
    <Box
      sx={{
        borderTop: `1px dashed ${COLORS.gray200}`,
        mt: "1rem",
        padding: "1.5rem",
      }}
    >
      <Typography sx={{ textAlign: "left" }} variant="h4">
        {t(booksMessages.bookDescription.key)}
      </Typography>
      {paragraphs.map((p, index) => (
        <Typography
          paragraph
          key={index}
          sx={{ mt: "1rem", textAlign: "justify", color: COLORS.gray200 }}
        >
          {p}
        </Typography>
      ))}
    </Box>
  );
};

export default BookDescription;
