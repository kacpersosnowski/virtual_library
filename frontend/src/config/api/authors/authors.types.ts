export type Author = { id: string; firstName: string; lastName: string };

export type AuthorsApi = {
  getAllAuthors: () => Promise<Author[]>;
};
