import { Author } from "../authors/authors.types";

export type Book = {
  id: string;
  title: string;
  authorList: Author[];
  shortDescription: string;
  longDescription: string;
  genreList: string[];
  tagList: string[];
  cover: string;
};

export type BookItemData = {
  id: string;
  title: string;
  authorList: string;
  shortDescription: string;
  cover: string;
};

export type CreateBookDTO = {
  title: string;
  shortDescription: string;
  longDescription: string;
  authors: Author[];
  tags: string[];
  cover: File;
};

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
  createBook: (book: CreateBookDTO) => Promise<Book>;
};
