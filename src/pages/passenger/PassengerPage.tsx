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

  const dummyTrips = [
    {
      id: "t1",
      driver_name: "Alice Umuhoza",
      driver_rating: 4.8,
      from_location: "Kigali",
      to_location: "Huye",
      departure_date: "2025-12-15",
      departure_time: "08:30",
      available_seats: 3,
      driver_id: "d1",
    },
    {
      id: "t2",
      driver_name: "Eric Mugisha",
      driver_rating: 4.6,
      from_location: "Kigali",
      to_location: "Musanze",
      departure_date: "2025-12-15",
      departure_time: "09:15",
      available_seats: 2,
      driver_id: "d2",
    },
    {
      id: "t3",
      driver_name: "Claudine Ishimwe",
      driver_rating: 4.9,
      from_location: "Huye",
      to_location: "Kigali",
      departure_date: "2025-12-16",
      departure_time: "07:45",
      available_seats: 4,
      driver_id: "d3",
    },
    {
      id: "t4",
      driver_name: "Jean Bosco",
      driver_rating: 4.4,
      from_location: "Musanze",
      to_location: "Gisenyi",
      departure_date: "2025-12-16",
      departure_time: "10:00",
      available_seats: 1,
      driver_id: "d4",
    },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleSearchTrips = async (from: string, to: string, date: string) => {
    const normalizedFrom = from.trim().toLowerCase();
    const normalizedTo = to.trim().toLowerCase();
    const normalizedDate = date.trim();

    const filtered = dummyTrips.filter((trip) => {
      const matchesFrom = normalizedFrom
        ? trip.from_location?.toLowerCase().includes(normalizedFrom)
        : true;
      const matchesTo = normalizedTo
        ? trip.to_location?.toLowerCase().includes(normalizedTo)
        : true;
      const matchesDate = normalizedDate ? trip.departure_date === normalizedDate : true;
      return matchesFrom && matchesTo && matchesDate;
    });

    return filtered;
  };

  const handleBookTrip = (tripId: string) => {
    console.log("Booking trip:", tripId);
  };

  const handleRateTrip = (bookingId: string, rating: number) => {
    console.log("Rating trip:", { bookingId, rating });
  };

  const handleFetchBookings = async () => {
    return [
      {
        id: "b1",
        trip_id: "t1",
        driver_name: "Alice Umuhoza",
        from_location: "Kigali",
        to_location: "Huye",
        departure_date: "2025-12-15",
        status: "confirmed",
      },
    ];
  };

  return (
    <PassengerDashboard
      user={user}
      onLogout={handleLogout}
      onSearchTrips={handleSearchTrips}
      onBookTrip={handleBookTrip}
      onRateTrip={handleRateTrip}
      fetchBookings={handleFetchBookings}
      initialTrips={dummyTrips}
    />
  );
};

export default PassengerPage;
