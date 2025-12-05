import { useState } from "react";
import { PassengerDashboard } from "../../components/dashboard/passenger/PassengerDashboard";

// import { PassengerHeader } from "@/components/dashboard/passenger/PassengerHeader";
// import { SearchForm } from "@/components/dashboard/passenger/SearchForm";
// import { TripList } from "@/components/dashboard/passenger/TripList";
// import { BookingsList } from "@/components/dashboard/passenger/BookingsList";
// import { ProfileSection } from "@/components/dashboard/passenger/ProfileSection";
// import { ChatDialog } from "@/components/dashboard/passenger/ChatDialog";

const PassengerPage = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
  });

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleSearchTrips = async (from: string, to: string, date: string) => {
    console.log("Searching trips:", { from, to, date });
    return [];
  };

  const handleBookTrip = (tripId: string) => {
    console.log("Booking trip:", tripId);
  };

  const handleRateTrip = (bookingId: string, rating: number) => {
    console.log("Rating trip:", { bookingId, rating });
  };

  const handleFetchBookings = async () => {
    console.log("Fetching bookings");
    return [];
  };

  return (
    <PassengerDashboard
      user={user}
      onLogout={handleLogout}
      onSearchTrips={handleSearchTrips}
      onBookTrip={handleBookTrip}
      onRateTrip={handleRateTrip}
      fetchBookings={handleFetchBookings}
    />
  );
};

export default PassengerPage;
