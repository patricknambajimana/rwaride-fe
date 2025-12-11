import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, Clock, Users, DollarSign, Star, CheckCircle, AlertCircle } from "lucide-react";

export interface ActiveRide {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerRating: number;
  seatsBooked: number;
  seatsAvailable: number;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  estimatedArrivalTime: string;
  currentLocation: string;
  status: "upcoming" | "in-progress" | "completed";
  earnings: number;
  notes?: string;
}

interface ActiveRideCardProps {
  ride: ActiveRide;
  onStartRide?: () => void;
  onCompleteRide?: () => void;
  onCancel?: () => void;
  onContact?: () => void;
}

export function ActiveRideCard({
  ride,
  onStartRide,
  onCompleteRide,
  onCancel,
  onContact,
}: ActiveRideCardProps) {
  const getStatusColor = () => {
    switch (ride.status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isUpcoming = ride.status === "upcoming";
  const isInProgress = ride.status === "in-progress";
  const isCompleted = ride.status === "completed";

  return (
    <Card className={`hover:shadow-lg transition-shadow ${
      isInProgress ? "border-l-4 border-l-green-500" : ""
    }`}>
      <CardContent className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{ride.passengerName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">
                {ride.passengerRating.toFixed(1)}
              </span>
              <Badge className={getStatusColor()}>
                {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">${ride.earnings}</p>
            <p className="text-xs text-gray-600">Earnings</p>
          </div>
        </div>

        {/* Route */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-0.5 h-8 bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold">From</p>
                <p className="text-sm font-medium">{ride.fromLocation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">To</p>
                <p className="text-sm font-medium">{ride.toLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
          <div>
            <p className="text-xs text-gray-600">Date</p>
            <p className="font-medium text-sm">
              {new Date(ride.departureDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Departure</p>
            <p className="font-medium text-sm">{ride.departureTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Expected Arrival</p>
            <p className="font-medium text-sm">{ride.estimatedArrivalTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Passengers</p>
            <p className="font-medium text-sm">
              {ride.seatsBooked}/{ride.seatsAvailable}
            </p>
          </div>
        </div>

        {/* Current Status */}
        {isInProgress && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-blue-800 mb-1">
                  Ride in Progress
                </p>
                <p className="text-xs text-blue-700">
                  Current: {ride.currentLocation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {ride.notes && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs font-semibold text-yellow-800 mb-1">Notes</p>
            <p className="text-xs text-yellow-700">{ride.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t flex-wrap">
          {isUpcoming && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              {onContact && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onContact}
                  className="flex-1"
                >
                  Contact Passenger
                </Button>
              )}
              {onStartRide && (
                <Button
                  size="sm"
                  onClick={onStartRide}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Start Ride
                </Button>
              )}
            </>
          )}

          {isInProgress && (
            <>
              {onContact && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onContact}
                  className="flex-1"
                >
                  Contact
                </Button>
              )}
              {onCompleteRide && (
                <Button
                  size="sm"
                  onClick={onCompleteRide}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Complete Ride
                </Button>
              )}
            </>
          )}

          {isCompleted && (
            <Badge className="w-full justify-center bg-gray-400 text-white">
              ✓ Ride Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
