import { Box, SxProps, Theme } from "@mui/material";
import ActionButton from "../UI/ActionButton";

type Props = {
  text: string;
  footerOnClick?: () => void;
  sx?: SxProps<Theme>;
};

const BooksFooter: React.FC<Props> = (props) => {
  return (
    <Box sx={{ textAlign: "center", mb: "2.5rem" }}>
      <ActionButton
        onClick={props.footerOnClick}
        sx={{
          mt: "1.2rem",
          width: "15rem",
          p: "10px 0",
          fontSize: "1.3rem",
          ...props.sx,
        }}
      >
        {props.text}
      </ActionButton>
    </Box>
  );
};

export default BooksFooter;
