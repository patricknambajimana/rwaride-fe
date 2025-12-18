import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { TrendingUp, DollarSign, Star, Users } from 'lucide-react';

export interface DriverStats {
  totalPassengers?: number;
  totalEarnings?: number;
  totalTrips?: number;
  totalRate?: number;
}

interface DriverStatsOverviewProps {
  stats?: DriverStats;
  onViewDetails?: () => void;
}

export function DriverStatsOverview({
  stats = {
    totalPassengers: 342,
    totalEarnings: 45200,
    totalTrips: 247,
    totalRate: 4.8,
  },
  onViewDetails,
}: DriverStatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Passengers */}
      <Card className="hover:shadow-lg transition-shadow border-2 bg-linear-to-br from-purple-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Passengers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPassengers || 0}</p>
              <p className="text-xs text-purple-600 mt-2">this month</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Earnings */}
      <Card className="hover:shadow-lg transition-shadow border-2 bg-linear-to-br from-blue-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Earnings (RWF)</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEarnings?.toLocaleString() || 0}</p>
              <p className="text-xs text-blue-600 mt-2">↑ +8% from last month</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Trips */}
      <Card className="hover:shadow-lg transition-shadow border-2 bg-linear-to-br from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Trips</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTrips || 0}</p>
              <p className="text-xs text-green-600 mt-2">↑ +12% this month</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Rate */}
      <Card className="hover:shadow-lg transition-shadow border-2 bg-linear-to-br from-yellow-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalRate || 0}</p>
              <p className="text-xs text-yellow-600 mt-2">★★★★★ from 127 reviews</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

