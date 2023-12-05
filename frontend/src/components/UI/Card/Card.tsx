import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

import classes from "./Card.module.css";

const Card: React.FC<PropsWithChildren> = (props) => {
  return (
    <Box
      className={classes.card}
      sx={{ width: { xs: "100%", sm: "50%", lg: "25%" } }}
    >
      {props.children}
    </Box>
  );
};

export default Card;
