import { baseApi } from "./baseApi";

export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  bio?: string;
  profileImage?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  licenseImageUrl?: string;
  insuranceProvider?: string;
  insuranceExpiry?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  licensePlate?: string;
  vehicleColor?: string;
  totalRides: number;
  totalEarnings: number;
  averageRating: number;
  acceptanceRate: number;
  cancellationRate: number;
  completionRate: number;
  joinDate: string;
  verificationStatus: "verified" | "pending" | "unverified";
}

export interface DriverLicenseData {
  licenseNumber: string;
  licenseExpiry: string;
  licenseImage?: File | string;
}

export interface BookingRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerRating: number;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  seatsRequested: number;
  estimatedDistance: string;
  estimatedDuration: string;
  offerPrice: number;
  status: "pending" | "accepted" | "rejected";
  requestTime: string;
}

export interface ActiveRide {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerRating: number;
  seatsBooked: number;
  seatsAvailable: number;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  estimatedArrivalTime: string;
  currentLocation?: string;
  status: "in-progress" | "completed" | "cancelled";
  earnings: number;
  notes?: string;
}

export interface CreateRideData {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  estimatedDuration?: string;
  description?: string;
}

export interface DriverStats {
  totalRides: number;
  totalEarnings: number;
  averageRating: number;
  acceptanceRate: number;
  cancellationRate: number;
  thisMonthEarnings: number;
  thisMonthRides: number;
  completionRate: number;
}

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get driver profile
    getDriverProfile: builder.query<DriverProfile, void>({
      query: () => "/driver/profile",
      providesTags: ["User"],
    }),

    // Update driver profile
    updateDriverProfile: builder.mutation<
      DriverProfile,
      Partial<DriverProfile>
    >({
      query: (data) => ({
        url: "/driver/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Upload driver license
    uploadDriverLicense: builder.mutation<
      { success: boolean; url: string },
      FormData
    >({
      query: (formData) => ({
        url: "/driver/license/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Update driver license info
    updateDriverLicense: builder.mutation<DriverProfile, DriverLicenseData>({
      query: (data) => ({
        url: "/driver/license",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Get driver stats
    getDriverStats: builder.query<DriverStats, void>({
      query: () => "/driver/stats",
    }),

    // Get booking requests
    getBookingRequests: builder.query<BookingRequest[], void>({
      query: () => "/driver/booking-requests",
      providesTags: ["Booking"],
    }),

    // Accept booking request
    acceptBookingRequest: builder.mutation<{ success: boolean }, string>({
      query: (requestId) => ({
        url: `/driver/booking-requests/${requestId}/accept`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Reject booking request
    rejectBookingRequest: builder.mutation<{ success: boolean }, string>({
      query: (requestId) => ({
        url: `/driver/booking-requests/${requestId}/reject`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Get active rides
    getActiveRides: builder.query<ActiveRide[], void>({
      query: () => "/driver/active-rides",
      providesTags: ["Ride"],
    }),

    // Create new ride
    createRide: builder.mutation<
      { success: boolean; rideId: string },
      CreateRideData
    >({
      query: (data) => ({
        url: "/driver/rides",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),

    // Update ride status
    updateRideStatus: builder.mutation<
      { success: boolean },
      { rideId: string; status: string }
    >({
      query: ({ rideId, status }) => ({
        url: `/driver/rides/${rideId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Ride"],
    }),

    // Get driver earnings
    getDriverEarnings: builder.query<
      { total: number; thisMonth: number; history: any[] },
      { period?: string }
    >({
      query: ({ period = "all" }) => `/driver/earnings?period=${period}`,
    }),
  }),
});

export const {
  useGetDriverProfileQuery,
  useUpdateDriverProfileMutation,
  useUploadDriverLicenseMutation,
  useUpdateDriverLicenseMutation,
  useGetDriverStatsQuery,
  useGetBookingRequestsQuery,
  useAcceptBookingRequestMutation,
  useRejectBookingRequestMutation,
  useGetActiveRidesQuery,
  useCreateRideMutation,
  useUpdateRideStatusMutation,
  useGetDriverEarningsQuery,
} = driverApi;
