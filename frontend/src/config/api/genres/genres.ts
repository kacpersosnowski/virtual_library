import axios from "axios";
import { CreateGenreDTO, Genre, GenresApi } from "./genres.types";

const url = "/genres";

export const genresApi: GenresApi = {
  getAllGenres: async () => {
    const response = await axios.get(url);
    return response.data;
  },
  createGenre: async (genre: CreateGenreDTO) => {
    const response = await axios.post<Genre>(url, genre);
    return response.data;
  },
};

export default genresApi;
