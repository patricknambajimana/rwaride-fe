import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';

export function AdminDisputesPage() {
  // Mock data - replace with real API when available
  const disputes = [
    {
      id: '1',
      title: 'Driver cancelled at last minute',
      complainant: 'Jane Doe',
      defendant: 'John Driver',
      status: 'open',
      severity: 'high',
      createdAt: '2024-12-15',
      description: 'Driver cancelled the trip after I waited 10 minutes',
    },
    {
      id: '2',
      title: 'Passenger did not show up',
      complainant: 'Mike Driver',
      defendant: 'Sarah Passenger',
      status: 'open',
      severity: 'medium',
      createdAt: '2024-12-14',
      description: 'Passenger booked the ride but did not appear at pickup location',
    },
    {
      id: '3',
      title: 'Unsafe driving behavior',
      complainant: 'Alice Passenger',
      defendant: 'Tom Driver',
      status: 'resolved',
      severity: 'high',
      createdAt: '2024-12-13',
      description: 'Driver was speeding and driving recklessly',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResolve = (id: string) => {
    console.log('Resolved dispute:', id);
  };

  const handleClose = (id: string) => {
    console.log('Closed dispute:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Disputes & Reports</h1>
        <p className="text-gray-600 mt-1">Handle complaints and disputes between users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total Disputes</div>
          <div className="text-2xl font-bold text-gray-900">{disputes.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Open Cases</div>
          <div className="text-2xl font-bold text-orange-600">
            {disputes.filter(d => d.status === 'open').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Resolved</div>
          <div className="text-2xl font-bold text-green-600">
            {disputes.filter(d => d.status === 'resolved').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">High Severity</div>
          <div className="text-2xl font-bold text-red-600">
            {disputes.filter(d => d.severity === 'high').length}
          </div>
        </Card>
      </div>

      {/* Disputes List */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Disputes</h2>
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{dispute.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dispute.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getSeverityColor(dispute.severity)}>
                    {dispute.severity} severity
                  </Badge>
                  <Badge className={getStatusColor(dispute.status)}>
                    {dispute.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Complainant</p>
                    <p className="text-sm font-medium text-gray-900">{dispute.complainant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Defendant</p>
                    <p className="text-sm font-medium text-gray-900">{dispute.defendant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Reported</p>
                    <p className="text-sm font-medium text-gray-900">{dispute.createdAt}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {dispute.status === 'open' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleResolve(dispute.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClose(dispute.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message Parties
                      </Button>
                    </>
                  )}
                  {dispute.status === 'resolved' && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolved
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
