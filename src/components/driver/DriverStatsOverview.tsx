import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Calendar, Clock, Users, DollarSign, TrendingUp } from "lucide-react";

export interface DriverStats {
  totalRides: number;
  totalEarnings: number;
  averageRating: number;
  acceptanceRate: number;
  cancellationRate: number;
  thisMonthEarnings: number;
  thisMonthRides: number;
  completionRate: number;
}

interface StatsOverviewProps {
  stats: DriverStats;
  onViewDetails?: () => void;
}

export function DriverStatsOverview({ stats, onViewDetails }: StatsOverviewProps) {
  const getEarningsColor = () => {
    if (stats.thisMonthEarnings >= 1000) return "text-green-600";
    if (stats.thisMonthEarnings >= 500) return "text-blue-600";
    return "text-gray-600";
  };

  const getTrendIcon = () => {
    if (stats.thisMonthEarnings > stats.totalEarnings / 12) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Rides */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Total Rides</p>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalRides}</p>
            <p className="text-xs text-gray-500">
              {stats.thisMonthRides} this month
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Earnings */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Total Earnings</p>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              ${stats.totalEarnings.toLocaleString()}
            </p>
            <p className={`text-xs font-semibold flex items-center gap-1 ${getEarningsColor()}`}>
              ${stats.thisMonthEarnings} this month
              {getTrendIcon()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Rating</p>
              <span className="text-lg">★</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.averageRating.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">
              {stats.completionRate}% completion rate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">Performance</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Acceptance</span>
                <Badge variant="secondary">{stats.acceptanceRate}%</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Completion</span>
                <Badge variant="secondary">{stats.completionRate}%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
