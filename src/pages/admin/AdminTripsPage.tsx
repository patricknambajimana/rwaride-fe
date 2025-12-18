import { useGetAdminTripsQuery, useCancelTripMutation } from '../../services/api/adminApi';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { toast } from 'sonner';
import { MapPin, Clock, Users, DollarSign, X } from 'lucide-react';

export function AdminTripsPage() {
  const { data: trips, isLoading } = useGetAdminTripsQuery();
  const [cancelTrip] = useCancelTripMutation();

  const handleCancel = async (tripId: string) => {
    if (window.confirm('Are you sure you want to cancel this trip?')) {
      try {
        await cancelTrip(tripId).unwrap();
        toast.success('Trip cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel trip');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rides Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all rides on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total Rides</div>
          <div className="text-2xl font-bold text-gray-900">{trips?.length || 0}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl font-bold text-green-600">{trips?.filter(t => t.status === 'active').length || 0}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-blue-600">{trips?.filter(t => t.status === 'completed').length || 0}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{trips?.filter(t => t.status === 'cancelled').length || 0}</div>
        </Card>
      </div>

      {/* Trips List */}
      <Card className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : trips && trips.length > 0 ? (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Route Info */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                      <div>
                        <div className="text-sm text-gray-600">Route</div>
                        <div className="font-medium text-gray-900">{trip.origin}</div>
                        <div className="text-sm text-gray-600">→ {trip.destination}</div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Departure
                        </div>
                        <div className="font-medium text-gray-900">
                          {new Date(trip.departure_time).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Seats
                        </div>
                        <div className="font-medium text-gray-900">
                          {trip.available_seats}/{trip.total_seats}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Price
                        </div>
                        <div className="font-medium text-gray-900">
                          RWF {trip.price_per_seat}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{trip.driver_name}</span>
                    </div>
                    {trip.status === 'active' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancel(trip.id)}
                        className="gap-1"
                      >
                        <X className="w-4 h-4" />
                        Cancel Trip
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No trips found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
