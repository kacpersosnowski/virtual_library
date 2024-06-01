import { BACKEND_BASE_URL } from "../../../constants/api";
import { LANGUAGES } from "../../../constants/languages";
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
      rating: {
        rateCount: dataItem.rateCount,
        rateAverage: dataItem.rateAverage,
      },
      cover: `${BACKEND_BASE_URL}/files/image/${dataItem.bookCoverId}`,
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
      rating: {
        rateCount: dataItem.rateCount,
        rateAverage: dataItem.rateAverage,
      },
    };
  });
};

export const parseBookItemForDetails = (dataItem: Book): ReadBookDTO => {
  return {
    id: dataItem.id,
    title:
      dataItem.title.slice(0, 60) + (dataItem.title.length > 60 ? "..." : ""),
    authors: parseAuthorsList(dataItem.authorList),
    description: dataItem.description,
    genres: parseGenresList(dataItem.genreList),
    tags: dataItem.tagList,
    language: LANGUAGES.find(
      (language) => language.backendCode === dataItem.language,
    )?.label,
    rating: {
      rateCount: dataItem.rateCount,
      rateAverage: dataItem.rateAverage,
    },
    cover: `${BACKEND_BASE_URL}/files/image/${dataItem.bookCoverId}`,
    bookContentId: dataItem.bookContentId,
    readAuthenticatedOnly: dataItem.readAuthenticatedOnly,
  };
};

export const parseBookFormDataForCreate = (data: CreateBookDTO) => {
  const formData = new FormData();
  formData.append("cover", data.cover, data.cover.name);
  formData.append("content", data.content, data.content.name);
  const book = {
    title: data.title,
    description: data.description,
    authorList: data.authors,
    genreList: data.genres,
    tagList: data.tags,
    language: data.language,
    rateAverage: data?.rateAverage || 0,
    rateCount: data?.rateCount || 0,
    readAuthenticatedOnly: data.readAuthenticatedOnly,
  };
  formData.append(
    "book",
    new Blob([JSON.stringify(book)], { type: "application/json" }),
  );

  return formData;
};
