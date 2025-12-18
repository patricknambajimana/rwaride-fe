import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { useVerifyDriverMutation, useGetAdminUsersQuery } from '../../services/api/adminApi';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function AdminVerificationPage() {
  const { data: users = [] } = useGetAdminUsersQuery();
  const [verifyDriver] = useVerifyDriverMutation();
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter users that are pending verification (drivers not yet verified)
  const pendingVerifications = users.filter(
    (user) => user.role === 'driver' && user.status === 'pending'
  );

  const handleApprove = async (driverId: string) => {
    try {
      await verifyDriver(driverId).unwrap();
      toast.success('Driver verification approved');
    } catch (error) {
      toast.error('Failed to verify driver');
    }
  };

  const handleReject = (driverId: string) => {
    setSelectedId(driverId);
    // In a full implementation, you'd send the rejection reason to backend
    toast.info('Rejection reason captured (extend with backend integration)');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Driver Verification</h1>
        <p className="text-gray-600 mt-1">Review and approve pending driver verifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Pending
          </div>
          <div className="text-2xl font-bold text-yellow-600">{pendingVerifications.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Approved
          </div>
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'driver' && u.status === 'active' && u.verified).length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Suspended
          </div>
          <div className="text-2xl font-bold text-red-600">
            {users.filter(u => u.role === 'driver' && u.status === 'suspended').length}
          </div>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Verification Requests</h2>
        {pendingVerifications.length > 0 ? (
          <div className="space-y-4">
            {pendingVerifications.map((driver) => (
              <div key={driver.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-900">{driver.name}</h3>
                      <p className="text-sm text-gray-600">{driver.email}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {driver.phone || 'Not provided'}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Joined:</span> {new Date(driver.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(driver.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(driver.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
            <p className="font-medium">All driver verifications are complete!</p>
            <p className="text-sm">No pending requests at this time.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
