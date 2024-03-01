export type PagedResponse<T> = {
  totalElements: number;
  content: T[];
};

export type PageSearchData = {
  page: number;
  search?: string;
};

export type BookRating = {
  id: string;
  bookId: string;
  rateCount: number;
  rateAverage: number;
};
