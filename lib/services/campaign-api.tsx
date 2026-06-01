import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Campaign, CampaignDetailsResponse, CampaignResponse, CMSData, CMSResponse, GalleryItem, GalleryResponse } from "./service-types";
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
        
    })
})

export const { useGetCampaignsQuery, useGetCampaignByidQuery } = campaignApi;