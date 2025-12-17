import { useState } from 'react';
import { DriverLayout } from './DriverLayout';
import { DriverStatsOverview } from './DriverStatsOverview';
import { BookingsView } from './BookingsView';
import { ActiveRidesView } from './ActiveRidesView';
import { MessagesView } from './MessagesView';
import { EarningsView } from './EarningsView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { CreateTripView } from './CreateTripView';
import { CarRegistrationView } from './CarRegistrationView';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface DriverDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

export function DriverDashboard({ userName = 'Driver', onLogout }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');


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
                totalPassengers: 342,
                totalEarnings: 45200,
                totalTrips: 247,
                totalRate: 4.8,
              }}
            />

            {/* Find Your Next Ride */}
            <div className="rounded-xl p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <h3 className="text-xl font-semibold mb-4">Find Your Next Ride</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input placeholder="From (From City)" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Input placeholder="To (Destination)" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Input type="date" placeholder="mm/dd/yyyy" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">Search Rides</Button>
              </div>
            </div>

            {/* Upcoming Bookings & Payment Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 rounded-md border bg-muted/30 text-muted-foreground">
                      No upcoming bookings
                    </div>
                  </CardContent>
                </Card>
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
                totalPassengers: 342,
                totalEarnings: 45200,
                totalTrips: 247,
                totalRate: 4.8,
              }}
            />

            {/* Find Your Next Ride */}
            <div className="rounded-xl p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <h3 className="text-xl font-semibold mb-4">Find Your Next Ride</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input placeholder="From (From City)" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Input placeholder="To (Destination)" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Input type="date" placeholder="mm/dd/yyyy" className="bg-white/90 text-gray-900 placeholder:text-gray-500" />
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">Search Rides</Button>
              </div>
            </div>

            {/* Upcoming Bookings & Payment Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 rounded-md border bg-muted/30 text-muted-foreground">
                      No upcoming bookings
                    </div>
                  </CardContent>
                </Card>
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
