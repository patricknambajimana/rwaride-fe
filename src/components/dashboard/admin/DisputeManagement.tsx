import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../../ui/alert-dialog";
import { useState } from "react";
import {
  AlertTriangle,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  DollarSign,
} from "lucide-react";

export interface DisputeMessage {
  id: string;
  senderType: "reporter" | "defendant" | "admin";
  senderName: string;
  message: string;
  timestamp: string;
}

export interface Dispute {
  id: string;
  reporterName: string;
  reporterImage?: string;
  defendantName: string;
  defendantImage?: string;
  category: string;
  amount?: number;
  description: string;
  status: "open" | "investigating" | "resolved" | "closed";
  createdDate: string;
  messages: DisputeMessage[];
  resolution?: string;
}

interface DisputeManagementProps {
  disputes: Dispute[];
  onResolve?: (id: string, resolution: string) => void;
  onClose?: (id: string) => void;
  onAddMessage?: (id: string, message: string) => void;
}

export function DisputeManagement({
  disputes,
  onResolve,
  onClose,
  onAddMessage,
}: DisputeManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "open" | "investigating" | "resolved" | "closed"
  >("all");
  const [expandedDisputeId, setExpandedDisputeId] = useState<string | null>(
    null
  );
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [resolutionDialogOpen, setResolutionDialogOpen] = useState(false);
  const [resolutionText, setResolutionText] = useState("");

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.defendantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || dispute.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "investigating":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
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

  const handleResolve = (disputeId: string) => {
    if (!resolutionText.trim()) return;

    if (onResolve) {
      onResolve(disputeId, resolutionText);
    }

    setResolutionDialogOpen(false);
    setResolutionText("");
    setSelectedDispute(null);
  };

  const handleSendMessage = (disputeId: string) => {
    if (!messageInput.trim()) return;

    if (onAddMessage) {
      onAddMessage(disputeId, messageInput);
    }

    setMessageInput("");
  };

  if (!filteredDisputes || filteredDisputes.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p className="text-lg font-medium">No disputes found</p>
          <p className="text-sm mt-1">All clear!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 text-sm"
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value: any) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-full md:w-40 h-9 text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disputes List */}
      <div className="space-y-3">
        {filteredDisputes.map((dispute) => (
          <Card
            key={dispute.id}
            className="hover:shadow-md transition-shadow overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Main Content */}
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-sm md:text-base">
                        {dispute.category}
                      </h3>
                      <Badge className={getStatusColor(dispute.status)}>
                        {getStatusIcon(dispute.status)}
                        <span className="ml-1 capitalize">{dispute.status}</span>
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                      {dispute.description}
                    </p>
                  </div>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage
                        src={dispute.reporterImage}
                        alt={dispute.reporterName}
                      />
                      <AvatarFallback>
                        {dispute.reporterName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-xs">
                      <p className="text-gray-600">Reporter</p>
                      <p className="font-semibold truncate">
                        {dispute.reporterName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage
                        src={dispute.defendantImage}
                        alt={dispute.defendantName}
                      />
                      <AvatarFallback>
                        {dispute.defendantName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-xs">
                      <p className="text-gray-600">Defendant</p>
                      <p className="font-semibold truncate">
                        {dispute.defendantName}
                      </p>
                    </div>
                  </div>
                  {dispute.amount && (
                    <div className="text-xs">
                      <p className="text-gray-600">Amount</p>
                      <p className="font-semibold flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {dispute.amount.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-xs">
                  <p className="text-gray-600">
                    Opened {getDaysAgo(dispute.createdDate)}
                  </p>
                  <p className="text-gray-600">
                    {dispute.messages.length} message
                    {dispute.messages.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    setExpandedDisputeId(
                      expandedDisputeId === dispute.id ? null : dispute.id
                    )
                  }
                  className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-blue-900">
                      {expandedDisputeId === dispute.id
                        ? "Hide Details"
                        : "View Details"}
                    </span>
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                </button>
              </div>

              {/* Expanded Details */}
              {expandedDisputeId === dispute.id && (
                <div className="border-t bg-gray-50 p-4 md:p-6 space-y-4">
                  {/* Messages */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Conversation</h4>
                    <div className="space-y-3 max-h-80 overflow-y-auto mb-4 p-3 bg-white rounded-lg border">
                      {dispute.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`text-xs p-2 rounded-lg ${
                            msg.senderType === "admin"
                              ? "bg-blue-100 border-l-2 border-blue-500"
                              : msg.senderType === "reporter"
                                ? "bg-gray-100 ml-6"
                                : "bg-gray-100 mr-6 text-right"
                          }`}
                        >
                          <p className="font-semibold text-gray-900">
                            {msg.senderName}
                          </p>
                          <p className="text-gray-700 mt-1">{msg.message}</p>
                          <p className="text-gray-500 mt-1 text-xs">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Add Message */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add admin message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(dispute.id);
                          }
                        }}
                        className="h-8 text-xs"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSendMessage(dispute.id)}
                        className="h-8"
                      >
                        Send
                      </Button>
                    </div>
                  </div>

                  {/* Resolution Section */}
                  {dispute.status !== "closed" && (
                    <div className="flex gap-2 pt-4 border-t flex-wrap">
                      {dispute.status !== "resolved" && onResolve && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedDispute(dispute);
                            setResolutionDialogOpen(true);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                      {onClose && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onClose(dispute.id)}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Close
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Resolution Display */}
                  {dispute.resolution && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs font-semibold text-green-800 mb-1">
                        Resolution
                      </p>
                      <p className="text-xs text-green-700">{dispute.resolution}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resolution Dialog */}
      <AlertDialog
        open={resolutionDialogOpen}
        onOpenChange={setResolutionDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve Dispute</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the resolution details for this dispute.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <textarea
              placeholder="Enter resolution details, refund amount, or actions taken..."
              value={resolutionText}
              onChange={(e) => setResolutionText(e.target.value)}
              className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24"
            />
            <div className="grid grid-cols-2 gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  selectedDispute && handleResolve(selectedDispute.id)
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Resolve
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
