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

export const parseAllAuthorsString = (data: Author[]): string => {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += data[i].firstName + " " + data[i].lastName;
    if (i !== data.length - 1) {
      result += ", ";
    }
  }
  return result;
};

export const parseAuthorsList = (data: Author[]): string[] => {
  const result = [];
  for (const author of data) {
    result.push(author.firstName + " " + author.lastName);
  }
  return result;
};
