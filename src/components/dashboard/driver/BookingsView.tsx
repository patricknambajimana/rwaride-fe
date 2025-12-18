import { BookingRequestCard, type BookingRequest } from './BookingRequestCard';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { AlertCircle, Bell } from 'lucide-react';
import { useGetDriverRidesQuery } from '../../../services/api/ridesApi';

export function BookingsView() {
  const { data: rides, isLoading, error } = useGetDriverRidesQuery();

  // Extract booking requests from driver rides
  const bookingRequests: BookingRequest[] = (rides || [])
    .flatMap((ride: any) => {
      // Assuming ride has bookings array or booking details
      if (ride.bookings && Array.isArray(ride.bookings)) {
        return ride.bookings.map((booking: any) => ({
          id: booking.id?.toString() || `${ride.id}-${booking.passenger_id}`,
          passengerName: booking.passenger_name || 'Unknown',
          passengerEmail: booking.passenger_email || 'N/A',
          passengerPhone: booking.passenger_phone || 'N/A',
          from: ride.origin || 'N/A',
          to: ride.destination || 'N/A',
          status: booking.status || 'pending',
        }));
      }
      return [];
    })
    .filter((b) => b.status === 'pending' || b.status === 'confirmed');

  const pendingCount = bookingRequests.filter((b) => b.status === 'pending').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Booking Requests</h2>
          <Badge className="bg-gray-300 text-gray-700">Loading...</Badge>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Booking Requests</h2>
        </div>
        <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center text-red-700">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Failed to load booking requests</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Booking Requests</h2>
        {pendingCount > 0 ? (
          <Badge className="bg-orange-500 text-white px-3 py-1 flex items-center gap-1">
            <Bell className="w-4 h-4" />
            {pendingCount} Pending
          </Badge>
        ) : (
          <Badge variant="outline" className="px-3 py-1">
            All caught up
          </Badge>
        )}
      </div>

      <div className="grid gap-4">
        {bookingRequests.length > 0 ? (
          bookingRequests.map((booking) => (
            <BookingRequestCard
              key={booking.id}
              booking={booking}
              onAccept={() => {
                // Automatically refreshes via RTK tag invalidation
              }}
              onReject={() => {
                // Optional: handle rejection logic
              }}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">No booking requests at the moment</p>
            <p className="text-sm text-gray-400">Your passengers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
