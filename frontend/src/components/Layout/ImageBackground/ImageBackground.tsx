import { Box, SxProps, Theme } from "@mui/material";

import classes from "./ImageBackground.module.css";
import { PropsWithChildren } from "react";

type Props = {
  image: string;
  containerSx?: SxProps<Theme>;
};

const ImageBackground: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Box
      className={classes["background-container"]}
      sx={{
        backgroundImage: `url(${props.image})`,
        ...props.containerSx,
      }}
    >
      <Box className={classes["gradient"]} />
      {props.children}
    </Box>
  );
};

export default ImageBackground;
