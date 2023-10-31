import { Box } from "@mui/material";
import ActionButton from "../UI/ActionButton";

type Props = {
  text: string;
};

const BooksFooter: React.FC<Props> = (props) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <ActionButton
        sx={{ mt: "1.2rem", width: "15rem", p: "10px 0", fontSize: "1.3rem" }}
      >
        {props.text}
      </ActionButton>
    </Box>
  );
};

export default BooksFooter;
