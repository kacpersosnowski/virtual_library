import { parseBookItems } from "../books/books.parsers";
import { BookList, BookListDTO } from "./bookLists.types";

export const parseBookLists = (data: BookList[]): BookListDTO[] => {
  return data.map((dataItem: BookList) => {
    return parseBookList(dataItem);
  });
};

export const parseBookList = (data: BookList): BookListDTO => {
  return {
    id: data.id,
    userId: data.userId,
    name: data.name,
    books: parseBookItems(data.books),
  };
};
