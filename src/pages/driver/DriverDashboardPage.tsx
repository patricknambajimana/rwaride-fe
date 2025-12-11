import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { DriverNavbar } from '../../components/dashboard/driver/DriverNavbar';
import { DriverSidebar } from '../../components/dashboard/driver/DriverSidebar';
import { TripsTab } from '../../components/dashboard/driver/TripsTab';
import { ProfileTab } from '../../components/dashboard/driver/ProfileTab';
import { ChatDialog } from '@/features/ChartDialog';
import { TrendingUp, Briefcase, AlertCircle, Star } from 'lucide-react';

interface DriverDashboardPageProps {
  user?: any;
  onLogout?: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardPageProps) {
  const { user: authUser, logout } = useAuth();
  const currentUser = user || authUser;
  const handleLogout = onLogout || logout;

  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState<{ tripId: string; recipientId: string; recipientName: string } | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverProfile, setDriverProfile] = useState({
    name: currentUser?.name || 'Driver',
    email: currentUser?.email || 'driver@example.com',
    phone: currentUser?.phone || '',
  });
  const [carInfo, setCarInfo] = useState({
    make: currentUser?.car?.make || 'Toyota',
    model: currentUser?.car?.model || 'RAV4',
    year: currentUser?.car?.year || '2020',
    color: currentUser?.car?.color || 'Silver',
    plate: currentUser?.car?.plate || 'RAC 123 C',
    seats: currentUser?.car?.seats || 4,
  });

  useEffect(() => {
    // Simulate loading trips
    const mockTrips = [
      {
        id: '1',
        from_location: 'Kigali',
        to_location: 'Huye',
        departure_date: '2025-12-12',
        departure_time: '08:00',
        status: 'active' as const,
        available_seats: 2,
        bookings: [
          {
            id: '1',
            passenger_name: 'John Doe',
            passenger_email: 'john@example.com',
            passenger_phone: '+250788000111',
            status: 'confirmed',
          },
          {
            id: '2',
            passenger_name: 'Alice Umuhoza',
            passenger_email: 'alice@example.com',
            passenger_phone: '+250788000222',
            status: 'pending',
          },
        ],
      },
    ];
    setMyTrips(mockTrips);
  }, []);

  const handleCreateTrip = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newTrip = {
        id: Math.random().toString(),
        ...data,
        status: 'active' as const,
        bookings: [],
      };

      setMyTrips([...myTrips, newTrip]);
      alert('Trip created successfully!');
    } finally {
      setLoading(false);
    }
  };

  const openChat = (payload: { tripId: string; recipientId: string; recipientName: string }) => {
    setChatTarget(payload);
    setChatOpen(true);
  };

  const updateBookingStatus = (tripId: string, bookingId: string, status: 'confirmed' | 'cancelled') => {
    setMyTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              bookings: (trip.bookings || []).map((booking: any) =>
                booking.id === bookingId ? { ...booking, status } : booking
              ),
            }
          : trip
      )
    );
  };

  const handleProfileUpdate = (data: { name?: string; email?: string; phone?: string }) => {
    setDriverProfile((prev) => ({ ...prev, ...data }));
  };

  const handleCarUpdate = (data: { make?: string; model?: string; year?: string; color?: string; plate?: string; seats?: number }) => {
    setCarInfo((prev) => ({ ...prev, ...data }));
  };

  const calculateAverageRating = () => {
    const ratings = myTrips.flatMap((trip) =>
      (trip.bookings || []).map((b: any) => b.rating).filter((r: any) => r)
    );
    if (ratings.length === 0) return 'No ratings yet';
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return avg.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DriverNavbar userName={driverProfile.name || 'Driver'} onLogout={handleLogout} />

      <div className="flex flex-1">
        <DriverSidebar activeItem={activeTab} onSelect={setActiveTab} />

        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="container mx-auto px-4 md:px-8 py-8">
            {/* Dashboard Home */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div>
                  <h2 className="text-3xl font-bold">Welcome back, {driverProfile.name}!</h2>
                  <p className="text-gray-600">Here's your activity overview</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Trips</p>
                          <p className="text-2xl font-bold">247</p>
                          <p className="text-xs text-green-600 mt-1">↑ +12% this month</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Bookings</p>
                          <p className="text-2xl font-bold">8</p>
                          <p className="text-xs text-green-600 mt-1">✓ All awaiting approval</p>
                        </div>
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Monthly Earnings</p>
                          <p className="text-2xl font-bold">₦45,200</p>
                          <p className="text-xs text-green-600 mt-1">↑ +24% last month</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <p className="text-2xl font-bold">4.8</p>
                          <p className="text-xs text-yellow-600 mt-1">★★★★★ (127 reviews)</p>
                        </div>
                        <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Earnings Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">Chart would display here</p>
                  </CardContent>
                </Card>

                {/* Upcoming Trips & Recent Bookings */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TripsTab
                      myTrips={myTrips}
                      onCreateTrip={handleCreateTrip}
                      loading={loading}
                      onOpenChat={openChat}
                      onUpdateBookingStatus={updateBookingStatus}
                    />
                  </div>
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Recent Bookings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {myTrips.slice(0, 3).map((trip) =>
                          (trip.bookings || []).slice(0, 2).map((booking: any) => (
                            <div key={booking.id} className="flex gap-2 pb-2 border-b last:border-b-0">
                              <div className="flex-1">
                                <p className="text-xs font-semibold">{booking.passenger_name}</p>
                                <p className="text-xs text-gray-600">{trip.from_location} → {trip.to_location}</p>
                                <p className={`text-xs mt-1 ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                  {booking.status}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* My Trips */}
            {activeTab === 'my-trips' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">My Trips</h2>
                <TripsTab
                  myTrips={myTrips}
                  onCreateTrip={handleCreateTrip}
                  loading={loading}
                  onOpenChat={openChat}
                  onUpdateBookingStatus={updateBookingStatus}
                />
              </div>
            )}

            {/* Bookings */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Bookings</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {myTrips.flatMap((trip) =>
                        (trip.bookings || []).map((booking: any) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 border rounded">
                            <div>
                              <p className="font-semibold">{booking.passenger_name}</p>
                              <p className="text-sm text-gray-600">{booking.passenger_email}</p>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {booking.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Messages</h2>
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    <p>No messages yet</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Earnings */}
            {activeTab === 'earnings' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Earnings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold">₦45,200</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Earned</p>
                        <p className="text-2xl font-bold">₦125,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold">₦5,200</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Ratings */}
            {activeTab === 'ratings' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Ratings & Reviews</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-bold">4.8</div>
                      <div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">Based on 127 reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Settings</h2>
                <ProfileTab
                  user={driverProfile}
                  car={carInfo}
                  totalTrips={myTrips.length}
                  averageRating={calculateAverageRating()}
                  onUpdateProfile={handleProfileUpdate}
                  onUpdateCar={handleCarUpdate}
                />
              </div>
            )}

            {/* Help */}
            {activeTab === 'help' && (
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

      {chatOpen && chatTarget && (
        <ChatDialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          tripId={chatTarget.tripId}
          recipientId={chatTarget.recipientId}
          recipientName={chatTarget.recipientName}
        />
      )}
    </div>
  );
}