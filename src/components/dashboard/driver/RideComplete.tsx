import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';

export interface RideCompleteData {
  rideId: string;
  passengerName: string;
  from: string;
  to: string;
  duration: string;
  earnings: number;
}

interface RideCompleteProps {
  ride?: RideCompleteData;
  onRate?: () => void;
  onNext?: () => void;
}

export function RideComplete({ onRate, onNext }: RideCompleteProps) {
  return (
    <Card className="w-full shadow-lg border-2 bg-linear-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-linear-to-r from-green-600 to-blue-600 text-white rounded-t-lg text-center">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <CardTitle className="text-2xl">Ride Completed</CardTitle>
        <CardDescription className="text-green-50 mt-1">
          Great work! Your passenger has arrived
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Ride Details */}
          <div className="bg-white p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Passenger Name</span>
              <span className="font-semibold">John Doe</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Kigali → Huye</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Duration: 2 hours 30 minutes</span>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-linear-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                <span className="text-gray-600">Earnings</span>
              </div>
              <span className="text-3xl font-bold text-green-600">8,000 RWF</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onRate}
              className="w-full bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-6"
            >
              <Star className="w-4 h-4 mr-2" />
              Rate Passenger
            </Button>
            <Button
              onClick={onNext}
              variant="outline"
              className="w-full py-6"
            >
              Next Ride
            </Button>
          </div>

          {/* Tip Info */}
          <div className="text-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
            <p>💡 <strong>Did you know?</strong> Passengers often add tips for excellent service</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
