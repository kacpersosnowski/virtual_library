import { PropsWithChildren } from "react";
import { Button, SxProps, Theme } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ArrowProps = {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onClick?: () => void;
};

const Arrow: React.FC<PropsWithChildren<ArrowProps>> = ({
  children,
  sx,
  disabled,
  onClick,
}) => {
  return (
    <Button
      color="secondary"
      disabled={disabled}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        userSelect: "none",
        height: `200px`,
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export const LeftArrow: React.FC<ArrowProps> = ({ disabled, onClick }) => {
  return (
    <Arrow sx={{ right: "1%" }} disabled={disabled} onClick={onClick}>
      <ArrowBackIosIcon />
    </Arrow>
  );
};

export const RightArrow: React.FC<ArrowProps> = ({ disabled, onClick }) => {
  return (
    <Arrow sx={{ left: "1%" }} disabled={disabled} onClick={onClick}>
      <ArrowForwardIosIcon />
    </Arrow>
  );
};
