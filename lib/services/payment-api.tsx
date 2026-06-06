import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Campaign, CampaignDetailsResponse, CampaignResponse, CMSData, CMSResponse, CreateOrderPayload, DonationOrderData, DonationOrderResponse, GalleryItem, GalleryResponse, verifyPaymentPayload } from "./types";
const APIENDPOINT = process.env.API_ENDPOINT;

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation<DonationOrderData, CreateOrderPayload>({
            query: (body) => ({
                url: `/donations/create-order`,
                method: "POST",
                body
            }),
            transformResponse: (response: DonationOrderResponse) => response?.data,
        }),

        verifyPayment: builder.mutation<DonationOrderData, verifyPaymentPayload>({
            query: (body) => ({
                url: `/donations/verify-payment`,
                method: "POST",
                body
            }),
            transformResponse: (response: DonationOrderResponse) => response?.data,
        }),

        paymentFailed: builder.mutation<DonationOrderData, {
            donation_id: number,
            campaign_id: string,
            reason: string
        }>({
            query: (body) => ({
                url: `/donations/payment-failed`,
                method: "POST",
                body
            }),
            transformResponse: (response: DonationOrderResponse) => response?.data,
        }),
    })
})

export const { useCreateOrderMutation, useVerifyPaymentMutation, usePaymentFailedMutation } = paymentApi;