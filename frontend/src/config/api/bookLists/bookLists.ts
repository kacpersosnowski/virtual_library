import axios from "axios";
import { BookList, BookListsApi } from "./bookLists.types";
import { parseBookList, parseBookLists } from "./bookLists.parsers";

const url = "/book-list";

export const bookListsApi: BookListsApi = {
  getAllBookLists: async () => {
    const response = await axios.get<BookList[]>(url);
    const bookLists = parseBookLists(response.data);
    const toReadindex = bookLists.findIndex(
      (list) => list.name === "Do przeczytania" || list.name === "To read",
    );
    if (toReadindex !== -1) {
      const [object] = bookLists.splice(toReadindex, 1);
      bookLists.unshift(object);
    }
    return bookLists;
  },
  getUserBookLists: async (userId) => {
    const response = await axios.get<BookList[]>(`${url}/user/${userId}`);
    return parseBookLists(response.data);
  },
  getBookList: async (id) => {
    const response = await axios.get<BookList>(`${url}/${id}`);
    return parseBookList(response.data);
  },
  changeBookListName: async (data) => {
    await axios.patch(`${url}/${data.listId}`, String(data.newName), {
      headers: { "Content-Type": "text/plain" },
    });
  },
  addBookToList: async (data) => {
    const response = await axios.patch<BookList>(
      `${url}/add/${data.listId}/${data.bookId}`,
      {
        headers: { "Content-Type": "text/plain" },
      },
    );
    return response.data;
  },
  addBooksToList: async (data) => {
    for (const bookId of data.bookIdList) {
      await bookListsApi.addBookToList({ bookId, listId: data.listId });
    }
  },
  removeBookFromList: async (data) => {
    const response = await axios.patch<BookList>(
      `${url}/remove/${data.listId}/${data.bookId}`,
      {
        headers: { "Content-Type": "text/plain" },
      },
    );
    return response.data;
  },
  removeBooksFromList: async (data) => {
    for (const bookId of data.bookIdList) {
      await bookListsApi.removeBookFromList({ bookId, listId: data.listId });
    }
  },
  addBookList: async (data) => {
    const response = await axios.post<BookList>(url, data);
    return response.data;
  },
  deleteBookList: async (id) => {
    await axios.delete(`${url}/${id}`);
  },
};

export default bookListsApi;
