import { baseApi } from "./baseApi";

export const ridesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 3.1 Trip Search (Public) - Enhanced with flexible matching
    searchRides: build.query<
      any[],
      { origin: string; destination: string; date?: string }
    >({
      query: ({ origin, destination, date }) => {
        const params = new URLSearchParams();
        if (origin) params.append("origin", origin);
        if (destination) params.append("destination", destination);
        if (date) params.append("date", date);

        return {
          url: `/rides/search?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Ride"],
      // Transform response to add match quality indicators
      transformResponse: (response: any[]) => {
        return response.map((ride) => ({
          ...ride,
          // Ensure consistent field names
          origin: ride.origin || ride.from_location,
          destination: ride.destination || ride.to_location,
          available_seats: ride.available_seats ?? ride.seats_available,
          total_seats: ride.total_seats ?? ride.total_seats,
        }));
      },
    }),

    // 3.1b Get All Available Rides (for passengers to browse)
    getAvailableRides: build.query<any[], { status?: string }>({
      query: ({ status = "active" } = {}) => ({
        url: `/rides?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Ride"],
      transformResponse: (response: any[]) => {
        return response.map((ride) => ({
          ...ride,
          // Ensure consistent field names
          origin: ride.origin || ride.from_location,
          destination: ride.destination || ride.to_location,
          available_seats: ride.available_seats ?? ride.seats_available,
          total_seats: ride.total_seats ?? ride.total_seats,
        }));
      },
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
  useLazySearchRidesQuery,
  useGetAvailableRidesQuery,
  useCreateRideMutation,
  useGetDriverRidesQuery,
  useUpdateRideMutation,
  useDeleteRideMutation,
  useCreateBookingMutation,
  useGetPassengerBookingsQuery,
  useApproveBookingMutation,
  useCancelBookingMutation,
} = ridesApi;
