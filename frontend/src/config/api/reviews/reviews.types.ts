import { PageSearchData, PagedResponse } from "../common/common.types";
import { UserData } from "../users/users.types";

export type Review = {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: UserData;
  bookId: string;
  created: string;
  lastModified: string;
};

export type CreateReviewDTO = {
  bookId: string;
  rating: number;
  content: string;
};

export type GetReviewData = {
  bookId: string;
  queryData: PageSearchData;
};

export type UpdateReviewData = {
  id: string;
  newData: CreateReviewDTO;
};

export type ReviewsApi = {
  getReviewsForBook: (data: GetReviewData) => Promise<PagedResponse<Review>>;
  createReview: (review: CreateReviewDTO) => Promise<Review>;
  updateReview: (data: UpdateReviewData) => Promise<Review>;
  deleteReview: (id: string) => Promise<void>;
};
