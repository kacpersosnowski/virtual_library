import { Author } from "../authors/authors.types";

export type Book = {
  id: string;
  title: string;
  authors: Author[];
  shortDescription: string;
  longDescription: string;
  genreList: string[];
  tagList: string[];
  cover: string;
};

export type BooksApi = {
  getAllBooks: () => Promise<Book[]>;
};
