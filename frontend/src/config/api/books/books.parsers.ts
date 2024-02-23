import { BACKEND_BASE_URL } from "../../../constants/api";
import {
  parseAllAuthorsString,
  parseAuthorsList,
  parseAuthorsString,
} from "../authors/authors.parsers";
import { parseGenresList, parseGenresString } from "../genres/genres.parsers";
import { Book, BookItemData, CreateBookDTO, ReadBookDTO } from "./books.types";

export const parseBookItems = (data: Book[]): BookItemData[] => {
  return data.map((dataItem: Book) => {
    return {
      id: dataItem.id,
      title:
        dataItem.title.slice(0, 60) + (dataItem.title.length > 60 ? "..." : ""),
      authorList: parseAuthorsString(dataItem.authorList),
      shortDescription: dataItem.shortDescription,
      cover: `${BACKEND_BASE_URL}/files/cover/${dataItem.bookCoverId}`,
    };
  });
};

export const parseBookItemsForAdmin = (data: Book[]): BookItemData[] => {
  return data.map((dataItem: Book) => {
    return {
      id: dataItem.id,
      title: dataItem.title,
      authorList: parseAllAuthorsString(dataItem.authorList),
      genreList: parseGenresString(dataItem.genreList),
    };
  });
};

export const parseBookItemForDetails = (dataItem: Book): ReadBookDTO => {
  return {
    id: dataItem.id,
    title:
      dataItem.title.slice(0, 60) + (dataItem.title.length > 60 ? "..." : ""),
    authors: parseAuthorsList(dataItem.authorList),
    longDescription: dataItem.longDescription,
    genres: parseGenresList(dataItem.genreList),
    tags: dataItem.tagList,
    cover: `${BACKEND_BASE_URL}/files/cover/${dataItem.bookCoverId}`,
    bookContentId: dataItem.bookContentId,
  };
};

export const parseBookFormDataForCreate = (data: CreateBookDTO) => {
  const formData = new FormData();
  formData.append("cover", data.cover, data.cover.name);
  formData.append("content", data.content, data.content.name);
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
