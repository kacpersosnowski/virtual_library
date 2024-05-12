import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchText: {
    booksTable: string;
    authorsTable: string;
    genresTable: string;
    booksForList: string;
    searchBooks: string;
  };
}

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: {
      booksTable: "",
      authorsTable: "",
      genresTable: "",
      booksForList: "",
      searchBooks: "",
    },
  } as SearchState,
  reducers: {
    setSearchText(
      state,
      action: {
        payload: { stateKey: searchStateKey; searchText: string };
        type: string;
      },
    ) {
      state.searchText[action.payload.stateKey] = action.payload.searchText;
    },
  },
});

export type searchStateKey =
  | "booksTable"
  | "authorsTable"
  | "genresTable"
  | "booksForList"
  | "searchBooks";

export const searchActions = searchSlice.actions;

export default searchSlice;
