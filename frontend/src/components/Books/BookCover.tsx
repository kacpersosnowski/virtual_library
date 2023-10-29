import { Box } from "@mui/material";
import React from "react";

type Props = {
  coverImage: string;
};

const BookCover: React.FC<Props> = (props) => {
  return (
    <Box
      component="img"
      src={props.coverImage}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        objectFit: "cover",
      }}
    />
  );
};

export default BookCover;
