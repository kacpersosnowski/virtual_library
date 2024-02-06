export type Genre = { id: string; name: string };
export type CreateGenreDTO = { name: string };

export type GenresApi = {
  getAllGenres: () => Promise<Genre[]>;
  createGenre: (genre: CreateGenreDTO) => Promise<Genre>;
};
