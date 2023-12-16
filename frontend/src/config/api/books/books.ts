import axios from "axios";

import { Book, BooksApi, CreateBookDTO } from "./books.types";
import { parseBookFormDataForCreate, parseBookItems } from "./books.parsers";

const url = "/books";

export const booksApi: BooksApi = {
  getAllBooks: async () => {
    const response = await axios.get(url);
    return parseBookItems(response.data);
  },
  createBook: async (book: CreateBookDTO) => {
    const formData = parseBookFormDataForCreate(book);
    const response = await axios.post<Book>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
