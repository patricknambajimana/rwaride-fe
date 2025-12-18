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
      <CardContent className="p-3 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p className="font-semibold text-sm sm:text-lg md:text-xl truncate">
                {booking.driverName}
              </p>
              <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Booking #{booking.bookingNumber}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              ${booking.totalPrice}
            </p>
          
            <p className="text-xs sm:text-sm text-gray-600">
              {booking.seatsBooked} seat{booking.seatsBooked !== 1 ? "s" : ""}
            </p>

          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm md:text-base text-gray-600">From</p>
              <p className="text-xs sm:text-sm md:text-base font-medium truncate">
                {booking.fromLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm md:text-base text-gray-600">To</p>
              <p className="text-xs sm:text-sm md:text-base font-medium truncate">
                {booking.toLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Date</p>
              <p className="text-xs sm:text-sm md:text-base font-medium">
                {new Date(booking.departureDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Time</p>
              <p className="text-xs sm:text-sm md:text-base font-medium">{booking.departureTime}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">Vehicle</p>
          <p className="text-xs sm:text-sm md:text-base">
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
