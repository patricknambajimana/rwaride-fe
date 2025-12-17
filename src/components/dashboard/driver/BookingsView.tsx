import { BookingRequestCard, type BookingRequest } from './BookingRequestCard';
import { Badge } from '../../ui/badge';

const mockBookings: BookingRequest[] = [
  {
    id: '1',
    passengerName: 'John Doe',
    passengerEmail: 'john@example.com',
    passengerPhone: '+250788000111',
    from: 'Kigali International Airport',
    to: 'Kigali Convention Centre',
    status: 'pending',
  },
  {
    id: '2',
    passengerName: 'Jane Smith',
    passengerEmail: 'jane@example.com',
    passengerPhone: '+250788000222',
    from: 'Kimironko Market',
    to: 'Remera',
    status: 'confirmed',
  },
];

export function BookingsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Booking Requests</h2>
        <Badge className="bg-green-500 text-white px-3 py-1">
          {mockBookings.filter(b => b.status === 'pending').length} Pending
        </Badge>
      </div>

      <div className="grid gap-4">
        {mockBookings.map((booking) => (
          <BookingRequestCard
            key={booking.id}
            booking={booking}
            onAccept={() => console.log('Accept:', booking.id)}
            onReject={() => console.log('Reject:', booking.id)}
          />
        ))}
      </div>

      {mockBookings.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No booking requests at the moment</p>
        </div>
      )}
    </div>
  );
}
