import { Box, SxProps, Theme } from "@mui/material";

import classes from "./ImageBackground.module.css";
import { PropsWithChildren, useEffect, useRef } from "react";

type Props = {
  image: string;
  containerSx?: SxProps<Theme>;
};

const ImageBackground: React.FC<PropsWithChildren<Props>> = (props) => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  const initialResize = () => {
    if (backgroundRef.current) {
      const childHeight = backgroundRef.current.lastElementChild?.clientHeight;
      if (childHeight && childHeight >= window.innerHeight - 144) {
        backgroundRef.current.style.height = `${childHeight + 100}px`;
      }
    }
  };

  useEffect(() => {
    initialResize();

    // Resize child accordingly when window size is changed
    const resizeListener = () => {
      if (backgroundRef.current) {
        const childHeight =
          backgroundRef.current.lastElementChild?.clientHeight;
        if (childHeight && window.innerHeight - 144 - childHeight <= 30) {
          backgroundRef.current.style.height = `${childHeight + 100}px`;
        } else {
          backgroundRef.current.style.height = `${window.innerHeight - 144}px`;
        }
      }
    };
    window.addEventListener("resize", resizeListener, false);

    // Resize child accordingly when its size is changed
    let observer: ResizeObserver;
    const childElement = backgroundRef.current?.lastElementChild;
    if (childElement) {
      observer = new ResizeObserver(() => {
        resizeListener();
      });

      observer.observe(childElement);
    }

    return () => {
      window.removeEventListener("resize", resizeListener);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Box
      className={classes["background-container"]}
      ref={backgroundRef}
      sx={props.containerSx}
    >
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
