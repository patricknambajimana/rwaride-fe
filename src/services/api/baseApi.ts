import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    prepareHeaders: (headers) => {
      // Add auth token
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Handle response errors globally
    validateStatus: (response, result) => {
      // Consider any response with a 2xx status code as successful
      return response.status >= 200 && response.status < 300;
    },
  }),
  tagTypes: ["Auth", "User", "Ride", "Booking", "Admin"],
  endpoints: () => ({}),
});

export type BaseApi = typeof baseApi;
