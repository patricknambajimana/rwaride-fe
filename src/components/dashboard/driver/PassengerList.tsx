import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';

interface Booking {
  id: string;
  passenger_name: string;
  passenger_email: string;
  status: string;
}

interface PassengerListProps {
  bookings: Booking[];
}

export function PassengerList({ bookings }: PassengerListProps) {
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
            </div>
          </div>
          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
            {booking.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
