import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import purgeStoredState from "redux-persist/es/purgeStoredState";

const persistConfig = {
  key: "snappy_root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  devTools: false,
  middleware,
});

export const purgeStore = () => {
  purgeStoredState(persistConfig);
};
