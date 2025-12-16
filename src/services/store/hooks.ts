import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  useSearchTripsQuery,
  useGetDriverTripsQuery,
  useBookRideMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRateBookingMutation,
} from "../api/passengerApi";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export passenger booking hooks for easy access
export {
  useSearchTripsQuery,
  useGetDriverTripsQuery,
  useBookRideMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRateBookingMutation,
};
