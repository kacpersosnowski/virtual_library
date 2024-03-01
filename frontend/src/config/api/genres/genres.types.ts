import { PageSearchData, PagedResponse } from "../common/common.types";

export type Genre = { id: string; name: string };
export type CreateGenreDTO = { name: string };
export type UpdateGenreData = { id: string; genre: CreateGenreDTO };
export type GenreBookCount = {
  [key: string]: number;
};

export type GenresApi = {
  getAllGenres: () => Promise<Genre[]>;
  getAllGenresForAdmin: (
    params: PageSearchData,
  ) => Promise<PagedResponse<Genre>>;
  getGenreDetails: (id: string) => Promise<Genre>;
  getBookCountsByGenre: () => Promise<GenreBookCount>;
  createGenre: (genre: CreateGenreDTO) => Promise<Genre>;
  updateGenre: (data: UpdateGenreData) => Promise<Genre>;
  deleteGenre: (id: string) => Promise<void>;
};
