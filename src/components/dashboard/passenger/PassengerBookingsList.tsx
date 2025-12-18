import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Button } from '../../ui/button';
import { MapPin, Calendar, Clock, Users, AlertCircle, Loader2, XCircle } from 'lucide-react';
import { useGetPassengerBookingsQuery, useCancelBookingMutation } from '../../../services/api/ridesApi';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function PassengerBookingsList() {
  const { data: bookings, isLoading, error } = useGetPassengerBookingsQuery();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center text-red-700">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" />
          <p className="font-semibold">Failed to load your bookings</p>
          <p className="text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-center text-blue-800">
          <p className="font-semibold">No bookings yet</p>
          <p className="text-sm text-blue-700">Find a ride and book to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking: any) => (
        <Card key={booking.id || booking.booking_id} className="border hover:shadow-md transition bg-white">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>{booking.origin || 'N/A'} → {booking.destination || 'N/A'}</span>
                </div>

                <div className="text-sm text-gray-600 grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>
                      {booking.departure_time
                        ? format(new Date(booking.departure_time), 'MMM dd, yyyy')
                        : 'Date N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>
                      {booking.departure_time
                        ? format(new Date(booking.departure_time), 'HH:mm')
                        : 'Time N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span>{booking.seats || booking.seats_booked || 1} seat(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {booking.status || 'pending'}
                    </Badge>
                  </div>
                </div>
              </div>

              {booking.total_price && (
                <div className="text-right min-w-[90px]">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-green-600">
                    {booking.total_price.toLocaleString()} RWF
                  </p>
                </div>
              )}
            </div>

            {/* Cancel action */}
            {(booking.status === 'pending' || booking.status === 'confirmed') && (
              <div className="pt-3">
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  disabled={isCancelling}
                  onClick={async () => {
                    try {
                      await cancelBooking({ booking_id: Number(booking.id || booking.booking_id) }).unwrap();
                      toast.success('Booking canceled', {
                        description: 'Seats released successfully',
                      });
                    } catch (err: any) {
                      toast.error('Failed to cancel booking', {
                        description: err?.data?.message || err?.message || 'Please try again',
                      });
                    }
                  }}
                >
                  {isCancelling ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Canceling...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Cancel Booking
                    </span>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
