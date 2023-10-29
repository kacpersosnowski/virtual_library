import { Box } from "@mui/material";

import bookCover from "../../assets/osowski.png";
import BookCover from "./BookCover";
import BookDetails from "./BookDetails/BookDetails";
import { useAnimate } from "framer-motion";
import Direction from "../../enums/Direction";
import { useState } from "react";
import { BOOK_HEIGHT, BOOK_WITDH } from "../../constants/common";

type Props = {
  priority: number;
  animationDirection?: Direction;
};

const BookItem: React.FC<Props> = (props) => {
  const baseCoverZIndex = 2 * props.priority;

  const [scope, animate] = useAnimate();
  const [coverZIndex, setCoverZIndex] = useState(baseCoverZIndex);

  // Default animation - to the right
  let moveProperties: { x?: number; y?: number } = { x: BOOK_WITDH };

  if (props?.animationDirection === Direction.Left) {
    moveProperties = { x: -BOOK_WITDH };
  } else if (props?.animationDirection === Direction.Up) {
    moveProperties = { y: -BOOK_HEIGHT };
  } else if (props?.animationDirection === Direction.Down) {
    moveProperties = { y: BOOK_HEIGHT };
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
        width: `${BOOK_WITDH}px`,
        height: `${BOOK_HEIGHT}px`,
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