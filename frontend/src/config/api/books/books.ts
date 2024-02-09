import axios from "axios";

import { Book, BooksApi, CreateBookDTO } from "./books.types";
import {
  parseBookFormDataForCreate,
  parseBookItemForDetails,
  parseBookItems,
  parseBookItemsForAdmin,
} from "./books.parsers";
import { BACKEND_BASE_URL } from "../../../constants/api";

const url = "/books";
const coverUrl = "/files/cover";
const pdfUrl = "/files/content";

export const booksApi: BooksApi = {
  getAllBooks: async () => {
    const response = await axios.get(url);
    return parseBookItems(response.data);
  },
  getAllBooksForAdmin: async () => {
    const response = await axios.get(url);
    return parseBookItemsForAdmin(response.data);
  },
  getBookDetails: async (id: string) => {
    const response = await axios.get<Book>(`${url}/${id}`);
    return parseBookItemForDetails(response.data);
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
