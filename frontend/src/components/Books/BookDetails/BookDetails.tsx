import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ActionButton from "../../UI/ActionButton";
import { motion } from "framer-motion";

import classes from "./BookDetails.module.css";

type Props = {
  id: number;
  title: string;
  author: string;
  zIndex: number;
};

const BookDetails: React.FC<Props> = (props) => {
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
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <ActionButton>Szczegóły</ActionButton>
      </Box>
    </Box>
  );
};

export default BookDetails;
