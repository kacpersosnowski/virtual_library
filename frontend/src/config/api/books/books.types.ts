import { Author } from "../authors/authors.types";
import { Genre } from "../genres/genres.types";

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
  genres: Genre[];
  tags: string[];
  cover: File;
};

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
  createBook: (book: CreateBookDTO) => Promise<Book>;
};
