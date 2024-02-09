import { Genre } from "./genres.types";

export const parseGenresString = (data: Genre[]): string => {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += data[i].name;
    if (i !== data.length - 1) {
      result += ", ";
    }
  }
  return result;
};

export const parseGenresList = (data: Genre[]): string[] => {
  const result = [];
  for (const genre of data) {
    result.push(genre.name);
  }
  return result;
};
