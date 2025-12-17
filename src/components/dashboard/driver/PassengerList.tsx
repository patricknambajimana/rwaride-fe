import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { MapPin, Clock } from 'lucide-react';

export interface Passenger {
  id: string;
  name: string;
  pickupLocation: string;
  dropoffLocation: string;
  time: string;
  seats: number;
  rating: number;
  status: 'waiting' | 'picked' | 'arrived';
}

interface PassengerListProps {
  passengers?: Passenger[];
}

export function PassengerList({ passengers }: PassengerListProps) {
  const defaultPassengers: Passenger[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      pickupLocation: 'Kigali City Center',
      dropoffLocation: 'Huye Town',
      time: '08:00 AM',
      seats: 2,
      rating: 4.8,
      status: 'waiting',
    },
    {
      id: '2',
      name: 'Bob Smith',
      pickupLocation: 'Kigali Airport',
      dropoffLocation: 'Downtown',
      time: 'ASAP',
      seats: 1,
      rating: 4.5,
      status: 'waiting',
    },
  ];

  const passengerList = passengers || defaultPassengers;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'picked':
        return 'bg-blue-100 text-blue-800';
      case 'arrived':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {passengerList.map((passenger) => (
        <Card key={passenger.id} className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              {/* Avatar & Name */}
              <div className="flex items-start gap-3 flex-1">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white">
                    {passenger.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{passenger.name}</p>
                    <Badge className={getStatusColor(passenger.status)}>
                      {passenger.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{passenger.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-5">
                      <span className="text-xs">↓</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{passenger.dropoffLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{passenger.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-yellow-600">
                  ⭐ {passenger.rating}
                </div>
                <div className="text-xs text-gray-500">
                  {passenger.seats} seat{passenger.seats > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
