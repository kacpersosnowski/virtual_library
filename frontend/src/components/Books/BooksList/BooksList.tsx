import BookItem from "../BookItem";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../arrows";
import BookScrollCard from "../BookScrollCard";
import Direction from "../../../enums/Direction";
import { Box } from "@mui/material";

import classes from "./BooksList.module.css";

const BooksList = () => {
  return (
    <Box className="example" style={{ paddingTop: "100px" }}>
      <Box>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          wrapperClassName={classes["horizonal-scroll-wrapper"]}
          itemClassName={classes["horizonal-scroll-item"]}
        >
          <BookScrollCard>
            <BookItem priority={10} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={9} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={8} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={7} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={6} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={5} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={4} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={3} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={2} />
          </BookScrollCard>
          <BookScrollCard>
            <BookItem priority={1} animationDirection={Direction.Left} />
          </BookScrollCard>
        </ScrollMenu>
      </Box>
    </Box>
  );
};

export default BooksList;
