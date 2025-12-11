import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
import {
  Search,
  Ban,
  CheckCircle,
  AlertCircle,
  Star,
  Clock,
  Shield,
  Trash2,
} from "lucide-react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: "passenger" | "driver";
  image?: string;
  status: "active" | "suspended" | "banned";
  rating: number;
  joinDate: string;
  totalRides: number;
  warnings: number;
  verified: boolean;
}

interface UserManagementProps {
  users: AdminUser[];
  onSuspend?: (id: string) => void;
  onBan?: (id: string) => void;
  onRemoveWarning?: (id: string) => void;
  onVerify?: (id: string) => void;
}

export function UserManagement({
  users,
  onSuspend,
  onBan,
  onRemoveWarning,
  onVerify,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "driver" | "passenger">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "suspended" | "banned"
  >("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"suspend" | "ban" | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.userType === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "suspended":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "banned":
        return <Ban className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const days = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return "Today";
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  const handleActionConfirm = () => {
    if (!selectedUser) return;

    if (actionType === "suspend" && onSuspend) {
      onSuspend(selectedUser.id);
    } else if (actionType === "ban" && onBan) {
      onBan(selectedUser.id);
    }

    setActionDialogOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 text-sm"
                />
              </div>
            </div>

            {/* Role Filter */}
            <Select
              value={filterRole}
              onValueChange={(value: any) => setFilterRole(value)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="passenger">Passengers</SelectItem>
                <SelectItem value="driver">Drivers</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={filterStatus}
              onValueChange={(value: any) => setFilterStatus(value)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No users found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm md:text-base truncate">
                          {user.name}
                        </p>
                        {user.verified && (
                          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(user.status)}>
                    {getStatusIcon(user.status)}
                    <span className="ml-1 capitalize">{user.status}</span>
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4 text-xs md:text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-semibold capitalize">{user.userType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rating</p>
                    <div className="flex items-center gap-1 font-semibold">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                      <span>{user.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Rides</p>
                    <p className="font-semibold">{user.totalRides}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Member</p>
                    <p className="font-semibold">{getDaysAgo(user.joinDate)}</p>
                  </div>
                  {user.warnings > 0 && (
                    <div>
                      <p className="text-gray-600">Warnings</p>
                      <p className="font-semibold text-red-600">{user.warnings}</p>
                    </div>
                  )}
                </div>

                {/* Warnings Alert */}
                {user.warnings > 0 && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-semibold text-red-800">
                        {user.warnings} active warning{user.warnings > 1 ? "s" : ""}
                      </p>
                      <p className="text-red-700 mt-1">
                        User has violated community guidelines
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t flex-wrap">
                  {user.status === "active" && (
                    <>
                      {onRemoveWarning && user.warnings > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRemoveWarning(user.id)}
                          className="flex-1 text-xs"
                        >
                          Clear Warning
                        </Button>
                      )}
                      {onSuspend && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("suspend");
                            setActionDialogOpen(true);
                          }}
                          className="flex-1 text-xs"
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                      {onBan && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("ban");
                            setActionDialogOpen(true);
                          }}
                          className="flex-1 text-xs"
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          Ban
                        </Button>
                      )}
                    </>
                  )}
                  {user.status === "suspended" && onBan && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setActionType("ban");
                        setActionDialogOpen(true);
                      }}
                      className="flex-1 text-xs"
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Ban Permanently
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Action Confirmation Dialog */}
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "suspend" ? "Suspend User?" : "Ban User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "suspend"
                ? `Suspending ${selectedUser?.name} will temporarily disable their account. They can be reactivated later.`
                : `Banning ${selectedUser?.name} is permanent. This user will no longer be able to access the platform.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActionConfirm}
              className={actionType === "ban" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {actionType === "suspend" ? "Suspend" : "Ban"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
