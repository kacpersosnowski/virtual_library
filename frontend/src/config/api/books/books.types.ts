import { Language } from "../../../constants/languages";
import { Author } from "../authors/authors.types";
import {
  BookRating,
  PageSearchData,
  PagedResponse,
} from "../common/common.types";
import { Genre } from "../genres/genres.types";

export type Book = {
  id: string;
  title: string;
  authorList: Author[];
  description: string;
  genreList: Genre[];
  tagList: string[];
  language: Language;
  rateAverage: number;
  rateCount: number;
  bookCoverId: string;
  bookContentId: string;
  readAuthenticatedOnly: boolean;
};

export type BookItemData = {
  id: string;
  title: string;
  authorList: string;
  genreList?: string;
  cover?: string;
  rating: BookRating;
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
  rating: BookRating;
  readAuthenticatedOnly: boolean;
};

export type CreateBookDTO = {
  title: string;
  description: string;
  authors: Author[];
  genres: Genre[];
  tags: string[];
  language: Language;
  rateAverage?: number;
  rateCount?: number;
  cover: File;
  content: File;
  readAuthenticatedOnly: boolean;
};

export type UpdateBookData = {
  id: string;
  book: CreateBookDTO;
};

export type BooksApi = {
  getAllBooks: () => Promise<BookItemData[]>;
  getAllBooksWithParams: (
    queryData: PageSearchData,
  ) => Promise<PagedResponse<BookItemData>>;
  getAllBooksForAdmin: (
    queryData: PageSearchData,
  ) => Promise<PagedResponse<BookItemData>>;
  getAllBooksByGenre: (genre: string) => Promise<BookItemData[]>;
  getMostPopularBooks: () => Promise<BookItemData[]>;
  getBestRatedBooks: () => Promise<BookItemData[]>;
  getBookDetails: (id: string) => Promise<ReadBookDTO>;
  getRawBookDetails: (id: string) => Promise<Book>;
  getBookContent: (id: string) => Promise<Uint8Array>;
  getBookContentFile: (id: string) => Promise<File>;
  getBookCoverFile: (id: string) => Promise<File>;
  createBook: (book: CreateBookDTO) => Promise<Book>;
  updateBook: (data: UpdateBookData) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
};
