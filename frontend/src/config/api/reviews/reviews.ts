import axios from "axios";

import { Review, ReviewsApi } from "./reviews.types";
import { PagedResponse } from "../common/common.types";

const url = "/reviews";

export const reviewsApi: ReviewsApi = {
  getReviewsForBook: async (data) => {
    const response = await axios.get<PagedResponse<Review>>(
      `${url}/book/${data.bookId}`,
      { params: data.queryData },
    );
    return response.data;
  },
};
