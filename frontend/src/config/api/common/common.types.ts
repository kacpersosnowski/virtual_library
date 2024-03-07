export type PagedResponse<T> = {
  totalElements: number;
  content: T[];
};

export type PageSearchData = {
  page: number;
  search?: string;
};

export type BookRating = {
  rateCount: number;
  rateAverage: number;
};
