import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { MapPin, Calendar, Clock, Users, DollarSign, Navigation } from 'lucide-react';
import { format } from 'date-fns';

interface Ride {
  id: string | number;
  origin: string;
  destination: string;
  departure_time: string;
  total_seats: number;
  available_seats: number;
  price_per_seat?: number;
  driver_name?: string;
  match_type?: 'exact' | 'partial' | 'nearby';
  status?: string;
}

interface AvailableRidesDisplayProps {
  rides: Ride[];
  isLoading?: boolean;
  onBookRide: (rideId: string, seats: number) => void;
  searchActive?: boolean;
}

export function AvailableRidesDisplay({ 
  rides, 
  isLoading, 
  onBookRide,
  searchActive = false 
}: AvailableRidesDisplayProps) {
  
  const getMatchBadge = (matchType?: string) => {
    switch (matchType) {
      case 'exact':
        return <Badge className="bg-green-100 text-green-800 text-xs">Exact Match</Badge>;
      case 'partial':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Partial Match</Badge>;
      case 'nearby':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Nearby Route</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {searchActive ? 'No matching rides found' : 'No available rides'}
        </h3>
        <p className="text-gray-600 text-sm">
          {searchActive 
            ? 'Try adjusting your search criteria or check back later'
            : 'Check back soon for new ride offers'}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {searchActive ? 'Search Results' : 'Available Rides'}
        </h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {rides.length} {rides.length === 1 ? 'ride' : 'rides'}
        </Badge>
      </div>

      {rides.map((ride) => (
        <Card key={ride.id} className="p-4 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="space-y-3">
            {/* Route */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="font-semibold text-gray-900">{ride.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">To</p>
                    <p className="font-semibold text-gray-900">{ride.destination}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {getMatchBadge(ride.match_type)}
                {ride.driver_name && (
                  <p className="text-xs text-gray-600 mt-2">Driver: {ride.driver_name}</p>
                )}
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-600">Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(ride.departure_time), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(ride.departure_time), 'HH:mm')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-600">Seats</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ride.available_seats}/{ride.total_seats} available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-gray-600">Price</p>
                  <p className="text-sm font-medium text-green-600">
                    {ride.price_per_seat ? `${ride.price_per_seat} RWF` : 'Contact driver'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              <Button
                onClick={() => onBookRide(ride.id.toString(), 1)}
                disabled={!ride.available_seats || ride.available_seats <= 0}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                {ride.available_seats > 0 ? 'Book Now' : 'Fully Booked'}
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
