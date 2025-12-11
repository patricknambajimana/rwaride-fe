import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { BarChart, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalRides: number;
  completedRides: number;
  totalRevenue: number;
  platformFeeRevenue: number;
  averageRating: number;
  systemHealth: "healthy" | "warning" | "critical";
  pendingVerifications: number;
  reportedIssues: number;
}

interface AdminStatsOverviewProps {
  stats: SystemStats;
}

export function AdminStatsOverview({ stats }: AdminStatsOverviewProps) {
  const getHealthColor = () => {
    switch (stats.systemHealth) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthIcon = () => {
    switch (stats.systemHealth) {
      case "healthy":
        return "✓";
      case "warning":
        return "⚠";
      case "critical":
        return "✕";
      default:
        return "?";
    }
  };

  const completionRate = (
    (stats.completedRides / stats.totalRides) *
    100
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Users */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {stats.activeUsers} active today
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              ${stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Platform fee: ${stats.platformFeeRevenue.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Rides Completed */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Rides</p>
              <BarChart className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{stats.totalRides.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {completionRate}% completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">System</p>
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <Badge className={`${getHealthColor()} w-full justify-center`}>
              {getHealthIcon()} {stats.systemHealth.toUpperCase()}
            </Badge>
            <p className="text-xs text-gray-500 text-center">
              {stats.pendingVerifications} verifications pending
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
