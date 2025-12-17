import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

export interface RideHistory {
  id: string;
  passengerName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  earnings: number;
  rating: number;
}

interface RideHistoryListProps {
  rides?: RideHistory[];
}

export function RideHistoryList({ rides }: RideHistoryListProps) {
  const defaultRides: RideHistory[] = [
    {
      id: '1',
      passengerName: 'Alice Johnson',
      from: 'Kigali',
      to: 'Huye',
      date: '2024-01-15',
      time: '08:30 AM',
      earnings: 8000,
      rating: 5,
    },
    {
      id: '2',
      passengerName: 'Bob Smith',
      from: 'Kigali',
      to: 'Gitarama',
      date: '2024-01-14',
      time: '02:00 PM',
      earnings: 5000,
      rating: 4,
    },
  ];

  const rideList = rides || defaultRides;

  return (
    <div className="space-y-3">
      {rideList.map((ride) => (
        <Card key={ride.id} className="border-2 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold mb-2">{ride.passengerName}</p>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {ride.from} → {ride.to}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {ride.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {ride.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-600">{ride.earnings.toLocaleString()} RWF</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  ⭐ {ride.rating}.0
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
