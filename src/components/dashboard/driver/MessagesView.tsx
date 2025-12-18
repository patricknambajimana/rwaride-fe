import { useState } from 'react';
import { Card } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { MessageSquare, Send, Search, Loader } from 'lucide-react';
import { useGetChatHistoryQuery, useSendGroupMessageMutation } from '../../../services/api/messageApi';
import { toast } from 'sonner';

export function MessagesView() {
  const [selectedRideId, setSelectedRideId] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: chatMessages = [] } = useGetChatHistoryQuery(
    selectedRideId || 0,
    { skip: !selectedRideId }
  );
  const [sendMessage] = useSendGroupMessageMutation();

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedRideId) {
      try {
        await sendMessage({
          ride_id: selectedRideId,
          content: messageText,
        }).unwrap();
        setMessageText('');
        toast.success('Message sent!');
      } catch (error) {
        toast.error('Failed to send message');
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
        <Badge className="bg-red-500 text-white px-3 py-1">
          {chatMessages.length} Messages
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
            {chatMessages.length > 0 ? (
              chatMessages
                .filter(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedRideId(msg.ride_id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRideId === msg.ride_id
                        ? 'bg-linear-to-r from-green-500 to-blue-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white">
                          {msg.sender_id}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">Ride #{msg.ride_id}</p>
                        <p className={`text-xs truncate ${selectedRideId === msg.ride_id ? 'text-white/90' : 'text-gray-500'}`}>
                          {msg.content}
                        </p>
                        <p className={`text-xs mt-1 ${selectedRideId === msg.ride_id ? 'text-white/75' : 'text-gray-400'}`}>
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No messages yet</p>
              </div>
            )}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 p-4 flex flex-col">
          {selectedRideId ? (
            <>
              {/* Chat Header */}
              <div className="border-b pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white">
                      #{selectedRideId}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Ride #{selectedRideId}</p>
                    <p className="text-xs text-gray-500">Active conversation</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatMessages.length > 0 ? (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender_id === selectedRideId ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs rounded-lg px-4 py-2 ${
                        msg.sender_id === selectedRideId
                          ? 'bg-linear-to-r from-green-500 to-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender_id === selectedRideId ? 'text-white/75' : 'text-gray-500'
                        }`}>
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-sm">No messages in this conversation</p>
                  </div>
                )}
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
                  className="bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-3" />
                <p className="text-lg font-medium">Select a ride to view messages</p>
                <p className="text-sm">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
