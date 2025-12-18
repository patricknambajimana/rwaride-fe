import { useGetAdminBookingsQuery } from '../../services/api/adminApi';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { BookOpen, Users, DollarSign, Calendar } from 'lucide-react';

export function AdminBookingsPage() {
  const { data: bookings, isLoading } = useGetAdminBookingsQuery();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: bookings?.length || 0,
    confirmed: bookings?.filter(b => b.status === 'confirmed').length || 0,
    pending: bookings?.filter(b => b.status === 'pending').length || 0,
    completed: bookings?.filter(b => b.status === 'completed').length || 0,
  };

  const totalRevenue = bookings?.reduce((sum, b) => sum + b.total_price, 0) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-gray-600 mt-1">Track and manage all ride bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            Total Bookings
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Total Revenue
          </div>
          <div className="text-2xl font-bold text-gray-900">RWF {totalRevenue.toLocaleString()}</div>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Passenger</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trip ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Seats</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{booking.passenger_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-gray-900">{booking.passenger_name}</span>
                          <div className="text-xs text-gray-600">{booking.passenger_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-sm">{booking.trip_id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-gray-900 font-medium">
                        <Users className="w-4 h-4 text-gray-500" />
                        {booking.seats_booked}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">RWF {booking.total_price.toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No bookings found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
