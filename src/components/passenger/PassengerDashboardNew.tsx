import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  PassengerLayout, 
  AdvancedSearchRides, 
  RideCard, 
  BookingsList, 
  PassengerProfileCard,
  ChatWindow,
  type SearchFilters,
  type RideDetails,
  type Booking,
  type PassengerProfile,
  type ChatMessage,
} from "../passenger";
import { Card, CardContent } from "../ui/card";

// Mock data - replace with actual API calls
const MOCK_RIDES: RideDetails[] = [
  {
    id: "ride-1",
    driverId: "driver-1",
    driverName: "John Smith",
    driverImage: undefined,
    driverRating: 4.8,
    vehicleMake: "Toyota",
    vehicleModel: "Prius",
    licensePlate: "RAJ 123A",
    fromLocation: "Kigali City Center",
    toLocation: "Kigali International Airport",
    departureDate: "2025-12-15",
    departureTime: "14:00",
    arrivalTime: "14:45",
    availableSeats: 3,
    pricePerSeat: 15,
    totalPrice: 45,
    status: "available",
    amenities: ["WiFi", "Phone Charger", "Water"],
    notes: "Non-smoker, quiet music",
  },
  {
    id: "ride-2",
    driverId: "driver-2",
    driverName: "Mary Jane",
    driverImage: undefined,
    driverRating: 4.5,
    vehicleMake: "Honda",
    vehicleModel: "Civic",
    licensePlate: "RAJ 456B",
    fromLocation: "Kigali City Center",
    toLocation: "University of Rwanda",
    departureDate: "2025-12-15",
    departureTime: "08:30",
    arrivalTime: "09:15",
    availableSeats: 2,
    pricePerSeat: 10,
    totalPrice: 20,
    status: "available",
    amenities: ["AC", "Water"],
  },
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    bookingNumber: "BK-001",
    driverId: "driver-1",
    driverName: "John Smith",
    vehicleMake: "Toyota",
    vehicleModel: "Prius",
    licensePlate: "RAJ 123A",
    fromLocation: "Kigali City Center",
    toLocation: "Kigali International Airport",
    departureDate: "2025-12-10",
    departureTime: "14:00",
    seatsBooked: 2,
    pricePerSeat: 15,
    totalPrice: 30,
    status: "completed",
    bookingDate: "2025-12-08",
    rating: 5,
  },
];

const MOCK_PROFILE: PassengerProfile = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+250 788 123 456",
  city: "Kigali",
  bio: "Adventure seeker, always up for a good ride!",
  totalTrips: 12,
  averageRating: 4.8,
  joinDate: "2024-01-15",
  verificationStatus: "verified",
};

interface PassengerDashboardProps {
  userName?: string;
}

