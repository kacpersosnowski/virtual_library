import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import BooksList from "../../components/Books/BooksList/BooksList";
import { booksApi } from "../../config/api/books/books";
import genresApi from "../../config/api/genres/genres";
import { BookItemData } from "../../config/api/books/books.types";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import ActionButton from "../../components/UI/ActionButton";
import errorMessages from "../../messages/errorMessages";
import booksMessages from "../../messages/booksMessages";

const MIN_BOOKS_IN_LIST_TO_BE_SHOWN = 1; // TODO: Change it when more books are created
const BOOKS_IN_LIST = 10;

type BooksListElement = {
  header: string;
  books: BookItemData[];
};

const BookCategoryListsPage = () => {
  const [booksLists, setBooksLists] = useState<BooksListElement[]>([]);
  const [remainingGenres, setRemainingGenres] = useState<string[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isInitialError, setIsInitialError] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isMoreError, setIsMoreError] = useState(false);
  const {
    data: bookCountsByGenre,
    isLoading: isBookCountLoading,
    isError: isBookCountError,
  } = useQuery({
    queryKey: ["genres-book-count"],
    queryFn: genresApi.getBookCountsByGenre,
  });
  const { t, i18n } = useTranslation();

  const fetchMoreBooks = async () => {
    try {
      setIsMoreLoading(true);
      const newGenresPromises: Promise<BookItemData[]>[] = [];
      if (remainingGenres.length > 0) {
        newGenresPromises.push(
          booksApi
            .getAllBooksByGenre(remainingGenres[0])
            .then((response) => response),
        );
      }
      if (remainingGenres.length > 1) {
        newGenresPromises.push(
          booksApi
            .getAllBooksByGenre(remainingGenres[1])
            .then((response) => response),
        );
      }

      const newBooksLists = await Promise.all(newGenresPromises);

      const newRemainingGenres = remainingGenres.slice(2);
      const newBooksListsElements: BooksListElement[] = [];
      if (remainingGenres.length > 0) {
        newBooksListsElements.push({
          header: remainingGenres[0],
          books: newBooksLists[0].slice(0, BOOKS_IN_LIST),
        });
      }
      if (remainingGenres.length > 1) {
        newBooksListsElements.push({
          header: remainingGenres[1],
          books: newBooksLists[1].slice(0, BOOKS_IN_LIST),
        });
      }
      setRemainingGenres(newRemainingGenres);
      setBooksLists((prevList) => [...prevList, ...newBooksListsElements]);
    } catch (error) {
      setIsMoreError(true);
    } finally {
      setIsMoreLoading(false);
    }
  };

  const fetchInitialBooks = async (initialGenresList: string[]) => {
    try {
      setIsInitialLoading(true);
      const initialListsPromises = [
        booksApi.getAllBooks().then((response) => response),
        booksApi.getAllBooks().then((response) => response),
      ];
      if (initialGenresList.length > 0) {
        initialListsPromises.push(
          booksApi
            .getAllBooksByGenre(initialGenresList[0])
            .then((response) => response),
        );
      }
      if (initialGenresList.length > 1) {
        initialListsPromises.push(
          booksApi
            .getAllBooksByGenre(initialGenresList[1])
            .then((response) => response),
        );
      }

      const initialLists = await Promise.all(initialListsPromises);

      const initialBooksList = [
        {
          header: t(booksMessages.booksListPopularHeader.key),
          books: initialLists[0].slice(0, BOOKS_IN_LIST),
        },
        {
          header: t(booksMessages.booksListBestRatedHeader.key),
          books: initialLists[1].slice(0, BOOKS_IN_LIST),
        },
      ] as BooksListElement[];
      if (initialGenresList.length > 0) {
        initialBooksList.push({
          header: initialGenresList[0],
          books: initialLists[2].slice(0, BOOKS_IN_LIST),
        });
      }
      if (initialGenresList.length > 1) {
        initialBooksList.push({
          header: initialGenresList[1],
          books: initialLists[3].slice(0, BOOKS_IN_LIST),
        });
      }
      setBooksLists(initialBooksList);
    } catch (error) {
      setIsInitialError(true);
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    if (bookCountsByGenre) {
      const genresFiltered = Object.keys(bookCountsByGenre).filter(
        (key) => bookCountsByGenre[key] > MIN_BOOKS_IN_LIST_TO_BE_SHOWN,
      );
      const shuffledGenres = genresFiltered.sort(() => Math.random() - 0.5);
      const remainingGenresAfterInitialLoad = shuffledGenres.slice(2);
      setRemainingGenres(remainingGenresAfterInitialLoad);
      fetchInitialBooks(shuffledGenres.slice(0, 2));
    }
  }, [bookCountsByGenre]);

  useEffect(() => {
    const updatedBooksLists = booksLists.map((item, index) => {
      if (index === 0) {
        return { ...item, header: t(booksMessages.booksListPopularHeader.key) };
      } else if (index === 1) {
        return {
          ...item,
          header: t(booksMessages.booksListBestRatedHeader.key),
        };
      } else {
        return item;
      }
    });
    setBooksLists(updatedBooksLists);
  }, [i18n.language]);

  if (isBookCountError) {
    return (
      <ErrorMessage
        sx={{ my: "10rem" }}
        message={t(errorMessages.somethingWentWrongError.key)}
      />
    );
  }

  if (isBookCountLoading) {
    return <LoadingSpinner boxSx={{ my: "10rem" }} />;
  }

  return (
    <>
      {isInitialError && (
        <ErrorMessage
          sx={{ my: "10rem" }}
          message={t(errorMessages.fetchBookListError.key)}
        />
      )}
      {isInitialLoading && <LoadingSpinner boxSx={{ my: "10rem" }} />}
      {booksLists.map((booksList, index) => {
        return (
          <BooksList
            key={index}
            headerText={booksList.header}
            books={booksList.books}
            isLoading={false}
            isError={false}
            sx={index === 0 ? { mt: "4rem" } : {}}
            headerSx={index !== 0 ? { pt: 0 } : {}}
          />
        );
      })}
      {isMoreError && (
        <ErrorMessage message={t(errorMessages.fetchBookListError.key)} />
      )}
      {isMoreLoading && <LoadingSpinner />}
      {!isBookCountError &&
        !isInitialError &&
        !isMoreError &&
        remainingGenres.length > 0 && (
          <Box sx={{ textAlign: "center", mb: "2.5rem" }}>
            <ActionButton
              onClick={fetchMoreBooks}
              sx={{
                mt: "1.2rem",
                width: "15rem",
                p: "10px 0",
                fontSize: "1.3rem",
              }}
            >
              {t(booksMessages.booksListLoadMoreButtonText.key)}
            </ActionButton>
          </Box>
        )}
    </>
  );
};

export default BookCategoryListsPage;
