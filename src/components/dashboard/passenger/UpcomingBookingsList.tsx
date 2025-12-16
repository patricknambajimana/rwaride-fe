import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Calendar, MapPin, Clock, MessageCircle, DollarSign, X, Phone, Mail } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";

interface UpcomingBooking {
  id: string;
  driver_id?: string;
  driver_name: string;
  driver_phone?: string;
  driver_email?: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  status: "confirmed" | "pending" | "cancelled";
  seats?: number;
  total_price?: number;
}

interface Props {
  bookings: UpcomingBooking[];
  onMessage: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

export function UpcomingBookingsList({ bookings, onMessage, onCancel }: Props) {
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

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
        <Card 
          key={booking.id} 
          className="overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
          onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
        >
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-3 flex-1">
                <Avatar className="mt-1 w-10 h-10">
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {booking.driver_name?.[0] || "D"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{booking.driver_name}</p>
                  <div className="flex gap-2 mt-1 text-xs text-gray-600 flex-wrap">
                    <span className="truncate">
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
                className="ml-2"
              >
                {booking.status}
              </Badge>
            </div>

            {/* Expanded Driver Contact Info */}
            {expandedBooking === booking.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 bg-green-50 p-3 rounded space-y-2">
                <p className="text-sm font-semibold text-gray-700">Driver Contact:</p>
                {booking.driver_phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-green-600" />
                    <a 
                      href={`tel:${booking.driver_phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-green-600 hover:underline font-medium"
                    >
                      {booking.driver_phone}
                    </a>
                  </div>
                )}
                {booking.driver_email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-green-600" />
                    <a 
                      href={`mailto:${booking.driver_email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-green-600 hover:underline font-medium"
                    >
                      {booking.driver_email}
                    </a>
                  </div>
                )}
                {booking.total_price && (
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-green-200">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{booking.total_price} RWF</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onMessage(booking.id);
                }}
                className="flex-1"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Message
              </Button>
              {booking.status === "pending" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel(booking.id);
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
