import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Clock, Users, DollarSign, MessageCircle, CheckCircle, XCircle } from "lucide-react";

export interface BookingRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerImage?: string;
  passengerRating: number;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  seatsRequested: number;
  estimatedDistance: string;
  estimatedDuration: string;
  offerPrice: number;
  status: "pending" | "accepted" | "rejected";
  requestTime: string;
}

interface BookingRequestCardProps {
  request: BookingRequest;
  onAccept?: () => void;
  onReject?: () => void;
  onContact?: () => void;
}

export function BookingRequestCard({
  request,
  onAccept,
  onReject,
  onContact,
}: BookingRequestCardProps) {
  const getStatusColor = () => {
    switch (request.status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const hours = Math.floor(diffMinutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
      <CardContent className="p-4 md:p-6">
        {/* Header with Passenger Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
              <AvatarImage src={request.passengerImage} alt={request.passengerName} />
              <AvatarFallback>{request.passengerName[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm md:text-base truncate">
                {request.passengerName}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-xs md:text-sm text-gray-600">
                  {request.passengerRating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  • {getTimeAgo(request.requestTime)}
                </span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
        </div>

        {/* Route Info */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">From</p>
              <p className="text-sm font-medium truncate">{request.fromLocation}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">To</p>
              <p className="text-sm font-medium truncate">{request.toLocation}</p>
            </div>
          </div>
        </div>

        {/* Time and Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-medium text-xs md:text-sm">{request.departureTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Passengers</p>
              <p className="font-medium text-xs md:text-sm">{request.seatsRequested}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Offer</p>
              <p className="font-medium text-xs md:text-sm text-green-600">
                ${request.offerPrice}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-medium text-xs md:text-sm">{request.estimatedDistance}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {request.status === "pending" && (
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="flex-1 flex items-center justify-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Decline</span>
            </Button>
            {onContact && (
              <Button
                variant="outline"
                size="sm"
                onClick={onContact}
                className="flex-1 flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Button>
            )}
            <Button
              size="sm"
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Accept</span>
            </Button>
          </div>
        )}

        {request.status === "accepted" && (
          <div className="pt-4 border-t bg-green-50 rounded-lg p-3 mt-4">
            <p className="text-xs font-semibold text-green-800 mb-2">
              ✓ Booking Accepted
            </p>
            <p className="text-xs text-green-700">
              Contact the passenger to confirm details and coordinate pickup
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
