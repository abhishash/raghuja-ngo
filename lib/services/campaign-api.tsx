import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Campaign, CampaignDetailsResponse, CampaignResponse, CMSData, CMSResponse, GalleryItem, GalleryResponse, ReceiptData, ReceiptResponse } from "./types";
const APIENDPOINT = process.env.API_ENDPOINT;

export const campaignApi = createApi({
    reducerPath: 'campaignApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    tagTypes: ["campaigns"],
    endpoints: (builder) => ({
        getCampaigns: builder.query<Campaign[], void>({
            query: () => ({
                url: `campaigns`,
                method: "GET",
            }),
            transformResponse: (response: CampaignResponse) => response?.data,
        }),

        getCampaignByid: builder.query<Campaign, number>({
            query: (id) => ({
                url: `campaigns/${id}`,
                method: "GET",
            }),
            transformResponse: (response: CampaignDetailsResponse) => response?.data,
        }),

        getReceiptByid: builder.query<ReceiptData, string>({
            query: (id) => ({
                // url: `donations/ngo_5HNQMBYWBB/receipt`,
                url: `donations/${id}/receipt`,
                method: "GET",
            }),
            transformResponse: (response: ReceiptResponse) => response?.data,
        }),

    })
})

export const { useGetCampaignsQuery, useGetCampaignByidQuery, useGetReceiptByidQuery } = campaignApi;