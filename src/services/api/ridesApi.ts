import { baseApi } from "./baseApi";

export const ridesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 3.1 Trip Search (Public)
    searchRides: build.query<any[], { origin: string; destination: string }>({
      query: ({ origin, destination }) => ({
        url: `/rides/search?origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}`,
      }),
      providesTags: ["Ride"],
    }),

    // 3.2 Create Trip
    createRide: build.mutation<
      any,
      {
        origin: string;
        destination: string;
        departure_time: string; // ISO 8601
        total_seats: number;
        vehicle_id: number;
      }
    >({
      query: (body) => ({ url: "/rides/", method: "POST", body }),
      invalidatesTags: ["Ride"],
    }),

    // 3.3 Get Driver Trip History
    getDriverRides: build.query<any[], void>({
      query: () => ({ url: "/rides/driver", method: "GET" }),
      providesTags: ["Ride", "Booking"],
    }),

    // 3.4 Update Trip
    updateRide: build.mutation<
      any,
      {
        ride_id: number;
        data: Partial<{ total_seats: number; destination: string }>;
      }
    >({
      query: ({ ride_id, data }) => ({
        url: `/rides/${ride_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),

    // 3.5 Cancel/Delete Trip
    deleteRide: build.mutation<{ success: boolean }, number>({
      query: (ride_id) => ({ url: `/rides/${ride_id}`, method: "DELETE" }),
      invalidatesTags: ["Ride"],
    }),

    // 3.6 Create Booking
    createBooking: build.mutation<any, { ride_id: number; seats?: number }>({
      query: ({ ride_id, seats = 1 }) => ({
        url: `/rides/${ride_id}/book`,
        method: "POST",
        body: { seats },
      }),
      invalidatesTags: ["Booking", "Ride"],
    }),

    // 3.7 Get Passenger Booking History
    getPassengerBookings: build.query<any[], void>({
      query: () => ({ url: "/rides/bookings", method: "GET" }),
      providesTags: ["Booking"],
    }),

    // 3.8 Driver Approve Booking
    approveBooking: build.mutation<any, { booking_id: number }>({
      query: ({ booking_id }) => ({
        url: `/rides/booking/${booking_id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Booking", "Ride"],
    }),

    // 3.9 Passenger Cancel Booking
    cancelBooking: build.mutation<any, { booking_id: number }>({
      query: ({ booking_id }) => ({
        url: `/rides/booking/${booking_id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Booking", "Ride"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSearchRidesQuery,
  useCreateRideMutation,
  useGetDriverRidesQuery,
  useUpdateRideMutation,
  useDeleteRideMutation,
  useCreateBookingMutation,
  useGetPassengerBookingsQuery,
  useApproveBookingMutation,
  useCancelBookingMutation,
} = ridesApi;
