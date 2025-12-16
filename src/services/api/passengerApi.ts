import { baseApi } from "./baseApi";
import type {
  SearchTripsParams,
  TripSearchResponse,
  BookingResponse,
} from "../../types/type";

export const passengerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Search trips
    searchTrips: builder.query<TripSearchResponse[], SearchTripsParams>({
      query: (params) => ({
        url: "/rides/search",
        method: "GET",
        params: {
          origin: params.origin,
          destination: params.destination,
          ...(params.date && { date: params.date }),
        },
      }),
      providesTags: ["Ride"],
    }),

    // Get driver trips (available rides)
    getDriverTrips: builder.query<TripSearchResponse[], void>({
      query: () => ({
        url: "/rides/driver",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),

    // Book a ride
    bookRide: builder.mutation<
      BookingResponse,
      { rideId: string; seats?: number }
    >({
      query: ({ rideId, seats }) => ({
        url: `/rides/${rideId}/book`,
        method: "POST",
        body: { seats: seats || 1 },
      }),
      invalidatesTags: ["Booking", "Ride"],
    }),

    // Get user's bookings
    getUserBookings: builder.query<BookingResponse[], void>({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    // Cancel a booking
    cancelBooking: builder.mutation<{ message: string }, string>({
      query: (bookingId) => ({
        url: `/rides/booking/${bookingId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Rate a booking
    rateBooking: builder.mutation<
      { message: string },
      { bookingId: string; rating: number }
    >({
      query: ({ bookingId, rating }) => ({
        url: `/bookings/${bookingId}/rate`,
        method: "PUT",
        body: { rating },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useSearchTripsQuery,
  useGetDriverTripsQuery,
  useBookRideMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRateBookingMutation,
} = passengerApi;
