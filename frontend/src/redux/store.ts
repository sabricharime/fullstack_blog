import { configureStore } from "@reduxjs/toolkit";
import { API } from "./api/API";
import configSlice from "./slices/config.slice"

const store = configureStore({
  reducer: {
    config:configSlice,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
