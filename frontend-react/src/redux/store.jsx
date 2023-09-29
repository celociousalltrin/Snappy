import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import purgeStoredState from "redux-persist/es/purgeStoredState";

const persistConfig = {
  key: "snappy_root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const purgeStore = () => {
  purgeStoredState(persistConfig);
};
