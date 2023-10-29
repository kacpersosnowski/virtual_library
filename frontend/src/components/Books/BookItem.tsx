import { Box } from "@mui/material";

import bookCover from "../../assets/osowski.png";
import BookCover from "./BookCover";
import BookDetails from "./BookDetails";
import { useAnimate } from "framer-motion";
import Direction from "../../enums/Direction";
import { useState } from "react";

type Props = {
  priority: number;
  animationDirection?: Direction;
};

const BookItem: React.FC<Props> = (props) => {
  const baseCoverZIndex = 2 * props.priority;

  const [scope, animate] = useAnimate();
  const [coverZIndex, setCoverZIndex] = useState(baseCoverZIndex);

  // Default animation - to the right
  let moveProperties: { x?: number; y?: number } = { x: 200 };

  if (props?.animationDirection === Direction.Left) {
    moveProperties = { x: -200 };
  } else if (props?.animationDirection === Direction.Up) {
    moveProperties = { y: -250 };
  } else if (props?.animationDirection === Direction.Down) {
    moveProperties = { y: 250 };
  }

  const mouseEnterHandler = () => {
    // Handle the last book so that book details were above the left book's cover
    if (props?.animationDirection === Direction.Left) {
      setCoverZIndex(1000);
    }

    animate("div.book", moveProperties, { duration: 0.6 });
  };

  const mouseOverHandler = () => {
    // Come back to the base index if the book is last in the collection
    if (props?.animationDirection === Direction.Left) {
      setCoverZIndex(baseCoverZIndex);
    }

    animate("div.book", { x: 0, y: 0 });
  };

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
