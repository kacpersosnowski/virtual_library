import { Button, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = {
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

const ActionButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      type={props.type}
      variant="contained"
      color="secondary"
      component={motion.button}
      whileHover={{
        scale: 1.1,
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
