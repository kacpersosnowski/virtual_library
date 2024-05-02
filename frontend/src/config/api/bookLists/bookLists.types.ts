import { Book, BookItemData } from "../books/books.types";

export type BookList = {
  id: string;
  userId: string;
  name: string;
  books: Book[];
};

export type BookListDTO = {
  id: string;
  userId: string;
  name: string;
  books: BookItemData[];
};

export type UpdateBookListNameData = {
  listId: string;
  newName: string;
};

export type AddRemoveBookFromListData = {
  listId: string;
  bookId: string;
};

export type AddRemoveBooksFromListData = {
  listId: string;
  bookIdList: string[];
};

export type BookListsApi = {
  getAllBookLists: () => Promise<BookListDTO[]>;
  getBookList: (id: string) => Promise<BookListDTO>;
  changeBookListName: (data: UpdateBookListNameData) => Promise<void>;
  addBookToList: (data: AddRemoveBookFromListData) => Promise<void>;
  addBooksToList: (data: AddRemoveBooksFromListData) => Promise<void>;
  removeBookFromList: (data: AddRemoveBookFromListData) => Promise<void>;
  removeBooksFromList: (data: AddRemoveBooksFromListData) => Promise<void>;
  deleteBookList: (id: string) => Promise<void>;
};
