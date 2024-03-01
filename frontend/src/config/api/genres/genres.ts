import axios from "axios";
import {
  CreateGenreDTO,
  Genre,
  GenreBookCount,
  GenresApi,
} from "./genres.types";
import { PagedResponse } from "../common/common.types";

const url = "/genres";
const bookCountUrl = `${url}/book-count`;

export const genresApi: GenresApi = {
  getAllGenres: async () => {
    const response = await axios.get<PagedResponse<Genre>>(url);
    return response.data.content;
  },
  getAllGenresForAdmin: async (params) => {
    const response = await axios.get<PagedResponse<Genre>>(url, {
      params: { page: params.page, search: params.search || "" },
    });
    return response.data;
  },
  getGenreDetails: async (id) => {
    const response = await axios.get<Genre>(`${url}/${id}`);
    return response.data;
  },
  getBookCountsByGenre: async () => {
    const response = await axios.get<GenreBookCount>(bookCountUrl);
    return response.data;
  },
  createGenre: async (genre: CreateGenreDTO) => {
    const response = await axios.post<Genre>(url, genre);
    return response.data;
  },
  updateGenre: async ({ id, genre }) => {
    const response = await axios.put<Genre>(`${url}/${id}`, genre);
    return response.data;
  },
  deleteGenre: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },
};

export default genresApi;
