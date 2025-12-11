import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface BookingRequestProps {
  passengerName: string;
  from: string;
  to: string;
  onAccept: () => void;
  onReject: () => void;
}

export function BookingRequest({ passengerName, from, to, onAccept, onReject }: BookingRequestProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Request!</CardTitle>
        <CardDescription>You have a new passenger request</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg space-y-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">New Booking!</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Route:</span> {from} → {to}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4 justify-center">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{passengerName?.[0] || 'P'}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium">{passengerName}</p>
              <p className="text-sm text-gray-600">Passenger</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="destructive" onClick={onReject} className="w-full">
            <ThumbsDown className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button onClick={onAccept} className="w-full">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Accept
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
