import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface RideCompleteProps {
  earnings: number;
  onRate: () => void;
}

export function RideComplete({ earnings, onRate }: RideCompleteProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Ride Complete!</h2>
        <p className="text-gray-600 mb-6">
          You've successfully completed this trip.
        </p>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Earnings for this ride</p>
          <p className="text-3xl font-bold text-green-600">{earnings} RWF</p>
        </div>
        <Button onClick={onRate} size="lg" className="w-full max-w-md">
          Rate Passenger
        </Button>
      </CardContent>
    </Card>
  );
}
