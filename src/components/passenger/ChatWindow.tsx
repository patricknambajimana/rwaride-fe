import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

interface ChatWindowProps {
  chatId: string;
  recipientName: string;
  recipientId: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  loading?: boolean;
}

export function ChatWindow({
  chatId,
  recipientName,
  recipientId,
  messages,
  onSendMessage,
  onClose,
  loading = false,
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState("");
  const [sortedMessages, setSortedMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setSortedMessages([...messages].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ));
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-full max-h-screen md:max-h-[600px] w-full">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <div>
          <CardTitle className="text-lg">{recipientName}</CardTitle>
          <p className="text-xs text-gray-600 mt-1">Chat ID: {chatId}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {sortedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            sortedMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isOwn ? "justify-end" : "justify-start"}`}
              >
                {!msg.isOwn && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.isOwn
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isOwn ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <CardContent className="border-t p-4 space-y-3">
        <div className="flex gap-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !messageText.trim()}
            size="icon"
            className="h-10 w-10 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600">
          Press Enter to send • Shift+Enter for new line
        </p>
      </CardContent>
    </Card>
  );
}
