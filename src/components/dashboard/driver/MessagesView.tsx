import { useState } from 'react';
import { Card } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { MessageSquare, Send, Search } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isDriver: boolean;
}

interface Conversation {
  id: string;
  passengerName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    passengerName: 'John Doe',
    lastMessage: 'Thanks for the ride!',
    timestamp: '2 mins ago',
    unreadCount: 2,
  },
  {
    id: '2',
    passengerName: 'Jane Smith',
    lastMessage: 'On my way',
    timestamp: '1 hour ago',
    unreadCount: 0,
  },
  {
    id: '3',
    passengerName: 'Alice Johnson',
    lastMessage: 'See you soon',
    timestamp: '3 hours ago',
    unreadCount: 1,
  },
];

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.passengerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Send message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
        <Badge className="bg-red-500 text-white px-3 py-1">
          {mockConversations.reduce((sum, c) => sum + c.unreadCount, 0)} Unread
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-4 h-[600px]">
        {/* Conversations List */}
        <Card className="p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation === conv.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      {conv.passengerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{conv.passengerName}</p>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs ml-2">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs truncate ${selectedConversation === conv.id ? 'text-white/90' : 'text-gray-500'}`}>
                      {conv.lastMessage}
                    </p>
                    <p className={`text-xs mt-1 ${selectedConversation === conv.id ? 'text-white/75' : 'text-gray-400'}`}>
                      {conv.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 p-4 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="border-b pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      {mockConversations.find(c => c.id === selectedConversation)?.passengerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {mockConversations.find(c => c.id === selectedConversation)?.passengerName}
                    </p>
                    <p className="text-xs text-gray-500">Active now</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                    <p className="text-sm">Hello! I'm on my way to pick you up.</p>
                    <p className="text-xs text-white/75 mt-1">10:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-xs">
                    <p className="text-sm text-gray-900">Great! I'll be waiting outside.</p>
                    <p className="text-xs text-gray-500 mt-1">10:31 AM</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-3" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
