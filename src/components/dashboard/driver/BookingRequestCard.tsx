import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export interface BookingRequest {
  id: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  from: string;
  to: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface BookingRequestCardProps {
  booking?: BookingRequest;
  onAccept?: () => void;
  onReject?: () => void;
}

export function BookingRequestCard({
  booking = {
    id: '1',
    passengerName: 'John Doe',
    passengerEmail: 'john@example.com',
    passengerPhone: '+250788000111',
    from: 'Kigali',
    to: 'Huye',
    status: 'pending',
  },
  onAccept,
  onReject,
}: BookingRequestCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Booking Request</CardTitle>
          <Badge className={booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Passenger Info */}
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white">
              {booking.passengerName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{booking.passengerName}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Mail className="w-4 h-4" />
              {booking.passengerEmail}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              {booking.passengerPhone}
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-sm">
              {booking.from} → {booking.to}
            </span>
          </div>
        </div>

        {/* Actions */}
        {booking.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onReject}
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

