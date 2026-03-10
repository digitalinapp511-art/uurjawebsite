// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export const backendApi = createApi({
//     reducerPath: "backendApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: API_BASE_URL,
//     }),
//     tagTypes: ["Products"],
//     endpoints: (builder) => ({
//         getProducts: builder.query({
//             query: () => "/api/products/getAll",
//             transformResponse: (response) => response?.data || [],
//             providesTags: ["Products"],
//         }),
//         getProductById: builder.query({
//             query: (id) => `/api/products/get/${id}`,
//             transformResponse: (response) => response.data
//         }),
//     }),
// });

// export const {
//     useGetProductsQuery,
//     useGetProductByIdQuery

// } = backendApi;



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const backendApi = createApi({
    reducerPath: "backendApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,

        prepareHeaders: (headers) => {

            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Products", "Cart"],

    endpoints: (builder) => ({

        // PRODUCTS
        getProducts: builder.query({
            query: () => "/api/products/getAll",
            transformResponse: (response) => response?.data || [],
            providesTags: ["Products"],
        }),

        getProductById: builder.query({
            query: (id) => `/api/products/get/${id}`,
            transformResponse: (response) => response.data
        }),

        // CART
        getCart: builder.query({
            query: () => "/api/cart",
            providesTags: ["Cart"]
        }),

        addToCart: builder.mutation({
            query: (body) => ({
                url: "/api/cart/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),

        updateCart: builder.mutation({
            query: (body) => ({
                url: "/api/cart/update",
                method: "PUT",
                body
            }),
            invalidatesTags: ["Cart"]
        }),

        removeCart: builder.mutation({
            query: (body) => ({
                url: "/api/cart/remove",
                method: "DELETE",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,

    // CART
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useRemoveCartMutation,

} = backendApi;