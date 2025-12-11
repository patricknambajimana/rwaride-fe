import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Calendar, MapPin, Clock, MessageCircle, DollarSign, X } from "lucide-react";
import { Button } from "../../ui/button";

interface UpcomingBooking {
  id: string;
  driver_name: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  status: "confirmed" | "pending" | "cancelled";
  seats?: number;
}

interface Props {
  bookings: UpcomingBooking[];
  onMessage: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

export function UpcomingBookingsList({ bookings, onMessage, onCancel }: Props) {
  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <p>No upcoming bookings</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex gap-3 flex-1">
                <Avatar className="mt-1">
                  <AvatarFallback>{booking.driver_name?.[0] || "D"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{booking.driver_name}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-gray-600">
                      {booking.from_location} → {booking.to_location}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(booking.departure_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {booking.departure_time}
                    </div>
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "default"
                    : booking.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </div>
            <div className="flex gap-2 pt-2 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMessage(booking.id)}
                className="flex-1"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Message
              </Button>
              {booking.status === "pending" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onCancel(booking.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
