import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DriverLayout,
  DriverStatsOverview,
  BookingRequestCard,
  ActiveRideCard,
  CreateRideForm,
  DriverProfileCard,
  type DriverStats,
  type BookingRequest,
  type ActiveRide,
  type CreateRideData,
  type DriverProfile,
} from "../driver";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

// Mock data
const MOCK_STATS: DriverStats = {
  totalRides: 156,
  totalEarnings: 4850,
  averageRating: 4.9,
  acceptanceRate: 95,
  cancellationRate: 2,
  thisMonthEarnings: 620,
  thisMonthRides: 28,
  completionRate: 98,
};

const MOCK_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: "req-1",
    passengerId: "passenger-1",
    passengerName: "Sarah Johnson",
    passengerRating: 4.7,
    fromLocation: "Kigali City Center",
    toLocation: "Kigali International Airport",
    departureDate: "2025-12-15",
    departureTime: "14:00",
    seatsRequested: 2,
    estimatedDistance: "25 km",
    estimatedDuration: "45 min",
    offerPrice: 30,
    status: "pending",
    requestTime: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "req-2",
    passengerId: "passenger-2",
    passengerName: "Michael Brown",
    passengerRating: 4.5,
    fromLocation: "University of Rwanda",
    toLocation: "Kigali Downtown",
    departureDate: "2025-12-15",
    departureTime: "16:30",
    seatsRequested: 1,
    estimatedDistance: "12 km",
    estimatedDuration: "25 min",
    offerPrice: 12,
    status: "pending",
    requestTime: new Date(Date.now() - 15 * 60000).toISOString(),
  },
];

const MOCK_ACTIVE_RIDES: ActiveRide[] = [
  {
    id: "ride-1",
    passengerId: "passenger-3",
    passengerName: "Emily Davis",
    passengerRating: 4.8,
    seatsBooked: 1,
    seatsAvailable: 3,
    fromLocation: "Kigali City Center",
    toLocation: "Kigali International Airport",
    departureDate: "2025-12-15",
    departureTime: "14:00",
    estimatedArrivalTime: "14:45",
    currentLocation: "Downtown - Main Road",
    status: "in-progress",
    earnings: 15,
    notes: "Passenger has luggage",
  },
];

const MOCK_PROFILE: DriverProfile = {
  id: "driver-1",
  name: "James Wilson",
  email: "james@example.com",
  phone: "+250 788 123 456",
  city: "Kigali",
  bio: "Professional driver, 10 years experience. Safe and friendly!",
  licenseNumber: "DL-12345678",
  licenseExpiry: "2026-12-31",
  insuranceProvider: "SafeRide Insurance",
  insuranceExpiry: "2026-12-31",
  vehicleMake: "Toyota",
  vehicleModel: "Prius",
  licensePlate: "RAJ 123A",
  vehicleColor: "White",
  seatingCapacity: 4,
  totalRides: 156,
  averageRating: 4.9,
  joinDate: "2022-03-15",
  verificationStatus: "verified",
  documentsStatus: "approved",
  bankAccountVerified: true,
};

interface DriverDashboardProps {
  userName?: string;
}

