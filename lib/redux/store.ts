import { configureStore } from "@reduxjs/toolkit";
import { masterApi } from "../services/master-api";

export const store = configureStore({
  reducer: {
    [masterApi.reducerPath]: masterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(masterApi.middleware),
});

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch Type
export type AppDispatch = typeof store.dispatch;