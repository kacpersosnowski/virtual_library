import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  isSnackbarVisible: boolean;
  message: string;
}

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: { isSnackbarVisible: false, message: "" } as SnackbarState,
  reducers: {
    show(state, action) {
      state.isSnackbarVisible = true;
      state.message = action.payload;
    },
    hide(state) {
      state.isSnackbarVisible = false;
      state.message = "";
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;
