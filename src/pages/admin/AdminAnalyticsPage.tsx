import { useGetAdminStatsQuery } from '../../services/api/adminApi';
import { Card } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Users, Car, MapPin, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export function AdminAnalyticsPage() {
  const { data: stats, isLoading } = useGetAdminStatsQuery();

  const statsCards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Drivers',
      value: stats?.totalDrivers || 0,
      icon: Car,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Passengers',
      value: stats?.totalPassengers || 0,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Trips',
      value: stats?.totalTrips || 0,
      icon: MapPin,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      label: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: BookOpen,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'Active Trips',
      value: stats?.activeTrips || 0,
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      label: 'Total Revenue',
      value: `RWF ${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Pending Verifications',
      value: stats?.pendingVerifications || 0,
      icon: Users,
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600 mt-1">Key metrics and statistics of the RwaRide platform</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Additional Insights */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 text-sm">User Engagement</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats && stats.totalTrips > 0 ? ((stats.activeTrips / stats.totalTrips) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Active trips percentage</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-gray-600 text-sm">Platform Growth</p>
            <p className="text-2xl font-bold text-green-600 mt-1">+12%</p>
            <p className="text-xs text-gray-500 mt-1">Monthly growth rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
