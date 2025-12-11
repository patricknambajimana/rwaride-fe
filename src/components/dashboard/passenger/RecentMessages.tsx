import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

interface Message {
  id: string;
  driver_name: string;
  message: string;
  timestamp: string;
  unread?: boolean;
}

interface Props {
  messages: Message[];
}

export function RecentMessages({ messages }: Props) {
  if (!messages || messages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-500 py-6 text-sm">
          No messages yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Recent Messages</CardTitle>
          <a href="#" className="text-xs text-blue-600 hover:underline">
            See All
          </a>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2 pb-3 border-b last:border-b-0">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="text-xs">{msg.driver_name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <p className="text-xs font-semibold truncate">{msg.driver_name}</p>
                {msg.unread && <Badge className="text-xs">New</Badge>}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
