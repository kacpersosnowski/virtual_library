import { Author } from "./authors.types";

export const parseAuthorsString = (data: Author[]): string => {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i];
    const authorString =
      dataItem.lastName + " " + dataItem.firstName.charAt(0) + ".";
    result += authorString;

    if (i !== data.length - 1) {
      result += ", ";
    }
  }
  return result;
};
