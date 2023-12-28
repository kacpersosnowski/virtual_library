import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  coverImage: string;
  zIndex: number;
};

const BookCover: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      component="img"
      src={props.coverImage}
      onClick={() => navigate(`/book/${props.id}`)}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: props.zIndex,
        objectFit: "cover",
      }}
    />
  );
};

export default BookCover;
