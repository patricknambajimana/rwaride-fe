import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { useGetAdminUsersQuery, useSuspendUserMutation, useActivateUserMutation } from '../../../services/api/adminApi';
import { Users, Ban, CheckCircle, Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export function AdminUsersView() {
  const { data: users, isLoading, error } = useGetAdminUsersQuery();
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [activateUser, { isLoading: isActivating }] = useActivateUserMutation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuspend = async (userId: string, userName: string) => {
    try {
      await suspendUser(userId).unwrap();
      toast.success('User suspended', { description: `${userName} has been suspended` });
    } catch (error: any) {
      toast.error('Failed to suspend user', { description: error?.data?.message || 'Please try again' });
    }
  };

  const handleActivate = async (userId: string, userName: string) => {
    try {
      await activateUser(userId).unwrap();
      toast.success('User activated', { description: `${userName} has been activated` });
    } catch (error: any) {
      toast.error('Failed to activate user', { description: error?.data?.message || 'Please try again' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-600 mt-1">Manage all users on the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">
            {users?.length || 0} Total Users
          </Badge>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load users. Please try again.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers?.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${
                      user.role === 'driver' 
                        ? 'border-blue-200 text-blue-700 bg-blue-50'
                        : user.role === 'passenger'
                        ? 'border-green-200 text-green-700 bg-green-50'
                        : 'border-purple-200 text-purple-700 bg-purple-50'
                    }`}>
                      {user.role}
                    </Badge>
                    
                    <Badge className={`${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : user.status === 'suspended'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    {user.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuspend(user.id, user.name)}
                        disabled={isSuspending}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActivate(user.id, user.name)}
                        disabled={isActivating}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
