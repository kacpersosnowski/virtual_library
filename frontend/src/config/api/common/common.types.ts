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

export type Statistics = {
  booksCount: number;
  authorsCount: number;
  genresCount: number;
};

export type CommonApi = {
  getStatistics: () => Promise<Statistics>;
};
