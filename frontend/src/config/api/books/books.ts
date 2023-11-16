import axios from "axios";

import { BooksApi } from "./books.types";
import { parseBookItems } from "./books.parsers";

const url = "/books";

export const booksApi: BooksApi = {
  getAllBooks: async () => {
    const response = await axios.get(url);
    return parseBookItems(response.data);
  },
};
