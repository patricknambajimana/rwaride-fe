import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Star } from 'lucide-react';

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface ProfileTabProps {
  user: User;
  totalTrips: number;
  averageRating: string | number;
}

export function ProfileTab({ user, totalTrips, averageRating }: ProfileTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl">{user.name?.[0] || 'D'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <Badge>Driver</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span>Rating: {averageRating}</span>
          </div>
          <div className="text-gray-600 space-y-1">
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {user.phone || 'Not provided'}
            </p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Trips:</span> {totalTrips}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
