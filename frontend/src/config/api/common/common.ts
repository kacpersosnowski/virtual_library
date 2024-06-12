import { CommonApi, Statistics } from "./common.types";
import axios from "axios";

const url = "/stats/all";

export const commonApi: CommonApi = {
  getStatistics: async () => {
    const response = await axios.get<Statistics>(url);
    return response.data;
  },
};
