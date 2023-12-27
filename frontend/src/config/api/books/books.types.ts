import { Author } from "../authors/authors.types";
import { Genre } from "../genres/genres.types";

export type Book = {
  id: string;
  title: string;
  authorList: Author[];
  shortDescription: string;
  longDescription: string;
  genreList: Genre[];
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

export type ReadBookDTO = {
  id: string;
  title: string;
  authors: string[];
  longDescription: string;
  genres: string[];
  tags: string[];
  cover: string;
};

export type CreateBookDTO = {
  title: string;
  shortDescription: string;
  longDescription: string;
  authors: Author[];
  genres: Genre[];
  tags: string[];
  cover: File;
};

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
  getBookDetails: (id: string) => Promise<ReadBookDTO>;
  createBook: (book: CreateBookDTO) => Promise<Book>;
};
