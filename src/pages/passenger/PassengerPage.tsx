import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PassengerDashboard } from "../../components/dashboard/passenger/PassengerDashboard";
import { useAuth } from "../../context/AuthContext";
import {
   useLazySearchRidesQuery,
  useGetAvailableRidesQuery,
  useBookRideMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useRateBookingMutation,
} from "../../services/store/hooks";

const PassengerPage = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();
  const [, setError] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);

  // Redux Query Hooks - Simplified
  const { data: availableRides = [], isLoading } = useGetAvailableRidesQuery({ status: "active" });
  const [searchRides, { data: searchResults = [], isLoading: isSearching }] = useLazySearchRidesQuery();
  const { data: bookings = [], refetch: refetchBookings } = useGetUserBookingsQuery();
  const [bookRide, { isLoading: isBooking }] = useBookRideMutation();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [rateBooking, { isLoading: isRating }] = useRateBookingMutation();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // Simplified search - let backend handle route matching
  const handleSearchTrips = async (from: string, to: string, date: string) => {
    try {
      setSearchActive(true);
      setError(null);
      
      // Call backend search API with parameters
      await searchRides({ 
        origin: from, 
        destination: to, 
        date: date || undefined 
      });
      
      return []; // Return value to match expected type
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
      await rateBooking({ bookingId, rating }).unwrap();
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
      await cancelBooking(bookingId).unwrap();
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
        initialTrips={searchActive ? searchResults : availableRides}
      />
    </div>
  );
};

export default PassengerPage;
