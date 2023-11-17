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

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
};
