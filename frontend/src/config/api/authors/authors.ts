import axios from "axios";
import { Author, AuthorsApi, CreateAuthorDTO } from "./authors.types";
import { PagedResponse } from "../common/common.types";

const url = "/authors";

export const authorsApi: AuthorsApi = {
  getAllAuthors: async () => {
    const response = await axios.get<PagedResponse<Author>>(url);
    return response.data.content;
  },
  getAllAuthorsForAdmin: async (params) => {
    const response = await axios.get<PagedResponse<Author>>(url, { params });
    return response.data;
  },
  getAuthorDetails: async (id) => {
    const response = await axios.get<Author>(`${url}/${id}`);
    return response.data;
  },
  createAuthor: async (author: CreateAuthorDTO) => {
    const response = await axios.post<Author>(url, author);
    return response.data;
  },
  updateAuthor: async ({ id, author }) => {
    const response = await axios.put<Author>(`${url}/${id}`, author);
    return response.data;
  },
  deleteAuthor: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },
};

export default authorsApi;
