import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, Clock, DollarSign } from "lucide-react";
import { Booking } from "./BookingsList";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <p className="font-semibold text-base md:text-lg">
                {booking.driverName}
              </p>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-gray-600">
              Booking #{booking.bookingNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg md:text-xl font-bold text-green-600">
              ${booking.totalPrice}
            </p>
            <p className="text-xs text-gray-600">
              {booking.seatsBooked} seat{booking.seatsBooked > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-600">From</p>
              <p className="text-sm font-medium truncate">
                {booking.fromLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-600">To</p>
              <p className="text-sm font-medium truncate">
                {booking.toLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-600">Date</p>
              <p className="text-sm font-medium">
                {new Date(booking.departureDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-600">Time</p>
              <p className="text-sm font-medium">{booking.departureTime}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-1">Vehicle</p>
          <p className="text-sm">
            {booking.vehicleMake} {booking.vehicleModel} •{" "}
            {booking.licensePlate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
