import { Genre } from "./genres.types";

export const parseGenresList = (data: Genre[]): string[] => {
  const result = [];
  for (const genre of data) {
    result.push(genre.name);
  }
  return result;
};
