import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";

import { BOOK_HEIGHT, BOOK_WITDH } from "../../constants/common";
import { BookItemData } from "../../config/api/books/books.types";
import COLORS from "../../palette/colors";

type Props = {
  book: BookItemData;
  onClick?: () => void;
};

const BookItemCompressed: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();

  const mouseEnterHandler = () => {
    animate("img.cover", { scale: 1.05 }, { duration: 0.4 });
  };

  const mouseOverHandler = () => {
    animate("img.cover", { scale: 1 });
  };

  return (
    <Box
      sx={{
        width: BOOK_WITDH + 50,
        height: BOOK_HEIGHT + 60,
        p: "10px",
        borderRadius: "5px",
        border: `2px solid ${COLORS.gray400}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
      }}
      ref={scope}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseOverHandler}
      onClick={props.onClick || (() => navigate(`/book/${props.book.id}`))}
    >
      <Box
        component={motion.img}
        src={props.book.cover}
        sx={{
          objectFit: "fill",
          width: "100%",
          height: "250px",
          borderRadius: "5px",
        }}
        className="cover"
      />
      <Box
        sx={{
          display: "flex",
          height: "100px",
          fontSize: "1rem",
          mt: "10px",
          flexDirection: "column",
        }}
      >
        <Box>{props.book.title}</Box>
        <Box sx={{ color: COLORS.gray300 }}>{props.book.authorList}</Box>
        <Box sx={{ display: "flex" }}>
          <StarIcon />
          <Typography>{props.book.rating.rateAverage}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookItemCompressed;
