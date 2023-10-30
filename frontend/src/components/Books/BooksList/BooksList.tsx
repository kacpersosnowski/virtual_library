import BookItem from "../BookItem";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../../scrolling/arrows";
import BookScrollCard from "../BookScrollCard";
import Direction from "../../../enums/Direction";
import { Box } from "@mui/material";

import classes from "./BooksList.module.css";
import { useState } from "react";
import { BOOK_HEIGHT } from "../../../constants/common";

const BooksList = () => {
  const [bookAnimation, setBookAnimation] = useState<Direction>(
    Direction.Right
  );

  window.addEventListener(
    "resize",
    () => {
      setBookAnimation(
        window.innerWidth <= 750 ? Direction.Up : Direction.Right
      );
    },
    false
  );

  return (
    <Box sx={{ pt: "100px" }}>
      <Box sx={{ height: BOOK_HEIGHT + 25 + "px", mb: "3rem" }}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          wrapperClassName={classes["horizonal-scroll-wrapper"]}
          itemClassName={classes["horizonal-scroll-item"]}
        >
          {/* some dummy data for now */}
          <BookScrollCard>
            <BookItem priority={10} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={9} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={8} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={7} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={6} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={5} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={4} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={3} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={2} animationDirection={bookAnimation} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem
              priority={1}
              animationDirection={
                bookAnimation === Direction.Right
                  ? Direction.Left
                  : bookAnimation
              }
            />
          </BookScrollCard>
        </ScrollMenu>
      </Box>
    </Box>
  );
};

export default BooksList;
