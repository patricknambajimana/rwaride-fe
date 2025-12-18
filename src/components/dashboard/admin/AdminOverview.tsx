import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useGetAdminStatsQuery, useGetAdminUsersQuery, useGetAdminTripsQuery, useGetAdminBookingsQuery } from '../../../services/api/adminApi';
import { Skeleton } from '../../ui/skeleton';

export function AdminOverview() {
  const { data: stats, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: users, isLoading: usersLoading } = useGetAdminUsersQuery();
  const { data: trips, isLoading: tripsLoading } = useGetAdminTripsQuery();
  const { data: bookings, isLoading: bookingsLoading } = useGetAdminBookingsQuery();

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+12% from last month',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Trips',
      value: stats?.activeTrips || 0,
      change: `${stats?.totalTrips || 0} total trips`,
      icon: MapPin,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      change: '+8% from last week',
      icon: Car,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Revenue',
      value: `${stats?.totalRevenue || 0} RWF`,
      change: '+15% growth',
      icon: DollarSign,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
  ];

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">Monitor and manage your RwaRide platform</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {usersLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {users?.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Trips */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Recent Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {tripsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {trips?.slice(0, 5).map((trip) => (
                  <div key={trip.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{trip.origin} → {trip.destination}</p>
                      <p className="text-sm text-gray-500">{trip.driver_name}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : trip.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bookings Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5 text-purple-600" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {bookingsLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Passenger</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Seats</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">{booking.passenger_name}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{booking.seats_booked}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{booking.total_price} RWF</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {booking.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                          {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                          {booking.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
