import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderPayload, DonationOrderData, DonationOrderResponse } from "./types";
const APIENDPOINT = process.env.API_ENDPOINT;

export const registrationApi = createApi({
    reducerPath: 'registrationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            return headers;
        }
    }),
    tagTypes: ["registration"],
    endpoints: (builder) => ({
        createRegistration: builder.mutation<DonationOrderData, {
            name: string,
            email: string,
            phone: string,
            address: string,
            id_proof_type: string,
            id_proof_number: string,
            id_proof_file: File | null,
        }>({
            query: (body) => ({
                url: `/membership/register`,
                method: "POST",
                body
            }),
            transformResponse: (response: DonationOrderResponse) => response?.data,
        }),
    })
})

export const { useCreateRegistrationMutation } = registrationApi;