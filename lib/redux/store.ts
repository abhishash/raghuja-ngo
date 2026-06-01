import { configureStore } from "@reduxjs/toolkit";
import { masterApi } from "../services/master-api";
import { campaignApi } from "../services/campaign-api";
import { paymentApi } from "../services/payment-api";

export const store = configureStore({
  reducer: {
    [masterApi.reducerPath]: masterApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(masterApi.middleware).concat(campaignApi.middleware).concat(paymentApi.middleware),
});

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch Type
export type AppDispatch = typeof store.dispatch;