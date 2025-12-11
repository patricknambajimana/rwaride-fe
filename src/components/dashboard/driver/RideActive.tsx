import { Card, CardContent } from '@/components/ui/card';
import { Navigation, MapPin } from 'lucide-react';

interface RideActiveProps {
  from: string;
  to: string;
}

export function RideActive({ from, to }: RideActiveProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-green-100 p-6 rounded-full">
            <Navigation className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Ride in Progress</h2>
        <p className="text-gray-600 mb-8">Passenger is in your vehicle</p>
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <p className="font-medium">
              {from} → {to}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
