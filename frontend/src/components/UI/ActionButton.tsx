import { Button, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { motion } from "framer-motion";
import { ReactNode, PropsWithChildren } from "react";

type Props = {
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button";
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "error";
  disabled?: boolean;
  scaleOnHover?: number;
  startIcon?: ReactNode;
  onClick?: () => void;
};

const ActionButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      type={props.type}
      variant={props.variant || "contained"}
      color={props.color || "secondary"}
      disabled={props.disabled ? props.disabled : false}
      startIcon={props.startIcon}
      component={motion.button}
      whileHover={{
        scale: props.scaleOnHover || 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      sx={props.sx}
    >
      {props.children}
    </Button>
  );
};

export default ActionButton;