export function DriverDashboard({ userName }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DriverStats>(MOCK_STATS);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(
    MOCK_BOOKING_REQUESTS
  );
  const [activeRides, setActiveRides] = useState<ActiveRide[]>(MOCK_ACTIVE_RIDES);
  const [profile, setProfile] = useState<DriverProfile>(MOCK_PROFILE);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdRides, setCreatedRides] = useState<CreateRideData[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle booking request
  const handleAcceptBooking = (requestId: string) => {
    const request = bookingRequests.find((r) => r.id === requestId);
    if (request) {
      setBookingRequests(
        bookingRequests.map((r) =>
          r.id === requestId ? { ...r, status: "accepted" } : r
        )
      );
      alert(
        `Booking accepted! You will earn $${request.offerPrice} for this ride.`
      );
    }
  };

  const handleRejectBooking = (requestId: string) => {
    setBookingRequests(
      bookingRequests.map((r) =>
        r.id === requestId ? { ...r, status: "rejected" } : r
      )
    );
  };

  const handleOpenChatBooking = (requestId: string) => {
    alert("Chat feature coming soon!");
  };

  // Handle active rides
  const handleStartRide = (rideId: string) => {
    setActiveRides(
      activeRides.map((r) =>
        r.id === rideId ? { ...r, status: "in-progress" } : r
      )
    );
    alert("Ride started! Safe travels!");
  };

  const handleCompleteRide = (rideId: string) => {
    const ride = activeRides.find((r) => r.id === rideId);
    if (ride) {
      setActiveRides(
        activeRides.map((r) =>
          r.id === rideId ? { ...r, status: "completed" } : r
        )
      );
      setStats((prev) => ({
        ...prev,
        totalRides: prev.totalRides + 1,
        totalEarnings: prev.totalEarnings + ride.earnings,
        thisMonthRides: prev.thisMonthRides + 1,
        thisMonthEarnings: prev.thisMonthEarnings + ride.earnings,
      }));
      alert(
        `Great! Ride completed. You earned $${ride.earnings}. Total earnings: $${stats.totalEarnings + ride.earnings}`
      );
    }
  };

  const handleCancelRide = (rideId: string) => {
    if (
      confirm(
        "Are you sure? Cancelling rides may affect your rating. This action cannot be undone."
      )
    ) {
      setActiveRides(activeRides.filter((r) => r.id !== rideId));
      setStats((prev) => ({
        ...prev,
        cancellationRate: Math.min(prev.cancellationRate + 1, 100),
      }));
      alert("Ride cancelled. Please maintain a good cancellation rate.");
    }
  };

  const handleContactPassenger = (rideId: string) => {
    alert("Contact passenger feature coming soon!");
  };

  // Handle create ride
  const handleCreateRide = async (data: CreateRideData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCreatedRides([...createdRides, data]);
      setShowCreateForm(false);
      alert(
        `Ride created successfully!\nRoute: ${data.fromLocation} → ${data.toLocation}\nSeats available: ${data.availableSeats}\nPrice per seat: $${data.pricePerSeat}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const handleUpdateProfile = (updatedData: Partial<DriverProfile>) => {
    setProfile({ ...profile, ...updatedData });
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("Logged out successfully");
  };

  const pendingRequests = bookingRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const activeRidesCount = activeRides.filter(
    (r) => r.status !== "completed"
  ).length;

  return (
    <DriverLayout userName={profile.name} onLogout={handleLogout}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings" className="relative">
            Bookings
            {pendingRequests > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingRequests}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rides">Active Rides</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <DriverStatsOverview stats={stats} />

          {/* Recent Activities */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Ride
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("bookings")}
                  disabled={pendingRequests === 0}
                >
                  {pendingRequests > 0
                    ? `${pendingRequests} New Booking${
                        pendingRequests > 1 ? "s" : ""
                      }`
                    : "No Pending Bookings"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("rides")}
                  disabled={activeRidesCount === 0}
                >
                  {activeRidesCount > 0
                    ? `${activeRidesCount} Active Ride${
                        activeRidesCount > 1 ? "s" : ""
                      }`
                    : "No Active Rides"}
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("profile")}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          {showCreateForm ? (
            <>
              <CreateRideForm
                onSubmit={handleCreateRide}
                loading={loading}
                onCancel={() => setShowCreateForm(false)}
              />
            </>
          ) : (
            <>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Ride
              </Button>

              {bookingRequests.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <p className="text-lg font-medium">No booking requests</p>
                    <p className="text-sm mt-1">
                      New booking requests will appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {bookingRequests.map((request) => (
                    <BookingRequestCard
                      key={request.id}
                      request={request}
                      onAccept={() => handleAcceptBooking(request.id)}
                      onReject={() => handleRejectBooking(request.id)}
                      onContact={() => handleOpenChatBooking(request.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Active Rides Tab */}
        <TabsContent value="rides" className="space-y-6">
          {activeRides.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <p className="text-lg font-medium">No active rides</p>
                <p className="text-sm mt-1">
                  Create a ride or accept booking requests to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeRides.map((ride) => (
                <ActiveRideCard
                  key={ride.id}
                  ride={ride}
                  onStartRide={() => handleStartRide(ride.id)}
                  onCompleteRide={() => handleCompleteRide(ride.id)}
                  onCancel={() => handleCancelRide(ride.id)}
                  onContact={() => handleContactPassenger(ride.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <DriverProfileCard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onUploadDocuments={() =>
              alert("Document upload feature coming soon!")
            }
            onChangePassword={() =>
              alert("Change password feature coming soon!")
            }
          />
        </TabsContent>
      </Tabs>
    </DriverLayout>
  );
}
