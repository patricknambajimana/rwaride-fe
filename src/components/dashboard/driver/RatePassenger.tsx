import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface RatePassengerProps {
  passengerName: string;
  onRate: (rating: number) => void;
  onSkip: () => void;
}

export function RatePassenger({ passengerName, onRate, onSkip }: RatePassengerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Your Passenger</CardTitle>
        <CardDescription>Help maintain our community standards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-xl">{passengerName?.[0] || 'P'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lg">{passengerName}</p>
            <p className="text-sm text-gray-600">How was the passenger?</p>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-4">Tap to rate</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRate(rating)}
                className="hover:scale-125 transition-transform"
              >
                <Star className="w-12 h-12 text-gray-300 hover:text-yellow-500 hover:fill-yellow-500" />
              </button>
            ))}
          </div>
        </div>

        <Button variant="outline" onClick={onSkip} className="w-full">
          Skip Rating
        </Button>
      </CardContent>
    </Card>
  );
}
