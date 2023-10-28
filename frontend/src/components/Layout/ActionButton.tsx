import { Button, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = {
  sx?: SxProps<Theme>;
};

const ActionButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      component={motion.div}
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
