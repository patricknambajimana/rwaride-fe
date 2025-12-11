import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { MessageCircle } from 'lucide-react';

interface Booking {
  id: string;
  passenger_name: string;
  passenger_email: string;
  passenger_phone?: string;
  status: string;
}

interface PassengerListProps {
  bookings: Booking[];
  tripId: string;
  onOpenChat?: (payload: { tripId: string; recipientId: string; recipientName: string }) => void;
  onUpdateBookingStatus?: (tripId: string, bookingId: string, status: 'confirmed' | 'cancelled') => void;
}

export function PassengerList({ bookings, onOpenChat, tripId, onUpdateBookingStatus }: PassengerListProps) {
  return (
    <div className="pt-4 border-t space-y-3">
      <p className="text-sm font-medium">Passengers ({bookings.length}):</p>
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{booking.passenger_name?.[0] || 'P'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{booking.passenger_name}</p>
              <p className="text-xs text-gray-600">{booking.passenger_email}</p>
              {booking.passenger_phone && (
                <p className="text-xs text-gray-500">{booking.passenger_phone}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
              {booking.status}
            </Badge>
            {booking.status === 'pending' && onUpdateBookingStatus && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateBookingStatus(tripId, booking.id, 'confirmed')}
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUpdateBookingStatus(tripId, booking.id, 'cancelled')}
                >
                  Cancel
                </Button>
              </>
            )}
            {onOpenChat && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onOpenChat({
                    tripId,
                    recipientId: booking.id,
                    recipientName: booking.passenger_name || 'Passenger',
                  })
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
