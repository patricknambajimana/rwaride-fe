import { MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface RideDetails {
  id: string;
  driverId: string;
  driverName: string;
  driverImage?: string;
  driverRating: number;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  pricePerSeat: number;
  totalPrice: number;
  status: "available" | "booked" | "full" | "cancelled";
  amenities?: string[];
  notes?: string;
}

interface RideCardProps {
  ride: RideDetails;
  onBook?: () => void;
  onChat?: () => void;
  isBooked?: boolean;
  isExpanded?: boolean;
  onViewDetails?: () => void;
}

export function RideCard({
  ride,
  onBook,
  onChat,
  isBooked,
  isExpanded = false,
  onViewDetails,
}: RideCardProps) {
  const getStatusColor = () => {
    switch (ride.status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-red-100 text-red-800";
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 md:p-6">
        {/* Header with Driver Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage src={ride.driverImage} alt={ride.driverName} />
              <AvatarFallback>{ride.driverName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-sm md:text-base">
                {ride.driverName}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-xs md:text-sm text-gray-600">
                  {ride.driverRating.toFixed(1)} ({ride.vehicleMake}{" "}
                  {ride.vehicleModel})
                </span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </Badge>
        </div>

        {/* Route Info */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">From</p>
              <p className="text-sm font-medium truncate">{ride.fromLocation}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">To</p>
              <p className="text-sm font-medium truncate">{ride.toLocation}</p>
            </div>
          </div>
        </div>

        {/* Time and Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Depart</p>
              <p className="font-medium">{ride.departureTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Seats</p>
              <p className="font-medium">{ride.availableSeats} available</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium">${ride.pricePerSeat}</p>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div>
              <p className="text-xs text-gray-600 font-semibold">Vehicle</p>
              <p className="text-sm">
                {ride.vehicleMake} {ride.vehicleModel} • {ride.licensePlate}
              </p>
            </div>
            {ride.notes && (
              <div>
                <p className="text-xs text-gray-600 font-semibold">Notes</p>
                <p className="text-sm">{ride.notes}</p>
              </div>
            )}
            {ride.amenities && ride.amenities.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 font-semibold">Amenities</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ride.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          {onViewDetails && !isExpanded && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          {onChat && (
            <Button
              variant="outline"
              size="sm"
              onClick={onChat}
              className="flex-1"
            >
              Contact Driver
            </Button>
          )}
          {onBook && !isBooked && ride.status === "available" && (
            <Button size="sm" onClick={onBook} className="flex-1">
              Book Ride
            </Button>
          )}
          {isBooked && (
            <Badge className="w-full justify-center">Booked</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
