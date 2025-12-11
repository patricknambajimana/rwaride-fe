import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent } from '../../components/ui/card';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DriverHeader } from '../../components/dashboard/driver/DriverHeader';
import { TripsTab } from '../../components/dashboard/driver/TripsTab';
import { ProfileTab } from '../../components/dashboard/driver/ProfileTab';

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
            status: 'confirmed',
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

  const calculateAverageRating = () => {
    const ratings = myTrips.flatMap((trip) =>
      (trip.bookings || []).map((b: any) => b.rating).filter((r: any) => r)
    );
    if (ratings.length === 0) return 'No ratings yet';
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return avg.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverHeader userName={currentUser?.name || 'Driver'} userId={currentUser?.id || ''} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="trips">
            <TripsTab myTrips={myTrips} onCreateTrip={handleCreateTrip} loading={loading} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab
              user={currentUser}
              totalTrips={myTrips.length}
              averageRating={calculateAverageRating()}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}