import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ChatDialog } from "@/features/ChartDialog";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { SearchRideForm } from "./SearchRideForm";
import { DashboardStats } from "./DashboardStats";
import { TripList } from "./TripList";
import { UpcomingBookingsList } from "./UpcomingBookingsList";
import { RecentMessages } from "./RecentMessages";
import { PaymentSummary } from "./PaymentSummary";
import { BookingsList } from "./BookingsList";
import { ProfileSection } from "./ProfileSection";
import { SettingsPage } from "./SettingsPage";
import { ProfileSettings } from "./ProfileSettings";
import { BarChart3, MapPin, AlertCircle } from "lucide-react";

interface PassengerDashboardProps {
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  onLogout: () => void;
  onSearchTrips: (from: string, to: string, date: string) => Promise<any[]>;
  onBookTrip: (tripId: string, seats?: number) => Promise<void> | void;
  onRateTrip: (bookingId: string, rating: number) => Promise<void> | void;
  onCancelBooking?: (bookingId: string) => Promise<void> | void;
  fetchBookings: () => Promise<any[]>;
  initialTrips?: any[];
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onChangePasswordClick?: () => void;
  onDeleteAccountClick?: () => void;
}

export function PassengerDashboard({
  user,
  onLogout,
  onSearchTrips,
  onBookTrip,
  onRateTrip,
  onCancelBooking,
  fetchBookings,
  initialTrips = [],
  onProfileClick,
  onSettingsClick,
  onChangePasswordClick,
  onDeleteAccountClick,
}: PassengerDashboardProps) {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    loadBookings();
    setAvailableTrips(initialTrips);
  }, []);

  const loadBookings = async () => {
    const bookings = await fetchBookings();
    setMyBookings(bookings || []);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const trips = await onSearchTrips(searchFrom, searchTo, searchDate);
    setAvailableTrips(trips || []);
    setLoading(false);
  };

  const openChat = (trip: any) => {
    setSelectedTrip(trip);
    setChatOpen(true);
  };

  const handleMessageBooking = (bookingId: string) => {
    const booking = myBookings.find((b) => b.id === bookingId);
    if (booking) {
      openChat(booking);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancel booking:", bookingId);
    // TODO: Implement cancel logic
  };

  const upcomingBookings = myBookings
    .filter((b) => b.status !== "completed" && b.status !== "cancelled")
    .slice(0, 3);

  // Derive stats from backend data (via myBookings)
  const confirmedOrCompleted = myBookings.filter(
    (b) => b.status === "confirmed" || b.status === "completed"
  );
  const totalEarnings = confirmedOrCompleted.reduce(
    (sum, b) => sum + (Number(b.total_price) || 0),
    0
  );
  const activeTrips = myBookings.filter(
    (b) => b.status !== "completed" && b.status !== "cancelled"
  ).length;
  const ratings = myBookings
    .map((b: any) => (typeof b.rating === "number" ? b.rating : null))
    .filter((r: number | null) => r !== null) as number[];
  const avgRating = ratings.length
    ? (ratings.reduce((a, c) => a + c, 0) / ratings.length).toFixed(1)
    : "N/A";

  const stats = [
    { label: "Trips Booked", value: myBookings.length, icon: <MapPin className="w-5 h-5 text-green-600" /> },
    { label: "Payment", value: `${totalEarnings.toLocaleString()} RWF`, icon: <BarChart3 className="w-5 h-5 text-blue-600" /> },
    { label: "Active Trips", value: String(activeTrips), icon: <AlertCircle className="w-5 h-5 text-orange-600" /> },
    { label: "Avg Rating", value: String(avgRating), icon: <BarChart3 className="w-5 h-5 text-yellow-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        userName={user.name} 
        onLogout={onLogout}
        onProfileClick={onProfileClick}
        onSettingsClick={onSettingsClick}
        onChangePasswordClick={onChangePasswordClick}
        onDeleteAccountClick={onDeleteAccountClick}
        onNavigateToSettings={setActiveTab}
      />

      <div className="flex flex-1">
        <Sidebar 
          activeItem={activeTab} 
          onSelect={setActiveTab}
          onLogout={onLogout}
          onDeleteAccount={onDeleteAccountClick}
        />

        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="container mx-auto px-4 md:px-8 py-8">
            {/* Dashboard Home */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div>
                  <h2 className="text-3xl font-bold">Welcome back, {user.name}!</h2>
                  <p className="text-gray-600">You have {upcomingBookings.length} upcoming booking</p>
                </div>

                {/* Stats */}
                <DashboardStats stats={stats} />

                {/* Find Your Next Ride Section */}
                <Card className="bg-linear-to-r from-green-600 to-blue-700 text-white border-0">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Find Your Next Ride</h3>
                    <SearchRideForm
                      from={searchFrom}
                      to={searchTo}
                      date={searchDate}
                      setFrom={setSearchFrom}
                      setTo={setSearchTo}
                      setDate={setSearchDate}
                      onSubmit={handleSearch}
                      loading={loading}
                    />
                  </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Upcoming Bookings */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
                      {upcomingBookings.length > 0 && (
                        <a href="#" className="text-xs text-blue-600 hover:underline">
                          View All
                        </a>
                      )}
                    </div>
                    <UpcomingBookingsList
                      bookings={upcomingBookings}
                      onMessage={handleMessageBooking}
                      onCancel={handleCancelBooking}
                    />
{/* Available Trips */}
                {availableTrips.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Trips</h3>
                    <TripList trips={availableTrips} onBookTrip={onBookTrip} openChat={openChat} />
                  </div>
                )}  
                  </div>

                  {/* Right Sidebar: Messages & Payment */}
                  <div className="space-y-4">
                    {/* Render messages panel only when backend data is available */}
                    {false ? (
                      <RecentMessages messages={[]} />
                    ) : null}
                    <PaymentSummary thisMonth="42,500 RWF" pending="5,000 RWF" />
                  </div>
                </div>

                
              </div>
            )}

            {/* Find Rides */}
            {activeTab === "find-rides" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Find Your Ride</h2>

                <Card className="bg-linear-to-r from-green-600 to-blue-600 text-white border-0">
                  <CardContent className="p-6 space-y-4">
                    <SearchRideForm
                      from={searchFrom}
                      to={searchTo}
                      date={searchDate}
                      setFrom={setSearchFrom}
                      setTo={setSearchTo}
                      setDate={setSearchDate}
                      onSubmit={handleSearch}
                      loading={loading}
                    />
                  </CardContent>
                </Card>

                {availableTrips.length === 0 && !loading ? (
                  <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                      <p>No trips found. Try adjusting your search.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <TripList trips={availableTrips} onBookTrip={onBookTrip} openChat={openChat} />
                )}
              </div>
            )}

            {/* My Bookings */}
            {activeTab === "my-bookings" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">My Bookings</h2>
                {myBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                      <p>No bookings yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <BookingsList 
                    bookings={myBookings} 
                    onRateTrip={onRateTrip}
                  />
                )}
              </div>
            )}

            {/* Messages */}
            {activeTab === "messages" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Messages</h2>
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <p>No messages yet.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Payments */}
            {activeTab === "payments" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Payments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PaymentSummary thisMonth="42,500 RWF" pending="5,000 RWF" />
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">No payment history yet</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Trip History */}
            {activeTab === "trip-history" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Trip History</h2>
                {myBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                      <p>No trip history yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <BookingsList 
                    bookings={myBookings} 
                    onRateTrip={onRateTrip}
                  />
                )}
              </div>
            )}

            {/* Settings */}
            {activeTab === "setting" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Settings</h2>
                <ProfileSettings 
                  authUser={user} 
                  onLogout={onLogout}
                />
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">My Profile</h2>
                <Card>
                  <CardHeader className="bg-linear-to-r from-green-500 to-blue-500 text-white">
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ProfileSection user={user} />
                  </CardContent>
                </Card>
              </div>
            )}


            {/* Help */}
            {activeTab === "help" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Help & Support</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">For support, contact us at support@rwaride.com</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>

      {chatOpen && selectedTrip && (
        <ChatDialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          tripId={selectedTrip.id}
          recipientId={selectedTrip.driver_id}
          recipientName={selectedTrip.driver_name}
        />
      )}
    </div>
  );
}
