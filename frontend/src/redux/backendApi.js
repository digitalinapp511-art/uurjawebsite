import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const backendApi = createApi({
    reducerPath: "backendApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/api/products/getAll",
            transformResponse: (response) => response?.data || [],
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: (id) => `/api/products/get/${id}`,
            transformResponse: (response) => response.data
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery

} = backendApi;