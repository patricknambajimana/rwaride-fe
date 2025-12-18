import { useState } from 'react';
import { DriverLayout } from './DriverLayout';
import { DriverStatsOverview } from './DriverStatsOverview';
import { TripTrendsChart } from './TripTrendsChart';
import { BookingsView } from './BookingsView';
import { ActiveRidesView } from './ActiveRidesView';
import { MessagesView } from './MessagesView';
import { EarningsView } from './EarningsView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { CreateTripView } from './CreateTripView';
import { CarRegistrationView } from './CarRegistrationView';
import { RecentMessages } from './RecentMessages';
import { QuickSummary } from './QuickSummary';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useGetDriverStatsQuery, useGetBookingRequestsQuery, useGetDriverProfileQuery } from '../../../services/api/driverApi';

interface DriverDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

export function DriverDashboard({ userName = 'Driver', onLogout }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch data from API
  const { data: stats } = useGetDriverStatsQuery();
  const { data: bookingRequests } = useGetBookingRequestsQuery();
  const { data: profileData } = useGetDriverProfileQuery();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-600">Welcome back, {userName}!</p>
            </div>
            <DriverStatsOverview
              stats={{
                totalPassengers: stats?.totalRides || 0,
                totalEarnings: stats?.totalEarnings || 0,
                totalTrips: stats?.thisMonthRides || 0,
                totalRate: stats?.averageRating || 0,
              }}
            />

            {/* Trip Trends Chart & Quick Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TripTrendsChart />
              <QuickSummary />
            </div>
            
            {/* Recent Messages & Payment Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentMessages />
              </div>

              <Card className="bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-white/90">Payment Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/80">This Month</p>
                      <p className="text-3xl font-bold">42,500 RWF</p>
                    </div>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-sm text-white/80">Pending</p>
                      <p className="text-xl font-semibold">5,000 RWF</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'create':
        return <CreateTripView />;
      case 'bookings':
        return <BookingsView />;
      case 'rides':
        return <ActiveRidesView />;
      case 'car-registration':
        return <CarRegistrationView />;
      case 'messages':
        return <MessagesView />;
      case 'earnings':
        return <EarningsView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-600">Welcome back, {userName}!</p>
            </div>
            
            <DriverStatsOverview
              stats={{
                totalPassengers: stats?.totalRides || 0,
                totalEarnings: stats?.totalEarnings || 0,
                totalTrips: stats?.thisMonthRides || 0,
                totalRate: stats?.averageRating || 0,
              }}
            />

            {/* Trip Trends Chart & Quick Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TripTrendsChart />
              <QuickSummary />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentMessages />
              </div>

              <Card className="bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-white/90">Payment Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/80">This Month</p>
                      <p className="text-3xl font-bold">42,500 RWF</p>
                    </div>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-sm text-white/80">Pending</p>
                      <p className="text-xl font-semibold">5,000 RWF</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <DriverLayout userName={userName} onLogout={onLogout} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DriverLayout>
  );
}
