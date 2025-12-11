import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { AdminStatsOverview, SystemStats } from "./AdminStatsOverview";
import { UserManagement, AdminUser } from "./UserManagement";
import { DisputeManagement, Dispute, DisputeMessage } from "./DisputeManagement";
import { VerificationQueue, VerificationRequest } from "./VerificationQueue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import {
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// Mock Data
const MOCK_STATS: SystemStats = {
  totalUsers: 12547,
  activeUsers: 8923,
  totalRides: 45230,
  completedRides: 42105,
  totalRevenue: 128750.5,
  platformFeeRevenue: 12875.05,
  averageRating: 4.7,
  systemHealth: "healthy",
  pendingVerifications: 23,
  reportedIssues: 5,
};

const MOCK_USERS: AdminUser[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0101",
    userType: "driver",
    status: "active",
    rating: 4.8,
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    totalRides: 342,
    warnings: 0,
    verified: true,
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0102",
    userType: "passenger",
    status: "active",
    rating: 4.9,
    joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    totalRides: 87,
    warnings: 0,
    verified: true,
  },
  {
    id: "user-3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1-555-0103",
    userType: "driver",
    status: "suspended",
    rating: 2.1,
    joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    totalRides: 12,
    warnings: 2,
    verified: false,
  },
  {
    id: "user-4",
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "+1-555-0104",
    userType: "passenger",
    status: "active",
    rating: 4.6,
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalRides: 15,
    warnings: 1,
    verified: true,
  },
];

const MOCK_DISPUTES: Dispute[] = [
  {
    id: "dispute-1",
    reporterName: "Sarah Johnson",
    defendantName: "John Smith",
    category: "Lost Item",
    amount: 45.0,
    description:
      "Passenger left phone in vehicle, driver refuses to return it",
    status: "open",
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-1",
        senderType: "reporter",
        senderName: "Sarah Johnson",
        message: "I left my phone in the car after the ride",
        timestamp: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "msg-2",
        senderType: "defendant",
        senderName: "John Smith",
        message: "I didn't find any phone",
        timestamp: new Date(
          Date.now() - 1.5 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ],
  },
  {
    id: "dispute-2",
    reporterName: "Mike Wilson",
    defendantName: "Emily Brown",
    category: "Unfair Rating",
    description: "Driver gave 1-star rating without reason, affecting my record",
    status: "investigating",
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-3",
        senderType: "reporter",
        senderName: "Mike Wilson",
        message: "Why did you rate me 1 star?",
        timestamp: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "msg-4",
        senderType: "admin",
        senderName: "Admin Support",
        message: "We are reviewing this case. Thank you for your patience.",
        timestamp: new Date(
          Date.now() - 4 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ],
  },
];

const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "verify-1",
    userId: "user-1",
    userName: "John Smith",
    userType: "driver",
    documentType: "Driver License",
    submissionDate: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: "pending",
  },
  {
    id: "verify-2",
    userId: "user-3",
    userName: "Mike Wilson",
    userType: "driver",
    documentType: "Insurance Certificate",
    submissionDate: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: "pending",
  },
  {
    id: "verify-3",
    userId: "user-2",
    userName: "Sarah Johnson",
    userType: "passenger",
    documentType: "ID Verification",
    submissionDate: new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: "approved",
  },
];

export function AdminDashboardNew() {
  const [stats, setStats] = useState<SystemStats>(MOCK_STATS);
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [disputes, setDisputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(
    MOCK_VERIFICATION_REQUESTS
  );

  // User Management Handlers
  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "suspended" as const } : u
      )
    );
  };

  const handleBanUser = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "banned" as const } : u
      )
    );
  };

  const handleRemoveWarning = (userId: string) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, warnings: 0 } : u))
    );
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
  const suspendedUsers = users.filter((u) => u.status === "suspended").length;

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
        <AdminStatsOverview stats={stats} />

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
                <strong>Total Users:</strong> {stats.totalUsers} ({stats.activeUsers}{" "}
                active)
              </p>
            </div>
            <UserManagement
              users={users}
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Platform Growth
                </p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  +{Math.round((stats.activeUsers / stats.totalUsers) * 100)}%
                  active users
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-green-900 mb-2">
                  Revenue This Month
                </p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  ${stats.totalRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  {(
                    (stats.platformFeeRevenue / stats.totalRevenue) *
                    100
                  ).toFixed(1)}
                  % platform fee
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  Ride Completion Rate
                </p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600">
                  {(
                    (stats.completedRides / stats.totalRides) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  {stats.completedRides.toLocaleString()} of{" "}
                  {stats.totalRides.toLocaleString()} rides
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
                <p className="text-sm font-semibold text-yellow-900 mb-2">
                  Average Rating
                </p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                  {stats.averageRating.toFixed(1)}/5
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Platform satisfaction score
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
                  <span className="text-gray-700">System Status</span>
                  <Badge className="bg-green-100 text-green-800 capitalize">
                    {stats.systemHealth}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-700">Pending Verifications</span>
                  <span className="font-semibold">{stats.pendingVerifications}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-gray-700">Reported Issues</span>
                  <span className="font-semibold text-red-600">
                    {stats.reportedIssues}
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
