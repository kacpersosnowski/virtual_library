import { Button, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = {
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button";
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  scaleOnHover?: number;
  onClick?: () => void;
};

const ActionButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      type={props.type}
      variant={props.variant || "contained"}
      color={props.color || "secondary"}
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
