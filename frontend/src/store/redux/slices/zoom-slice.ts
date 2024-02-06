import { createSlice } from "@reduxjs/toolkit";

interface ZoomState {
  scale: number;
}

const zoomSlice = createSlice({
  name: "zoom",
  initialState: { scale: 1 } as ZoomState,
  reducers: {
    setScale(state, action) {
      state.scale = action.payload;
    },
  },
});

export const zoomActions = zoomSlice.actions;

export default zoomSlice;
