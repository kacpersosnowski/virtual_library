import { Box } from "@mui/material";

import bookCover from "../../assets/osowski.png";
import BookCover from "./BookCover";
import BookDetails from "./BookDetails";
import { useAnimate } from "framer-motion";

type Props = {
  priority: number;
};

const BookItem: React.FC<Props> = (props) => {
  const [scope, animate] = useAnimate();

  const mouseEnterHandler = () => {
    animate("div.book", { x: 200 }, { duration: 0.6 });
  };

  const mouseOverHandler = () => {
    animate("div.book", { x: 0 });
  };

  const coverZIndex = 2 * props.priority;
  const detailsZIndex = coverZIndex - 1;

  return (
    <Box
      sx={{
        position: "relative",
        width: "200px",
        height: "250px",
        cursor: "pointer",
      }}
      ref={scope}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseOverHandler}
    >
      <BookCover coverImage={bookCover} zIndex={coverZIndex} />
      <BookDetails
        zIndex={detailsZIndex}
        id={1}
        title="Teoria obwodów i sygnałów"
        author="Osowski S."
        shortDescription="Przeżyj niezwykłą przygodę w krainie kabelków i stanów nieustalonych!"
      />
    </Box>
  );
};

export default BookItem;
