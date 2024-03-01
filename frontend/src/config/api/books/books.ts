import axios from "axios";

import { Book, BooksApi, CreateBookDTO } from "./books.types";
import {
  parseBookFormDataForCreate,
  parseBookItemForDetails,
  parseBookItems,
  parseBookItemsForAdmin,
} from "./books.parsers";
import { BACKEND_BASE_URL } from "../../../constants/api";
import { BookRating, PagedResponse } from "../common/common.types";

const url = "/books";
const mostPopularUrl = `${url}/most-popular`;
const bestRatedUrl = `${url}/best-rated`;
const coverUrl = "/files/cover";
const pdfUrl = "/files/content";
const ratingUrl = "/book-ratings";

export const booksApi: BooksApi = {
  getAllBooks: async () => {
    const response = await axios.get<PagedResponse<Book>>(url);
    const books = parseBookItems(response.data.content);
    for (const book of books) {
      const rating = await booksApi.getBookRating(book.id);
      book.rating = rating;
    }
    return books;
  },
  getAllBooksForAdmin: async (params) => {
    const response = await axios.get<PagedResponse<Book>>(url, { params });
    return {
      totalElements: response.data.totalElements,
      content: parseBookItemsForAdmin(response.data.content),
    };
  },
  getAllBooksByGenre: async (genre: string) => {
    const response = await axios.get<PagedResponse<Book>>(url, {
      params: { genre },
    });
    return parseBookItems(response.data.content);
  },
  getMostPopularBooks: async () => {
    const response = await axios.get<Book[]>(mostPopularUrl);
    return parseBookItems(response.data);
  },
  getBestRatedBooks: async () => {
    const response = await axios.get<Book[]>(bestRatedUrl);
    return parseBookItems(response.data);
  },
  getBookDetails: async (id: string) => {
    const response = await axios.get<Book>(`${url}/${id}`);
    const rating = await booksApi.getBookRating(id);
    return { ...parseBookItemForDetails(response.data), rating };
  },
  getRawBookDetails: async (id: string) => {
    const response = await axios.get<Book>(`${url}/${id}`);
    return response.data;
  },
  getBookContent: async (id: string) => {
    const details = await booksApi.getBookDetails(id);
    const response = await axios.get<Uint8Array>(
      `${pdfUrl}/${details.bookContentId}`,
      {
        responseType: "arraybuffer",
      },
    );
    return response.data;
  },
  getBookContentFile: async (id: string) => {
    const details = await booksApi.getBookDetails(id);
    const bookContent = await booksApi.getBookContent(id);
    const fileNameResponse = await axios.get<string>(
      `${BACKEND_BASE_URL}${pdfUrl}/${details.bookContentId}/filename`,
    );
    const blob = new Blob([bookContent], { type: "application/pdf" });
    const contentFile = new File([blob], fileNameResponse.data, {
      type: "application/pdf",
    });
    return contentFile;
  },
  getBookCoverFile: async (id: string) => {
    const details = await booksApi.getRawBookDetails(id);
    const response = await fetch(
      `${BACKEND_BASE_URL}${coverUrl}/${details.bookCoverId}`,
    );
    const blob = await response.blob();
    const fileNameResponse = await axios.get<string>(
      `${BACKEND_BASE_URL}${coverUrl}/${details.bookCoverId}/filename`,
    );
    const fileName = fileNameResponse.data;
    const imageFile = new File([blob], fileName, { type: blob.type });
    return imageFile;
  },
  getBookRating: async (bookId: string) => {
    const response = await axios.get<BookRating>(`${ratingUrl}/${bookId}`);
    return response.data;
  },
  createBook: async (book: CreateBookDTO) => {
    const formData = parseBookFormDataForCreate(book);
    const response = await axios.post<Book>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  updateBook: async ({ id, book }) => {
    const formData = parseBookFormDataForCreate(book);
    const response = await axios.put<Book>(`${url}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  deleteBook: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },
};
