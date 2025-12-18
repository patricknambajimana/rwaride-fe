import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { MessageSquare } from 'lucide-react';
import { useGetBookingRequestsQuery } from '../../../services/api/driverApi';

interface Message {
  id: string;
  senderName: string;
  message: string;
  time: string;
  unread?: boolean;
}

interface RecentMessagesProps {
  messages?: Message[];
}

const defaultMessages: Message[] = [
  { id: '1', senderName: 'Alice Johnson', message: 'I am at the pickup point.', time: '2m ago', unread: true },
  { id: '2', senderName: 'John Smith', message: 'Can we start 10 mins earlier?', time: '15m ago', unread: true },
  { id: '3', senderName: 'Martha Wilson', message: 'Thanks for the ride today!', time: '1h ago', unread: false },
  { id: '4', senderName: 'David Brown', message: 'See you at the destination.', time: '2h ago', unread: false },
];

export function RecentMessages({ messages = defaultMessages }: RecentMessagesProps) {
  const { data: bookingRequests, isLoading } = useGetBookingRequestsQuery();

  // Transform booking requests to message format
  const apiMessages = bookingRequests?.map((req) => ({
    id: req.id,
    senderName: req.passengerName,
    message: `Booking request from ${req.fromLocation} to ${req.toLocation}`,
    time: req.requestTime,
    unread: req.status === 'pending',
  })) || [];
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Recent Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
              Loading messages...
            </div>
          ) : apiMessages.length === 0 && messages.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
              No messages yet
            </div>
          ) : (
            (apiMessages.length > 0 ? apiMessages : messages).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="text-xs font-semibold text-blue-700">
                      {msg.senderName.split(' ')[0][0]}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {msg.senderName}
                    </p>
                    {msg.unread && (
                      <Badge variant="default" className="bg-blue-600 text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {msg.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
