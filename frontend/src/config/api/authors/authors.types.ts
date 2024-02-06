export type Author = { id: string; firstName: string; lastName: string };
export type CreateAuthorDTO = { firstName: string; lastName: string };

export type AuthorsApi = {
  getAllAuthors: () => Promise<Author[]>;
  createAuthor: (author: CreateAuthorDTO) => Promise<Author>;
};
