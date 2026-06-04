import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogDataType, BlogsResponseDataType, BlogsResponseDetailsDataType, CMSData, CMSResponse, EventDetailsData, EventDetailsResponse, EventItem, EventsResponse, GalleryItem, GalleryResponse, VideoItem, VideosResponse } from "./service-types";
const APIENDPOINT = process.env.API_ENDPOINT;

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    tagTypes: ["events"],
    endpoints: (builder) => ({
        getUpComingEvent: builder.query<EventItem[], void>({
            query: () => ({
                url: `events`,
                method: "GET",
            }),
            transformResponse: (response: EventsResponse) => response?.data,
        }),

        getVideos: builder.query<VideoItem[], void>({
            query: () => ({
                url: `videos`,
                method: "GET",
            }),
            transformResponse: (response: VideosResponse) => response?.data,
        }),

        getBlogs: builder.query<BlogDataType[], void>({
            query: () => ({
                url: `blogs`,
                method: "GET",
            }),
            transformResponse: (response: BlogsResponseDataType) => response?.data,
        }),

        getBlogBySlug: builder.query<BlogDataType, string>({
            query: (slug) => ({
                url: `blogs/${slug}`,
                method: "GET",
            }),
            transformResponse: (response: BlogsResponseDetailsDataType) => response?.data,
        }),

        getHomeUpComingEvent: builder.query<EventItem[], void>({
            query: () => ({
                url: `events-home`,
                method: "GET",
            }),
            transformResponse: (response: EventsResponse) => response?.data,
        }),

        getEventById: builder.query<EventDetailsData, string>({
            query: (id) => ({
                url: `events/${id}`,
                method: "GET",
            }),
            transformResponse: (response: EventDetailsResponse) => response?.data,
        }),

        registerForEvent: builder.mutation<EventItem, {
            event_id: string;
            name: string,
            email: string,
            phone: string,
        }>({
            query: (body) => ({
                url: `events/register`,
                method: "POST",
                body: { ...body }
            }),
            transformResponse: (response: EventsResponse) => response?.data?.[0] as EventItem,
        }),
    })
})

export const { useGetUpComingEventQuery, useGetBlogsQuery, useGetBlogBySlugQuery, useGetHomeUpComingEventQuery, useGetVideosQuery, useRegisterForEventMutation, useGetEventByIdQuery } = eventsApi;