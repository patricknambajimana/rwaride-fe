import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PassengerDashboard } from "../../components/dashboard/passenger/PassengerDashboard";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "lucide-react";
import {
  useGetDriverTripsQuery,
  useSearchTripsQuery,
  useBookRideMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRateBookingMutation,
} from "../../services/store/hooks";

const PassengerPage = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{
    origin: string;
    destination: string;
    date?: string;
  } | null>(null);

  // Redux Query Hooks
  const { data: trips = [], isLoading, error: tripsError } = useGetDriverTripsQuery();
  const { data: searchResults = [] } = useSearchTripsQuery(
    searchParams || { origin: "", destination: "" },
    { skip: !searchParams }
  );
  const { data: bookings = [], refetch: refetchBookings } = useGetUserBookingsQuery();
  const [bookRide, { isLoading: isBooking }] = useBookRideMutation();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rateBooking, { isLoading: isRating }] = useRateBookingMutation();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // Search trips using Redux Query
  const handleSearchTrips = async (from: string, to: string, date: string) => {
    try {
      setError(null);
      setSearchParams({ origin: from, destination: to, date });
      return searchResults;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to search trips";
      setError(errorMsg);
      console.error("Search error:", err);
      return [];
    }
  };

  // Book a trip using Redux Query
  const handleBookTrip = async (tripId: string, seats: number = 1) => {
    try {
      setError(null);
      const result = await bookRide({ rideId: tripId, seats }).unwrap();
      setSuccess(`Booking confirmed! Booking ID: ${result.id}`);
      console.log("Booking created:", result);
      refetchBookings();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to book trip";
      setError(errorMsg);
      console.error("Booking error:", err);
    }
  };

  // Rate a trip using Redux Query
  const handleRateTrip = async (bookingId: string, rating: number) => {
    try {
      setError(null);
      await rateBooking({ bookingId, rating }).unwrap();
      setSuccess(`Thank you! You rated the trip ${rating} stars`);
      console.log("Rating submitted:", { bookingId, rating });
      refetchBookings();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to rate trip";
      setError(errorMsg);
      console.error("Rating error:", err);
    }
  };

  // Fetch user's bookings using Redux Query
  const handleFetchBookings = async () => {
    try {
      setError(null);
      return bookings;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch bookings";
      setError(errorMsg);
      console.error("Fetch bookings error:", err);
      return [];
    }
  };

  // Cancel booking using Redux Query
  const handleCancelBooking = async (bookingId: string) => {
    try {
      setError(null);
      await cancelBooking(bookingId).unwrap();
      setSuccess("Booking cancelled successfully");
      console.log("Booking cancelled:", bookingId);
      refetchBookings();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to cancel booking";
      setError(errorMsg);
      console.error("Cancel error:", err);
    }
  };

  return (
    <div>
     
      <PassengerDashboard
        user={{
          name: authUser?.name || "Passenger",
          email: authUser?.email || "passenger@example.com",
          phone: (authUser as any)?.phone || "+250 XXX XXX XXX",
        }}

        onLogout={handleLogout}
        onSearchTrips={handleSearchTrips}
        onBookTrip={handleBookTrip}
        onRateTrip={handleRateTrip}
        fetchBookings={handleFetchBookings}
        onCancelBooking={handleCancelBooking}
        initialTrips={searchParams ? searchResults : trips}
      />
    </div>
  );
};

export default PassengerPage;
