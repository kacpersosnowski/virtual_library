import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

const BookScrollCard: React.FC<PropsWithChildren> = (props) => {
  return (
    <Box sx={{ px: { xs: "0", sm: "15px", md: "60px" } }}>{props.children}</Box>
  );
};

export default BookScrollCard;
