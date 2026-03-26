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
    import.meta.env.VITE_API_BASE_URL || "https://backend.uurja.in";
    // "https://backend.uurja.in";

    console.log("API Base URL:", API_BASE_URL); // ✅ Log the base URL to verify it's correct   

export const backendApi = createApi({
    reducerPath: "backendApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,

        prepareHeaders: (headers) => {
            const userToken = localStorage.getItem("token");
            const adminToken = localStorage.getItem("adminToken");

            const isAdminPage = window.location.pathname.startsWith("/admin");
            const token = isAdminPage ? adminToken : userToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Products", "Cart", "Orders", "Banners"],

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
            transformResponse: (response) => response.data,

            providesTags: (result) =>
                Array.isArray(result)
                    ? [
                        ...result.map((item) => ({
                            type: "Cart",
                            id: item.product?.productId,
                        })),
                        { type: "Cart", id: "LIST" },
                    ]
                    : [{ type: "Cart", id: "LIST" }],
        }),

        addToCart: builder.mutation({
            query: (body) => ({
                url: "/api/cart/add",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }],
        }),

        updateCart: builder.mutation({
            query: (body) => ({
                url: "/api/cart/update",
                method: "PUT",
                body,
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }],
        }),

        removeCart: builder.mutation({
            query: (productId) => ({
                url: `/api/cart/remove`,
                method: "DELETE",
                body: { productId },
            }),
            invalidatesTags: [{ type: "Cart", id: "LIST" }],
        }),


        //order
        placeOrder: builder.mutation({
            query: (orderData) => ({
                url: "/api/orders/place",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Cart", "Orders"],
        }),

        getMyOrders: builder.query({
            query: () => "/api/orders/my-orders",
            transformResponse: (response) => response?.data || [],
            providesTags: ["Orders"],
        }),

        buyNowOrder: builder.mutation({
            query: (data) => ({
                url: "/api/orders/buy-now",
                method: "PUT",
                body: data,
            }),
        }),

        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `/api/orders/cancel/${orderId}`,
                method: "PUT",
            }),
            invalidatesTags: ["Orders"],
        }),

        createRazorpayOrder: builder.mutation({
            query: (data) => ({
                url: "/api/orders/razorpay-order",
                method: "POST",
                body: data
            })
        }),


        //admin login 
        adminLogin: builder.mutation({
            query: (data) => ({
                url: "/api/admin/login",
                method: "POST",
                body: data,
            }),
        }),

        // GET all orders (admin)
        getAdminOrders: builder.query({
            query: () => ({
                url: "/api/orders/admin/orders",
                method: "GET",
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // ✅ send token
                // },
            }),
            providesTags: ["Orders"],
        }),

        // UPDATE order status (admin)
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/api/orders/admin/status/${id}`,
                method: "PUT",
                body: { orderStatus: status },
            }),
            invalidatesTags: ["Orders"],
        }),

        //admin add products 
        addProduct: builder.mutation({
            query: (formData) => ({
                url: "/api/products",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Products"],
        }),

        // UPDATE product
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/products/update/${id}`,
                method: "PUT",
                body: formData, // ✅ FormData for image uploads
            }),
            invalidatesTags: ["Products"],
        }),

        // DELETE product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        // GET all banners (admin)
        //for user
        getBanners: builder.query({
            query: () => "/api/banners",
            providesTags: ["Banners"],
        }),

        //for admin
        getAdminBanners: builder.query({
            query: () => "/api/banners/admin",
            providesTags: ["Banners"],
        }),

        // CREATE banner
        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/api/banners",
                method: "POST",
                body: formData, // ✅ FormData for image upload
            }),
            invalidatesTags: ["Banners"],
        }),

        // UPDATE banner
        updateBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/banners/update/${id}`,
                method: "PUT",
                body: formData, // ✅ FormData for image upload
            }),
            invalidatesTags: ["Banners"],
        }),

        // DELETE banner
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/api/banners/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Banners"],
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

    //order
    usePlaceOrderMutation,
    useGetMyOrdersQuery,
    useCancelOrderMutation,
    useBuyNowOrderMutation,
    useCreateRazorpayOrderMutation,

    //admin orders
    useAdminLoginMutation,
    useGetAdminOrdersQuery,
    useUpdateOrderStatusMutation,

    //admin add product
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

    //Banner
    useGetBannersQuery,
    useGetAdminBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,

} = backendApi;