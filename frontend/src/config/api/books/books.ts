import axios from "axios";

import { Book, BooksApi, CreateBookDTO } from "./books.types";
import {
  parseBookFormDataForCreate,
  parseBookItemForDetails,
  parseBookItems,
} from "./books.parsers";

const url = "/books";
const pdfUrl = "/files/content";

export const booksApi: BooksApi = {
  getAllBooks: async () => {
    const response = await axios.get(url);
    return parseBookItems(response.data);
  },
  getBookDetails: async (id: string) => {
    const response = await axios.get<Book>(`${url}/${id}`);
    return parseBookItemForDetails(response.data);
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
  createBook: async (book: CreateBookDTO) => {
    const formData = parseBookFormDataForCreate(book);
    const response = await axios.post<Book>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
