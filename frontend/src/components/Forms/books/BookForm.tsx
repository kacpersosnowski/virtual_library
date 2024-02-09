import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { booksApi } from "../../../config/api/books/books";
import { Book, CreateBookDTO } from "../../../config/api/books/books.types";
import AddBookForm from "./AddBookForm";
import LoadingSpinner from "../../UI/LoadingSpinner";

const BookForm = () => {
  const [book, setBook] = useState<Book>();
  const [bookContent, setBookContent] = useState<Uint8Array>();
  const [bookCoverFile, setBookCoverFile] = useState<File>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      booksApi
        .getRawBookDetails(id)
        .then((response) => {
          setBook(response);
        })
        .catch(() => {
          console.error("errro");
        });
      booksApi
        .getBookContent(id)
        .then((response) => {
          setBookContent(response);
        })
        .catch(() => {
          console.error("errro");
        });
      booksApi
        .getBookCoverFile(id)
        .then((response) => {
          setBookCoverFile(response);
        })
        .catch(() => {
          console.error("errro");
        });
    }
  }, [id]);

  let initialValues: CreateBookDTO = null;
  if (book && bookContent && bookCoverFile) {
    const blob = new Blob([bookContent], { type: "application/pdf" });
    const contentFile = new File([blob], "nazwa_pliku.pdf", {
      type: "application/pdf",
    });
    initialValues = {
      title: book.title,
      shortDescription: book.shortDescription,
      longDescription: book.longDescription,
      authors: book.authorList,
      genres: book.genreList,
      tags: book.tagList,
      cover: bookCoverFile,
      content: contentFile,
    };
  }

  return (
    <>
      {id ? (
        book && bookContent && bookCoverFile ? (
          <AddBookForm initialValues={initialValues} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <AddBookForm />
      )}
    </>
  );
};

export default BookForm;
