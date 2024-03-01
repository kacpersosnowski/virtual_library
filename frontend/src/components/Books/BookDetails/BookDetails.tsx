import { Box, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import classes from "./BookDetails.module.css";
import ActionButton from "../../UI/ActionButton";
import booksMessages from "../../../messages/booksMessages";

type Props = {
  id: string;
  title: string;
  author: string;
  rating: number;
  zIndex: number;
};

const BookDetails: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: props.zIndex,
        width: "100%",
        height: "100%",
        bgcolor: "#816565",
        p: "0.4rem",
        color: "#cecece",
        cursor: "default",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      component={motion.div}
      className={`${classes["book-details"]} book`}
    >
      <Typography
        paragraph
        sx={{
          fontWeight: "700",
          textAlign: "center",
          textTransform: "uppercase",
          mb: "0.1rem",
        }}
      >
        {props.title}
      </Typography>
      <Typography paragraph sx={{ fontWeight: "400" }}>
        {props.author}
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Rating
          value={props.rating || 0}
          precision={0.1}
          size="large"
          readOnly
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <ActionButton onClick={() => navigate(`/book/${props.id}`)}>
          {t(booksMessages.bookItemDetails.key)}
        </ActionButton>
      </Box>
    </Box>
  );
};

export default BookDetails;
