import axios from "axios";
import { CreateGenreDTO, Genre, GenresApi } from "./genres.types";
import { PagedResponse } from "../common/common.types";

const url = "/genres";

export const genresApi: GenresApi = {
  getAllGenres: async () => {
    const response = await axios.get<PagedResponse<Genre>>(url);
    return response.data.content;
  },
  createGenre: async (genre: CreateGenreDTO) => {
    const response = await axios.post<Genre>(url, genre);
    return response.data;
  },
};

export default genresApi;
