import { parseAuthorsString } from "../authors/authors.parsers";
import { Book, BookItemData } from "./books.types";

export const parseBookItems = (data: Book[]): BookItemData[] => {
  return data.map((dataItem: Book) => {
    return {
      id: dataItem.id,
      title:
        dataItem.title.slice(0, 60) + (dataItem.title.length > 60 ? "..." : ""),
      authorList: parseAuthorsString(dataItem.authorList),
      shortDescription: dataItem.shortDescription,
      cover: `data:image/jpeg;base64,${dataItem.cover}`,
    };
  });
};
