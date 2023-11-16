import { Book, BookItemData } from "./books.types";

export const parseBookItems = (data: Book[]): BookItemData[] => {
  return data.map((dataItem: Book) => {
    return {
      id: dataItem.id,
      title: dataItem.title,
      authorList: dataItem.authorList,
      shortDescription: dataItem.shortDescription,
      cover: dataItem.cover,
    };
  });
};
