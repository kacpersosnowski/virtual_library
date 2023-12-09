import { PropsWithChildren } from "react";
import { Box, SxProps, Theme } from "@mui/material";

import classes from "./Card.module.css";

type Props = {
  sx?: SxProps<Theme>;
};

const Card: React.FC<PropsWithChildren<Props>> = (props) => {
  const sx = {
    width: { xs: "100%", sm: "50%", lg: "25%" },
    ...props.sx,
  };

  return (
    <Box className={classes.card} sx={sx}>
      {props.children}
    </Box>
  );
};

export default Card;
