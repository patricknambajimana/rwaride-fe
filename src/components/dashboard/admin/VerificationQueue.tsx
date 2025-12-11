import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  MessageCircle,
  Eye,
} from "lucide-react";

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  userType: "driver" | "passenger";
  documentType: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  notes?: string;
}

interface VerificationQueueProps {
  requests: VerificationRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  onViewDetails?: (id: string) => void;
}

export function VerificationQueue({
  requests,
  onApprove,
  onReject,
  onViewDetails,
}: VerificationQueueProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
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
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  if (!requests || requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p className="text-lg font-medium">All verified!</p>
          <p className="text-sm mt-1">No pending verifications</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                  <AvatarImage src={request.userImage} alt={request.userName} />
                  <AvatarFallback>{request.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base truncate">
                    {request.userName}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {request.userType.toUpperCase()} • {request.documentType}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {getStatusIcon(request.status)}
                <span className="ml-1">
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
              </Badge>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
              <div>
                <p className="text-xs text-gray-600">Submitted</p>
                <p className="font-medium">{getDaysAgo(request.submissionDate)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Document</p>
                <p className="font-medium truncate">{request.documentType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-medium capitalize">{request.userType}</p>
              </div>
            </div>

            {/* Rejection reason or notes */}
            {request.reason && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-semibold text-red-800 mb-1">
                  Rejection Reason
                </p>
                <p className="text-xs text-red-700">{request.reason}</p>
              </div>
            )}

            {request.notes && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-1">Notes</p>
                <p className="text-xs text-blue-700">{request.notes}</p>
              </div>
            )}

            {/* Actions */}
            {request.status === "pending" && (
              <div className="flex gap-2 pt-4 border-t flex-wrap">
                {onViewDetails && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(request.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                )}
                {onReject && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      onReject(request.id, "Document verification failed")
                    }
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                )}
                {onApprove && (
                  <Button
                    size="sm"
                    onClick={() => onApprove(request.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
