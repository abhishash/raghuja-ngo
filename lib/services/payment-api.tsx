import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Campaign, CampaignDetailsResponse, CampaignResponse, CMSData, CMSResponse, GalleryItem, GalleryResponse } from "./service-types";
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
        createOrder: builder.mutation<Campaign, CreateOrderPayload>({
            query: (body) => ({
                url: `/donations/create-order`,
                method: "POST",
                body
            }),
            transformResponse: (response: CampaignResponse) => response?.data,
        }),
    })
})

export const { useCreateOrderMutation } = paymentApi;