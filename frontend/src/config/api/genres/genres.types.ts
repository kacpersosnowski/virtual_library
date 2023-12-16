export type Genre = { id: string; name: string };

export type GenresApi = {
  getAllGenres: () => Promise<Genre[]>;
};
