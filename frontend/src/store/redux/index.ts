import { configureStore } from "@reduxjs/toolkit";

import snackbarSlice from "./slices/snackbar-slice";

const store = configureStore({ reducer: { snackbar: snackbarSlice.reducer } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
