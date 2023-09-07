import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state, { payload: { number } }) => {
      state.count += number;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increament, decrement } = userSlice.actions;

export default userSlice.reducer;
