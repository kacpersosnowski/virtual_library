import { Language } from "../../../constants/languages";
import { Author } from "../authors/authors.types";
import { PageSearchData, PagedResponse } from "../common/common.types";
import { Genre } from "../genres/genres.types";

export type Book = {
  id: string;
  title: string;
  authorList: Author[];
  description: string;
  genreList: Genre[];
  tagList: string[];
  language: Language;
  bookCoverId: string;
  bookContentId: string;
};

export type BookItemData = {
  id: string;
  title: string;
  authorList: string;
  genreList?: string;
  cover?: string;
};

export type ReadBookDTO = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  genres: string[];
  tags: string[];
  language: string;
  cover: string;
  bookContentId: string;
};

export type CreateBookDTO = {
  title: string;
  description: string;
  authors: Author[];
  genres: Genre[];
  tags: string[];
  language: Language;
  cover: File;
  content: File;
};

export type UpdateBookData = {
  id: string;
  book: CreateBookDTO;
};

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
  getAllBooksForAdmin: (
    queryData: PageSearchData,
  ) => Promise<PagedResponse<BookItemData>>;
  getAllBooksByGenre: (genre: string) => Promise<BookItemData[]>;
  getBookDetails: (id: string) => Promise<ReadBookDTO>;
  getRawBookDetails: (id: string) => Promise<Book>;
  getBookContent: (id: string) => Promise<Uint8Array>;
  getBookContentFile: (id: string) => Promise<File>;
  getBookCoverFile: (id: string) => Promise<File>;
  createBook: (book: CreateBookDTO) => Promise<Book>;
  updateBook: (data: UpdateBookData) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
};
