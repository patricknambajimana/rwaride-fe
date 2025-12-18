import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PassengerDashboard } from "../../components/dashboard/passenger/PassengerDashboard";
import { useAuth } from "../../context/AuthContext";
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
  const [, setError] = useState<string | null>(null);
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

  // Search trips using Redux Query with fuzzy matching
  const handleSearchTrips = async (from: string, to: string, date: string) => {
    try {
      setSearchParams({ origin: from, destination: to, date });
      
      // If we have search results, enhance them with match types
      if (searchResults.length > 0) {
        const enhancedResults = searchResults.map((trip: any) => {
          const tripOrigin = (trip.origin || trip.from_location || '').toLowerCase();
          const tripDest = (trip.destination || trip.to_location || '').toLowerCase();
          const searchFrom = from.toLowerCase();
          const searchTo = to.toLowerCase();
          
          let match_type: 'exact' | 'partial' | 'nearby' = 'nearby';
          
          // Check for exact match
          if (tripOrigin.includes(searchFrom) && tripDest.includes(searchTo)) {
            match_type = 'exact';
          }
          // Check for partial match (either origin or destination matches)
          else if (tripOrigin.includes(searchFrom) || tripDest.includes(searchTo) || 
                   tripDest.includes(searchFrom) || tripOrigin.includes(searchTo)) {
            match_type = 'partial';
          }
          
          return { ...trip, match_type };
        });
        
        // Sort by match quality: exact first, then partial, then nearby
        return enhancedResults.sort((a: any, b: any) => {
          const order = { exact: 0, partial: 1, nearby: 2 };
          return order[a.match_type as keyof typeof order] - order[b.match_type as keyof typeof order];
        });
      }
      
      // If no results from API, try to find matching trips from all available trips
      const allAvailableTrips = trips.filter((trip: any) => {
        const tripOrigin = (trip.origin || trip.from_location || '').toLowerCase();
        const tripDest = (trip.destination || trip.to_location || '').toLowerCase();
        const searchFrom = from.toLowerCase();
        const searchTo = to.toLowerCase();
        
        // Include trips that match or are related to the search
        return tripOrigin.includes(searchFrom) || tripDest.includes(searchTo) ||
               tripOrigin.includes(searchTo) || tripDest.includes(searchFrom);
      }).map((trip: any) => {
        const tripOrigin = (trip.origin || trip.from_location || '').toLowerCase();
        const tripDest = (trip.destination || trip.to_location || '').toLowerCase();
        const searchFrom = from.toLowerCase();
        const searchTo = to.toLowerCase();
        
        let match_type: 'exact' | 'partial' | 'nearby' = 'nearby';
        if (tripOrigin.includes(searchFrom) && tripDest.includes(searchTo)) {
          match_type = 'exact';
        } else if (tripOrigin.includes(searchFrom) || tripDest.includes(searchTo)) {
          match_type = 'partial';
        }
        
        return { ...trip, match_type };
      });
      
      return allAvailableTrips.sort((a: any, b: any) => {
        const order = { exact: 0, partial: 1, nearby: 2 };
        return order[a.match_type as keyof typeof order] - order[b.match_type as keyof typeof order];
      });
      
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
        initialTrips={searchParams ? searchResults : trips}
      />
    </div>
  );
};

export default PassengerPage;
