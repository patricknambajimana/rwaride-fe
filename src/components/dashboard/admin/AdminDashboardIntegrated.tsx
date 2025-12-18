import { AdminStatsOverview } from "./AdminStatsOverview";
import { UserManagement } from "./UserManagement";
import { DisputeManagement } from "./DisputeManagement";
import { VerificationQueue } from "./VerificationQueue";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Loader, AlertCircle } from "lucide-react";
import {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminTripsQuery,
  useGetAdminBookingsQuery,
} from "../../../services/api/adminApi";

interface AdminDashboardIntegratedProps {
  activeTab?: string;
}

export function AdminDashboardIntegrated({ activeTab = 'overview' }: AdminDashboardIntegratedProps) {
  // Fetch all admin data
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetAdminStatsQuery();
  const { data: users = [], isLoading: usersLoading, error: usersError } = useGetAdminUsersQuery();
  const { data: trips = [], isLoading: tripsLoading, error: tripsError } = useGetAdminTripsQuery();
  const { data: bookings = [], isLoading: bookingsLoading, error: bookingsError } = useGetAdminBookingsQuery();

  // Transform API data to expected format
  const stats = statsData ? {
    totalUsers: statsData.totalUsers,
    activeUsers: statsData.totalUsers - (users?.filter((u: any) => u.status === "suspended").length || 0),
    totalRides: statsData.totalTrips,
    completedRides: trips?.filter((t: any) => t.status === "completed").length || 0,
    totalRevenue: statsData.totalRevenue,
    platformFeeRevenue: statsData.totalRevenue * 0.1,
    averageRating: 4.7,
    systemHealth: "healthy" as const,
    pendingVerifications: statsData.pendingVerifications,
    reportedIssues: statsData.pendingVerifications,
  } : null;

  const isLoading = statsLoading || usersLoading || tripsLoading || bookingsLoading;
  const hasError = statsError || usersError || tripsError || bookingsError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (hasError || !stats) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Failed to load dashboard</p>
              <p className="text-sm text-red-800">Please try refreshing the page</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement users={users as any || []} />;
      case 'verification':
        return <VerificationQueue requests={[]} onApprove={() => {}} onReject={() => {}} />;
      case 'disputes':
        return <DisputeManagement disputes={[]} />;
      case 'trips':
      case 'bookings':
      case 'payments':
      case 'analytics':
        return <AdminStatsOverview stats={stats} />;
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        );
      case 'overview':
      default:
        return <AdminStatsOverview stats={stats} />;
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
}

export default AdminDashboardIntegrated;
