import { parseAuthorsString } from "../authors/authors.parsers";
import { Book, BookItemData, CreateBookDTO } from "./books.types";

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

export const parseBookFormDataForCreate = (data: CreateBookDTO) => {
  const formData = new FormData();
  formData.append("cover", data.cover, data.cover.name);
  const book = {
    title: data.title,
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
    authorList: data.authors,
    genreList: data.genres,
    tagList: data.tags,
  };
  formData.append(
    "book",
    new Blob([JSON.stringify(book)], { type: "application/json" }),
  );

  return formData;
};
