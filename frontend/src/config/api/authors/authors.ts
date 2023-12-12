import axios from "axios";
import { AuthorsApi } from "./authors.types";

const url = "/authors";

export const authorsApi: AuthorsApi = {
  getAllAuthors: async () => {
    const response = await axios.get(url);
    return response.data;
  },
};

export default authorsApi;
