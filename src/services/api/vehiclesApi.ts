import { baseApi } from "./baseApi";

export const vehiclesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 2.1 Register Vehicle
    registerVehicle: build.mutation<
      any,
      {
        license_plate: string;
        seat_capacity: number;
        make?: string;
        model?: string;
        year?: number;
        color?: string;
      }
    >({
      query: (body) => ({ url: "/vehicles/", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    // 2.2 Get All Vehicles
    getVehicles: build.query<any[], void>({
      query: () => ({ url: "/vehicles/", method: "GET" }),
      providesTags: ["User"],
    }),

    // 2.3 Update Vehicle
    updateVehicle: build.mutation<
      any,
      {
        vehicle_id: number;
        data: Partial<{ color: string; seat_capacity: number }>;
      }
    >({
      query: ({ vehicle_id, data }) => ({
        url: `/vehicles/${vehicle_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // 2.4 Delete Vehicle
    deleteVehicle: build.mutation<{ success: boolean }, number>({
      query: (vehicle_id) => ({
        url: `/vehicles/${vehicle_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterVehicleMutation,
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehiclesApi;
