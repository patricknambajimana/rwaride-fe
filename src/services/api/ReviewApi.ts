import { baseApi } from "./baseApi";

export interface ReviewPayload {
  ride_id: number;
  reviewee_id: number;
  rating: number; // 1-5
  comment: string;
}

export interface ReviewResponse {
  id: string;
  ride_id: number;
  reviewee_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit Review - POST /reviews/submit
    submitReview: builder.mutation<ReviewResponse, ReviewPayload>({
      query: (payload) => ({
        url: "/reviews/submit",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, payload) => [
        { type: "Review", id: payload.ride_id },
        { type: "Ride", id: payload.ride_id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitReviewMutation } = reviewApi;
