import { Button } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { BOOK_HEIGHT } from "../../constants/common";

const Arrow = ({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      color="info"
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        userSelect: "none",
        height: `${BOOK_HEIGHT}px`,
        position: "relative",
        top: `${BOOK_HEIGHT}px`,
      }}
    >
      {children}
    </Button>
  );
};

export const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <ArrowBackIosIcon />
    </Arrow>
  );
};

export const RightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleElements } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible,
  );
  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <ArrowForwardIosIcon />
    </Arrow>
  );
};
