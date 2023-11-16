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
import BooksHeader from "../BooksHeader";
import BooksFooter from "../BooksFooter";
import { useQuery } from "react-query";
import { booksApi } from "../../../config/api/books/books";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";

type Props = {
  headerText: string;
  footerText: string;
};

const BooksList: React.FC<Props> = (props) => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAllBooks,
  });

  const [bookAnimation, setBookAnimation] = useState<Direction>(
    Direction.Right,
  );

  window.addEventListener(
    "resize",
    () => {
      setBookAnimation(
        window.innerWidth <= 750 ? Direction.Up : Direction.Right,
      );
    },
    false,
  );

  const booksListLength = books?.length;

  return (
    <>
      <BooksHeader text={props.headerText} />
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage message="Failed to fetch recently popular books. Try again later." />
      )}
      {!isLoading && !isError && (
        <Box sx={{ pt: "4rem" }}>
          <Box sx={{ height: BOOK_HEIGHT + 25 + "px", mb: "3rem" }}>
            <ScrollMenu
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
              wrapperClassName={classes["horizonal-scroll-wrapper"]}
              itemClassName={classes["horizonal-scroll-item"]}
            >
              <>
                {books.map((book, index) => {
                  const priority = booksListLength - index;
                  let animationDirection = bookAnimation;
                  if (index === booksListLength - 1) {
                    animationDirection =
                      bookAnimation === Direction.Right
                        ? Direction.Left
                        : bookAnimation;
                  }
                  return (
                    <BookScrollCard key={book.id}>
                      <BookItem
                        details={book}
                        priority={priority}
                        animationDirection={animationDirection}
                      />
                    </BookScrollCard>
                  );
                })}
              </>
            </ScrollMenu>
          </Box>
        </Box>
      )}
      <BooksFooter text={props.footerText} />
    </>
  );
};

export default BooksList;
