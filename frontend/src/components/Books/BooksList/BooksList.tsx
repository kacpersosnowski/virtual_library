import BookItem from "../BookItem";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "../../scrolling/arrows";
import BookScrollCard from "../BookScrollCard";
import Direction from "../../../enums/Direction";
import { Box, SxProps, Theme } from "@mui/material";

import classes from "./BooksList.module.css";
import { useState } from "react";
import { BOOK_HEIGHT } from "../../../constants/common";
import BooksHeader from "../BooksHeader";
import BooksFooter from "../BooksFooter";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import { useTranslation } from "react-i18next";
import errorMessages from "../../../messages/errorMessages";
import { BookItemData } from "../../../config/api/books/books.types";

type Props = {
  headerText: string;
  books: BookItemData[];
  isLoading: boolean;
  isError: boolean;
  footerText?: string;
  displayFooter?: boolean;
  footerOnClick?: () => void;
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
};

const BooksList: React.FC<Props> = (props) => {
  const [bookAnimation, setBookAnimation] = useState<Direction>(
    Direction.Right,
  );
  const { t } = useTranslation();

  const {
    headerText,
    books,
    isLoading,
    isError,
    footerText,
    displayFooter,
    footerOnClick,
    sx,
    headerSx,
  } = props;

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
    <Box sx={sx}>
      <BooksHeader text={headerText} sx={headerSx} />
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage message={t(errorMessages.fetchBookListError.key)} />
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
            </ScrollMenu>
          </Box>
        </Box>
      )}
      {displayFooter && (
        <BooksFooter text={footerText} footerOnClick={footerOnClick} />
      )}
    </Box>
  );
};

export default BooksList;
