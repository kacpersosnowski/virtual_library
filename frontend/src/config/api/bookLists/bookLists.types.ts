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

export type RemoveBookFromListData = {
  listId: string;
  bookId: string;
};

export type RemoveBooksFromListData = {
  listId: string;
  bookIdList: string[];
};

export type BookListsApi = {
  getAllBookLists: () => Promise<BookListDTO[]>;
  getBookList: (id: string) => Promise<BookListDTO>;
  changeBookListName: (data: UpdateBookListNameData) => Promise<void>;
  removeBookFromList: (data: RemoveBookFromListData) => Promise<void>;
  removeBooksFromList: (data: RemoveBooksFromListData) => Promise<void>;
  deleteBookList: (id: string) => Promise<void>;
};
