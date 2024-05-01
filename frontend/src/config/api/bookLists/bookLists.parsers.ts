import { parseBookItems } from "../books/books.parsers";
import { BookList, BookListDTO } from "./bookLists.types";

export const parseBookLists = (data: BookList[]): BookListDTO[] => {
  return data.map((dataItem: BookList) => {
    return {
      id: dataItem.id,
      userId: dataItem.userId,
      name: dataItem.name,
      books: parseBookItems(dataItem.books),
    };
  });
};
