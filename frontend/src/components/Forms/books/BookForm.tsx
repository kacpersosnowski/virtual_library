import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { booksApi } from "../../../config/api/books/books";
import { Book, CreateBookDTO } from "../../../config/api/books/books.types";
import AddEditBookForm from "./AddEditBookForm";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";

const BookForm = () => {
  const [book, setBook] = useState<Book>();
  const [bookContentFile, setBookContentFile] = useState<File>();
  const [bookCoverFile, setBookCoverFile] = useState<File>(null);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      Promise.all([
        booksApi.getRawBookDetails(id),
        booksApi.getBookContentFile(id),
        booksApi.getBookCoverFile(id),
      ])
        .then(([bookDetails, contentFile, coverFile]) => {
          setBook(bookDetails);
          setBookContentFile(contentFile);
          setBookCoverFile(coverFile);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [id]);

  let initialValues: CreateBookDTO = null;
  if (book && bookContentFile && bookCoverFile) {
    initialValues = {
      title: book.title,
      shortDescription: book.shortDescription,
      longDescription: book.longDescription,
      authors: book.authorList,
      genres: book.genreList,
      tags: book.tagList,
      cover: bookCoverFile,
      content: bookContentFile,
    };
  }

  if (isError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <>
      {id ? (
        book && bookContentFile && bookCoverFile ? (
          <AddEditBookForm initialValues={initialValues} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <AddEditBookForm />
      )}
    </>
  );
};

export default BookForm;
