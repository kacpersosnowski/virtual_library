import { Box } from "@mui/material";

import classes from "./ImageBackground.module.css";
import { PropsWithChildren } from "react";

type Props = {
  image: string;
};

const ImageBackground: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Box className={classes["background-container"]}>
      <Box className={classes["gradient"]} />
      <Box
        className={classes["overlay-image"]}
        component="img"
        src={props.image}
      />
      {props.children}
    </Box>
  );
};

export default ImageBackground;
