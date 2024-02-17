import { PageSearchData, PagedResponse } from "../common/common.types";

export type Author = { id: string; firstName: string; lastName: string };
export type CreateAuthorDTO = { firstName: string; lastName: string };
export type UpdateAuthorData = { id: string; author: CreateAuthorDTO };

export type AuthorsApi = {
  getAllAuthors: () => Promise<Author[]>;
  getAllAuthorsForAdmin: (
    params: PageSearchData,
  ) => Promise<PagedResponse<Author>>;
  getAuthorDetails: (id: string) => Promise<Author>;
  createAuthor: (author: CreateAuthorDTO) => Promise<Author>;
  updateAuthor: (data: UpdateAuthorData) => Promise<Author>;
  deleteAuthor: (id: string) => Promise<void>;
};
