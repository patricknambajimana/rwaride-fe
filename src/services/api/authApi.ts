import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 1.1 Register User
    register: build.mutation<
      { access_token: string },
      {
        full_name: string;
        email: string;
        phone_number: string;
        password: string;
        role?: "driver" | "passenger" | "both";
        driver_license_id?: string;
      }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 1.2 Login User
    login: build.mutation<
      { access_token: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // 1.3 Get Current Profile
    getMe: build.query<any, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["User"],
    }),

    // 1.4 Update Profile
    updateProfile: build.mutation<
      any,
      Partial<{ full_name: string; bio: string; password: string }>
    >({
      query: (body) => ({
        url: "/auth/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // 1.5 Delete Account
    deleteAccount: build.mutation<{ success: boolean }, void>({
      query: () => ({ url: "/auth/profile", method: "DELETE" }),
      invalidatesTags: ["User", "Auth"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = authApi;
