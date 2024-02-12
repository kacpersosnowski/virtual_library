import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchText: {
    booksTable: string;
  };
}

const searchSlice = createSlice({
  name: "search",
  initialState: { searchText: { booksTable: "" } } as SearchState,
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

export type searchStateKey = "booksTable";

export const searchActions = searchSlice.actions;

export default searchSlice;
