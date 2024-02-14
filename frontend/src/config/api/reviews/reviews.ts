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
  createReview: async (review) => {
    const response = await axios.post<Review>(url, review);
    return response.data;
  },
  updateReview: async (data) => {
    const response = await axios.put<Review>(`${url}/${data.id}`, data.newData);
    return response.data;
  },
  deleteReview: async (id) => {
    await axios.delete(`${url}/${id}`);
  },
};
