import axios from "axios";
import { GenresApi } from "./genres.types";

const url = "/genres";

export const genresApi: GenresApi = {
  getAllGenres: async () => {
    const response = await axios.get(url);
    return response.data;
  },
};

export default genresApi;
