import { configureStore } from "@reduxjs/toolkit";
import { masterApi } from "../services/master-api";
import { campaignApi } from "../services/campaign-api";

export const store = configureStore({
  reducer: {
    [masterApi.reducerPath]: masterApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(masterApi.middleware).concat(campaignApi.middleware),
});

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch Type
export type AppDispatch = typeof store.dispatch;