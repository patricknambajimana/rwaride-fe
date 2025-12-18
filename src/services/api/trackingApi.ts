import { baseApi } from "./baseApi";

export interface DriverLocation {
  driver_id: number;
  latitude: number;
  longitude: number;
  updated_at: string;
}

export const trackingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Driver Location - GET /tracking/location/{driver_id}
    getDriverLocation: builder.query<DriverLocation, number>({
      query: (driverId) => `/tracking/location/${driverId}`,
      providesTags: (result, error, driverId) => [
        { type: "Tracking", id: driverId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDriverLocationQuery } = trackingApi;
