import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';

export interface ActiveRide {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  passengers?: number;
  status?: 'active' | 'completed' | 'cancelled';
}

interface ActiveRideCardProps {
  ride?: ActiveRide;
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function ActiveRideCard({
  ride = {
    id: '1',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '08:00 AM',
    seatsAvailable: 3,
    pricePerSeat: 5000,
    passengers: 2,
    status: 'active',
  },
  onStart,
  onComplete,
  onCancel,
}: ActiveRideCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Active Ride</CardTitle>
          <Badge className="bg-green-100 text-green-800">{ride.status || 'active'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route */}
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-semibold">
              {ride.from} → {ride.to}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Departure</p>
            <p className="font-semibold">{ride.departureTime}</p>
          </div>
        </div>

        {/* Passengers & Seats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600">Passengers</p>
              <p className="font-semibold">{ride.passengers || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-600">Per Seat</p>
              <p className="font-semibold">{ride.pricePerSeat?.toLocaleString()} RWF</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onCancel} className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
            Cancel
          </Button>
          <Button onClick={onStart} className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
            Start Ride
          </Button>
          <Button onClick={onComplete} className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

