import { configureStore } from "@reduxjs/toolkit";

import snackbarSlice from "./slices/snackbar-slice";
import zoomSlice from "./slices/zoom-slice";

const store = configureStore({
  reducer: { snackbar: snackbarSlice.reducer, zoom: zoomSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
