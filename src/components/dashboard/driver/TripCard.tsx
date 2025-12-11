import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { PassengerList } from '@/components/dashboard/driver/PassengerList';

interface Trip {
  id: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  status: 'active' | 'completed' | 'cancelled';
  bookings?: any[];
}

interface TripCardProps {
  trip: Trip;
  onOpenChat?: (payload: { tripId: string; recipientId: string; recipientName: string }) => void;
  onUpdateBookingStatus?: (tripId: string, bookingId: string, status: 'confirmed' | 'cancelled') => void;
}

export function TripCard({ trip, onOpenChat, onUpdateBookingStatus }: TripCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <div>
                  <p className="text-sm">From</p>
                  <p className="font-medium">{trip.from_location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <div>
                  <p className="text-sm">To</p>
                  <p className="font-medium">{trip.to_location}</p>
                </div>
              </div>
            </div>
            <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
              {trip.status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(trip.departure_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{trip.departure_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{trip.available_seats} seats available</span>
            </div>
          </div>

          {trip.bookings && trip.bookings.length > 0 && (
            <PassengerList
              bookings={trip.bookings}
              onOpenChat={onOpenChat}
              tripId={trip.id}
              onUpdateBookingStatus={onUpdateBookingStatus}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