export function PassengerDashboard({ userName }: PassengerDashboardProps) {
  const [activeTab, setActiveTab] = useState("search");
  const [rides, setRides] = useState<RideDetails[]>(MOCK_RIDES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [profile, setProfile] = useState<PassengerProfile>(MOCK_PROFILE);
  const [searchResults, setSearchResults] = useState<RideDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedRideForChat, setSelectedRideForChat] =
    useState<RideDetails | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [expandedRideId, setExpandedRideId] = useState<string | null>(null);

  // Search handler
  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter mock rides based on search criteria
      const filtered = MOCK_RIDES.filter((ride) => {
        const matchFrom = ride.fromLocation
          .toLowerCase()
          .includes(filters.from.toLowerCase());
        const matchTo = ride.toLocation
          .toLowerCase()
          .includes(filters.to.toLowerCase());
        const matchDate = ride.departureDate === filters.date;
        const matchPrice =
          !filters.priceMax || ride.pricePerSeat <= filters.priceMax;
        const matchSeats =
          !filters.seatsMin || ride.availableSeats >= filters.seatsMin;
        const matchRating =
          !filters.ratingMin || ride.driverRating >= filters.ratingMin;

        return (
          matchFrom &&
          matchTo &&
          matchDate &&
          matchPrice &&
          matchSeats &&
          matchRating
        );
      });

      setSearchResults(filtered);
    } finally {
      setLoading(false);
    }
  };

  // Book ride handler
  const handleBookRide = (rideId: string) => {
    const ride = searchResults.find((r) => r.id === rideId);
    if (ride) {
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        bookingNumber: `BK-${String(bookings.length + 1).padStart(3, "0")}`,
        driverId: ride.driverId,
        driverName: ride.driverName,
        vehicleMake: ride.vehicleMake,
        vehicleModel: ride.vehicleModel,
        licensePlate: ride.licensePlate,
        fromLocation: ride.fromLocation,
        toLocation: ride.toLocation,
        departureDate: ride.departureDate,
        departureTime: ride.departureTime,
        seatsBooked: 1,
        pricePerSeat: ride.pricePerSeat,
        totalPrice: ride.pricePerSeat,
        status: "confirmed",
        bookingDate: new Date().toISOString().split("T")[0],
      };
      setBookings([...bookings, newBooking]);
      alert(`Booking confirmed! Booking #${newBooking.bookingNumber}`);
      setSearchResults(searchResults.filter((r) => r.id !== rideId));
    }
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );
    alert("Booking cancelled");
  };

  // Rate handler
  const handleRateTrip = (bookingId: string, rating: number) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, rating } : b))
    );
    alert(`Thank you for rating! You gave ${rating} stars`);
  };

  // Chat handlers
  const handleOpenChat = (ride: RideDetails) => {
    setSelectedRideForChat(ride);
    setChatOpen(true);
    setMessages([
      {
        id: "msg-1",
        senderId: ride.driverId,
        senderName: ride.driverName,
        message: "Hi! I'm available for this ride. Let me know if you need anything.",
        timestamp: new Date(Date.now() - 10000).toISOString(),
        isOwn: false,
      },
    ]);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      senderName: profile.name,
      message: text,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  // Contact driver from booking
  const handleContactDriver = (bookingId: string, driverId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      const mockRide: RideDetails = {
        id: `ride-${driverId}`,
        driverId,
        driverName: booking.driverName,
        driverRating: 4.8,
        vehicleMake: booking.vehicleMake,
        vehicleModel: booking.vehicleModel,
        licensePlate: booking.licensePlate,
        fromLocation: booking.fromLocation,
        toLocation: booking.toLocation,
        departureDate: booking.departureDate,
        departureTime: booking.departureTime,
        arrivalTime: "",
        availableSeats: 0,
        pricePerSeat: booking.pricePerSeat,
        totalPrice: booking.totalPrice,
        status: "booked",
      };
      handleOpenChat(mockRide);
    }
  };

  // Update profile handler
  const handleUpdateProfile = (updatedData: Partial<PassengerProfile>) => {
    setProfile({ ...profile, ...updatedData });
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("Logged out successfully");
    // Navigate to login
  };

  return (
    <PassengerLayout
      userName={profile.name}
      onLogout={handleLogout}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="search">Find Rides</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          <AdvancedSearchRides
            onSearch={handleSearch}
            loading={loading}
            showAdvanced={false}
          />

          {searchResults.length === 0 && !loading ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <p className="text-lg font-medium">
                  Search for rides to get started
                </p>
                <p className="text-sm mt-1">
                  Enter your route and date to find available rides
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {searchResults.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onBook={() => handleBookRide(ride.id)}
                  onChat={() => handleOpenChat(ride)}
                  isExpanded={expandedRideId === ride.id}
                  onViewDetails={() =>
                    setExpandedRideId(
                      expandedRideId === ride.id ? null : ride.id
                    )
                  }
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <BookingsList
            bookings={bookings}
            onCancel={handleCancelBooking}
            onRate={handleRateTrip}
            onContact={handleContactDriver}
          />
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <PassengerProfileCard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onChangePassword={() => alert("Change password feature coming soon!")}
          />
        </TabsContent>
      </Tabs>

      {/* Chat Window */}
      {chatOpen && selectedRideForChat && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-end md:justify-center p-4">
          <div className="w-full md:w-96 md:h-[600px]">
            <ChatWindow
              chatId={selectedRideForChat.id}
              recipientName={selectedRideForChat.driverName}
              recipientId={selectedRideForChat.driverId}
              messages={messages}
              onSendMessage={handleSendMessage}
              onClose={() => setChatOpen(false)}
            />
          </div>
        </div>
      )}
    </PassengerLayout>
  );
}
