import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { TrendingUp, DollarSign, Star, Users } from 'lucide-react';
import { useGetDriverStatsQuery } from '../../../services/api/driverApi';
import { useGetDriverRidesQuery } from '../../../services/api/ridesApi';
import { Loader } from 'lucide-react';

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
  stats,
  onViewDetails,
}: DriverStatsOverviewProps) {
  // Fetch real data from API
  const { data: apiStats, isLoading: statsLoading } = useGetDriverStatsQuery();
  const { data: driverTrips = [], isLoading: tripsLoading } = useGetDriverRidesQuery();

  // Use API data if available, otherwise fall back to props
  const displayStats = {
    totalPassengers: stats?.totalPassengers ?? apiStats?.totalRides ?? 0,
    totalEarnings: stats?.totalEarnings ?? apiStats?.totalEarnings ?? 0,
    totalTrips: driverTrips.length ?? stats?.totalTrips ?? apiStats?.totalRides ?? 0,
    totalRate: stats?.totalRate ?? apiStats?.averageRating ?? 0,
  };

  const isLoading = statsLoading || tripsLoading;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-24">
                <Loader className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Passengers */}
      <Card className="hover:shadow-lg transition-shadow border-2 bg-linear-to-br from-purple-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Passengers</p>
              <p className="text-3xl font-bold text-gray-900">{displayStats.totalPassengers}</p>
              <p className="text-xs text-purple-600 mt-2">all time</p>
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
              <p className="text-3xl font-bold text-gray-900">{displayStats.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-2">all time earnings</p>
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
              <p className="text-3xl font-bold text-gray-900">{displayStats.totalTrips}</p>
              <p className="text-xs text-green-600 mt-2">{driverTrips.length} trips created</p>
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
              <p className="text-3xl font-bold text-gray-900">{displayStats.totalRate.toFixed(1)}</p>
              <p className="text-xs text-yellow-600 mt-2">★★★★★ from reviews</p>
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

