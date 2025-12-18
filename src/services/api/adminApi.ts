import { baseApi } from "./baseApi";

export interface AdminStats {
  totalUsers: number;
  totalDrivers: number;
  totalPassengers: number;
  totalTrips: number;
  totalBookings: number;
  activeTrips: number;
  totalRevenue: number;
  pendingVerifications: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "driver" | "passenger" | "admin";
  status: "active" | "suspended" | "pending";
  created_at: string;
  verified?: boolean;
}

export interface AdminTrip {
  id: string;
  driver_id: string;
  driver_name: string;
  origin: string;
  destination: string;
  departure_time: string;
  total_seats: number;
  available_seats: number;
  price_per_seat: number;
  status: "active" | "completed" | "cancelled";
}

export interface AdminBooking {
  id: string;
  trip_id: string;
  passenger_id: string;
  passenger_name: string;
  seats_booked: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
}

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin dashboard stats
    getAdminStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
      providesTags: ["Admin"],
    }),

    // Get all users
    getAdminUsers: builder.query<AdminUser[], void>({
      query: () => "/admin/users",
      providesTags: ["Admin"],
    }),

    // Get user by ID
    getAdminUserById: builder.query<AdminUser, string>({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: ["Admin"],
    }),

    // Suspend user
    suspendUser: builder.mutation<{ success: boolean }, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    // Activate user
    activateUser: builder.mutation<{ success: boolean }, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}/activate`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    // Delete user
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    // Get all trips (admin view)
    getAdminTrips: builder.query<AdminTrip[], void>({
      query: () => "/admin/trips",
      providesTags: ["Admin"],
    }),

    // Get all bookings (admin view)
    getAdminBookings: builder.query<AdminBooking[], void>({
      query: () => "/admin/bookings",
      providesTags: ["Admin"],
    }),

    // Cancel trip (admin)
    cancelTrip: builder.mutation<{ success: boolean }, string>({
      query: (tripId) => ({
        url: `/admin/trips/${tripId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    // Get admin profile
    getAdminProfile: builder.query<AdminProfile, void>({
      query: () => "/admin/profile",
      providesTags: ["User"],
    }),

    // Update admin profile
    updateAdminProfile: builder.mutation<AdminProfile, Partial<AdminProfile>>({
      query: (data) => ({
        url: "/admin/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Verify driver
    verifyDriver: builder.mutation<{ success: boolean }, string>({
      query: (driverId) => ({
        url: `/admin/drivers/${driverId}/verify`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useSuspendUserMutation,
  useActivateUserMutation,
  useDeleteUserMutation,
  useGetAdminTripsQuery,
  useGetAdminBookingsQuery,
  useCancelTripMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useVerifyDriverMutation,
} = adminApi;

export default adminApi;
