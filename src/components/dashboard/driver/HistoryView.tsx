import { RideHistoryList } from './RideHistoryList';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { History, Filter, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';

interface RideHistory {
  id: string;
  date: string;
  passengerName: string;
  pickupLocation: string;
  destination: string;
  fare: number;
  distance: string;
  duration: string;
  rating: number;
  status: 'completed' | 'cancelled';
  from: string;
  to: string;
  time: string;
  earnings: number;
}

const mockRideHistory: RideHistory[] = [
  {
    id: 'R001',
    date: '2025-12-17 10:30 AM',
    passengerName: 'John Doe',
    pickupLocation: 'Kigali Airport',
    destination: 'City Center',
    fare: 5000,
    distance: '12 km',
    duration: '25 mins',
    rating: 5,
    status: 'completed',
    from: 'Kigali Airport',
    to: 'City Center',
    time: '10:30 AM',
    earnings: 5000,
  },
  {
    id: 'R002',
    date: '2025-12-16 03:15 PM',
    passengerName: 'Jane Smith',
    pickupLocation: 'Kimironko',
    destination: 'Remera',
    fare: 3500,
    distance: '8 km',
    duration: '18 mins',
    rating: 4,
    status: 'completed',
    from: 'Kimironko',
    to: 'Remera',
    time: '03:15 PM',
    earnings: 3500,
  },
  {
    id: 'R003',
    date: '2025-12-15 08:00 AM',
    passengerName: 'Alice Johnson',
    pickupLocation: 'Nyarutarama',
    destination: 'Downtown',
    fare: 4000,
    distance: '10 km',
    duration: '22 mins',
    rating: 5,
    status: 'completed',
    from: 'Nyarutarama',
    to: 'Downtown',
    time: '08:00 AM',
    earnings: 4000,
  },
  {
    id: 'R004',
    date: '2025-12-14 02:30 PM',
    passengerName: 'Bob Wilson',
    pickupLocation: 'Kacyiru',
    destination: 'Airport',
    fare: 6500,
    distance: '15 km',
    duration: '30 mins',
    rating: 3,
    status: 'cancelled',
    from: 'Kacyiru',
    to: 'Airport',
    time: '02:30 PM',
    earnings: 0,
  },
];

export function HistoryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');

  const filteredHistory = mockRideHistory.filter((ride) => {
    const matchesSearch =
      ride.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || ride.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockRideHistory.length,
    completed: mockRideHistory.filter((r) => r.status === 'completed').length,
    cancelled: mockRideHistory.filter((r) => r.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Ride History</h2>
        <Badge className="bg-blue-500 text-white px-3 py-1 flex items-center gap-2">
          <History className="w-4 h-4" />
          {stats.total} Total Rides
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by passenger, location, or ride ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : ''
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('completed')}
              className={
                filterStatus === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : ''
              }
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('cancelled')}
              className={
                filterStatus === 'cancelled'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : ''
              }
            >
              Cancelled
            </Button>
          </div>
        </div>
      </Card>

      {/* Ride History List */}
      <RideHistoryList rides={filteredHistory} />

      {filteredHistory.length === 0 && (
        <Card className="p-12 text-center">
          <History className="w-16 h-16 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">No rides found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </Card>
      )}
    </div>
  );
}
