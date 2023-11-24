import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  count: 0,
  isConnectorChnaged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, { payload }) => {
      state.data = payload;
    },
    addNewAccesstoken: (state, { payload }) => {
      state.data.access_token = payload;
    },
    logoutReducer: (state) => {
      state.data = initialState;
    },

    connectorChanged: (state, { payload }) => {
      state.isConnectorChnaged = payload;
    },

    increament: (state, { payload: { number } }) => {
      state.count += number;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const {
  increament,
  decrement,
  userData,
  logoutReducer,
  connectorChanged,
  addNewAccesstoken,
} = userSlice.actions;

export default userSlice.reducer;
