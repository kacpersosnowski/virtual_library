import axios from "axios";
import { Author, AuthorsApi, CreateAuthorDTO } from "./authors.types";

const url = "/authors";

export const authorsApi: AuthorsApi = {
  getAllAuthors: async () => {
    const response = await axios.get<Author[]>(url);
    return response.data;
  },
  createAuthor: async (author: CreateAuthorDTO) => {
    const response = await axios.post<Author>(url, author);
    return response.data;
  },
};

export default authorsApi;
