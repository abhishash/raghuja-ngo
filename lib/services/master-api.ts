import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CMSData, CMSResponse, ContactDataTypes, EnquiryData, EnquiryResponse, EventItem, EventsResponse, GalleryItem, GalleryResponse, TeamMember, TeamResponse } from "./types";
const APIENDPOINT = process.env.API_ENDPOINT;

type FAQItem = {
    name: string;
    description: string;
};

type FAQResponse = {
    status: boolean;
    message: string;
    data: FAQItem[];
};

export const masterApi = createApi({
    reducerPath: 'masterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    tagTypes: ["master"],
    endpoints: (builder) => ({
        getCMS: builder.query<CMSData, void>({
            query: () => ({
                url: `cms`,
                method: "GET",
            }),
            transformResponse: (response: CMSResponse) => response?.data,
        }),
        getFAQ: builder.query<FAQItem[], void>({
            query: () => ({
                url: `faq`,
                method: "GET",
            }),
            transformResponse: (response: FAQResponse) => response?.data,
        }),
        getGallery: builder.query<GalleryItem[], void>({
            query: () => ({
                url: `gallery`,
                method: "GET",
            }),
            transformResponse: (response: GalleryResponse) => response?.data,
        }),
        getTeams: builder.query<TeamMember[], void>({
            query: () => ({
                url: `teams`,
                method: "GET",
            }),
            transformResponse: (response: TeamResponse) => response?.data,
        }),
        contactUs: builder.mutation<EnquiryData, ContactDataTypes>({
            query: (body) => ({
                url: `contact-enquiry`,
                method: "POST",
                body: { ...body }
            }),
            transformResponse: (response: EnquiryResponse) => response?.data,
        }),
    })
})

export const { useGetCMSQuery, useGetGalleryQuery, useGetFAQQuery, useGetTeamsQuery, useContactUsMutation } = masterApi;