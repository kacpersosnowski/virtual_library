import { Box } from "@mui/material";

import bookCover from "../../assets/osowski.png";
import BookCover from "./BookCover";
import BookDetails from "./BookDetails";
import { useAnimate } from "framer-motion";

const BookItem = () => {
  const [scope, animate] = useAnimate();

  const mouseEnterHandler = () => {
    animate("div#book-1", { x: 200 }, { duration: 0.6 });
  };

  const mouseOverHandler = () => {
    animate("div#book-1", { x: 0 });
  };

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
      <BookCover coverImage={bookCover} />
      <BookDetails
        id={1}
        title="Teoria obwodów i sygnałów"
        author="Osowski S."
        shortDescription="Przeżyj niezwykłą przygodę w krainie kabelków i stanów nieustalonych!"
      />
    </Box>
  );
};

export default BookItem;
