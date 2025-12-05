import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Calendar, Clock, Star } from "lucide-react";

interface Booking {
  id: string;
  driver_name?: string;
  status?: string;
  from_location?: string;
  to_location?: string;
  departure_date?: string;
  departure_time?: string;
  rating?: number | null;
}

interface Props {
  bookings: Booking[];
  onRateTrip: (bookingId: string, rating: number) => void;
}

export function BookingsList({ bookings, onRateTrip }: Props) {
  if (!bookings || bookings.length === 0) return null;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{booking.driver_name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{booking.driver_name}</p>
                  <p className="text-sm text-gray-600">Driver</p>
                </div>
              </div>
              <Badge>{booking.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="flex gap-2">
                <Calendar className="w-4 h-4" />
                <div>
                  <p className="text-sm">From</p>
                  <p>{booking.from_location}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Clock className="w-4 h-4" />
                <div>
                  <p className="text-sm">To</p>
                  <p>{booking.to_location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(booking.departure_date || "").toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {booking.departure_time}
              </div>
            </div>

            {booking.status === "completed" && !booking.rating && (
              <div className="border-t pt-2 flex items-center gap-2">
                <span className="text-sm">Rate this trip:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => onRateTrip(booking.id, r)}>
                    <Star className="w-5 h-5 text-gray-300 hover:text-yellow-500 hover:fill-yellow-500" />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
