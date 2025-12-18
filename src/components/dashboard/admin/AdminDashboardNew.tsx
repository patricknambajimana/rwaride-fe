import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { AdminStatsOverview, SystemStats } from "./AdminStatsOverview";
import { UserManagement, AdminUser } from "./UserManagement";
import { DisputeManagement, Dispute } from "./DisputeManagement";
import { VerificationQueue, VerificationRequest } from "./VerificationQueue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import { Loader, AlertCircle } from "lucide-react";
import {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminTripsQuery,
  useGetAdminBookingsQuery,
} from "../../../services/api/adminApi";
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export function AdminDashboardNew() {
  // API hooks
  const { data: statsData, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: usersData = [], isLoading: usersLoading } = useGetAdminUsersQuery();
  const { data: tripsData = [] } = useGetAdminTripsQuery();
  const { data: bookingsData = [] } = useGetAdminBookingsQuery();

  // Local state for UI
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);

  // User Management Handlers - These would typically call mutation hooks
  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
    // TODO: Call suspend mutation
  };

  const handleBanUser = (userId: string) => {
    console.log('Banning user:', userId);
    // TODO: Call ban mutation
  };

  const handleRemoveWarning = (userId: string) => {
    console.log('Removing warning for user:', userId);
    // TODO: Call remove warning mutation
  };

  // Dispute Handlers
  const handleResolveDispute = (disputeId: string, resolution: string) => {
    setDisputes(
      disputes.map((d) =>
        d.id === disputeId
          ? { ...d, status: "resolved" as const, resolution }
          : d
      )
    );
  };

  const handleCloseDispute = (disputeId: string) => {
    setDisputes(
      disputes.map((d) =>
        d.id === disputeId ? { ...d, status: "closed" as const } : d
      )
    );
  };

  const handleAddDisputeMessage = (disputeId: string, message: string) => {
    setDisputes(
      disputes.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              messages: [
                ...d.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderType: "admin" as const,
                  senderName: "Admin Support",
                  message,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : d
      )
    );
  };

  // Verification Handlers
  const handleApproveVerification = (verificationId: string) => {
    setVerifications(
      verifications.map((v) =>
        v.id === verificationId ? { ...v, status: "approved" as const } : v
      )
    );
  };

  const handleRejectVerification = (
    verificationId: string,
    reason: string
  ) => {
    setVerifications(
      verifications.map((v) =>
        v.id === verificationId
          ? { ...v, status: "rejected" as const, reason }
          : v
      )
    );
  };

  // Count pending items
  const pendingVerifications = verifications.filter(
    (v) => v.status === "pending"
  ).length;
  const openDisputes = disputes.filter((d) => d.status === "open").length;
  const suspendedUsers = usersData.filter((u: any) => u.status === "suspended").length;

  // Loading state
  if (statsLoading || usersLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="flex gap-2 flex-wrap">
            {openDisputes > 0 && (
              <Badge className="bg-red-100 text-red-800 px-3 py-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {openDisputes} Open Dispute{openDisputes > 1 ? "s" : ""}
              </Badge>
            )}
            {pendingVerifications > 0 && (
              <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                {pendingVerifications} Pending Verification
              </Badge>
            )}
            {suspendedUsers > 0 && (
              <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {suspendedUsers} Suspended User{suspendedUsers > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        {statsData && (
          <AdminStatsOverview 
            stats={{
              totalUsers: statsData.totalUsers,
              activeUsers: 0,
              totalRides: statsData.totalTrips,
              completedRides: 0,
              totalRevenue: statsData.totalRevenue,
              platformFeeRevenue: 0,
              averageRating: 0,
              systemHealth: "healthy" as const,
              pendingVerifications: statsData.pendingVerifications,
              reportedIssues: 0,
            }} 
          />
        )}

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="disputes" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Disputes</span>
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Verify</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Total Users:</strong> {statsData?.totalUsers || 0}
              </p>
            </div>
            <UserManagement
              users={usersData as any[]}
              onSuspend={handleSuspendUser}
              onBan={handleBanUser}
              onRemoveWarning={handleRemoveWarning}
            />
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-900">
                <strong>Total Disputes:</strong> {disputes.length} ({openDisputes} open)
              </p>
            </div>
            <DisputeManagement
              disputes={disputes}
              onResolve={handleResolveDispute}
              onClose={handleCloseDispute}
              onAddMessage={handleAddDisputeMessage}
            />
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>Verification Requests:</strong> {verifications.length} (
                {pendingVerifications} pending)
              </p>
            </div>
            <VerificationQueue
              requests={verifications}
              onApprove={handleApproveVerification}
              onReject={handleRejectVerification}
            />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Stats */}
              <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Total Users
                </p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  {(statsData?.totalUsers || 0).toLocaleString()}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  {statsData?.totalDrivers || 0} drivers, {statsData?.totalPassengers || 0} passengers
                </p>
              </div>

              <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-green-900 mb-2">
                  Revenue This Month
                </p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  ${(statsData?.totalRevenue || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Platform revenue
                </p>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  Total Trips
                </p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">
                  {(statsData?.totalTrips || 0).toLocaleString()}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  {statsData?.activeTrips || 0} currently active
                </p>
              </div>

              <div className="bg-linear-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-yellow-900 mb-2">
                  Total Bookings
                </p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                  {(statsData?.totalBookings || 0).toLocaleString()}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  {statsData?.pendingVerifications || 0} pending verifications
                </p>
              </div>
            </div>

            {/* Detailed Report */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                System Health Report
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-700">Total Users</span>
                  <span className="font-semibold">{statsData?.totalUsers || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-700">Total Drivers</span>
                  <span className="font-semibold">{statsData?.totalDrivers || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-700">Active Trips</span>
                  <span className="font-semibold text-green-600">
                    {statsData?.activeTrips || 0}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
