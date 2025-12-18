import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { useUpdateRideStatusMutation } from '@/services/api/driverApi';
import { useDeleteRideMutation } from '@/services/api/ridesApi';
import { toast } from 'sonner';
import { useState } from 'react';

export interface ActiveRide {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  passengers?: number;
  status?: 'active' | 'completed' | 'cancelled';
}

interface ActiveRideCardProps {
  ride?: ActiveRide;
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function ActiveRideCard({
  ride = {
    id: '1',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '08:00 AM',
    seatsAvailable: 3,
    pricePerSeat: 5000,
    passengers: 2,
    status: 'active',
  },
  onStart,
  onComplete,
  onCancel,
}: ActiveRideCardProps) {
  const [updateRideStatus, { isLoading: isUpdating }] = useUpdateRideStatusMutation();
  const [deleteRide, { isLoading: isDeleting }] = useDeleteRideMutation();
  const [localStatus, setLocalStatus] = useState(ride.status || 'active');

  const handleStartRide = async () => {
    try {
      await updateRideStatus({ 
        rideId: ride.id, 
        status: 'in_progress' 
      }).unwrap();
      setLocalStatus('active');
      toast.success('Ride started successfully!');
      onStart?.();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to start ride');
    }
  };

  const handleCompleteRide = async () => {
    try {
      await updateRideStatus({ 
        rideId: ride.id, 
        status: 'completed' 
      }).unwrap();
      setLocalStatus('completed');
      toast.success('Ride completed successfully!');
      onComplete?.();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to complete ride');
    }
  };

  const handleCancelRide = async () => {
    try {
      await deleteRide(Number(ride.id)).unwrap();
      toast.success('Ride cancelled successfully!');
      onCancel?.();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel ride');
    }
  };

  const isLoading = isUpdating || isDeleting;
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Active Ride</CardTitle>
          <Badge className="bg-green-100 text-green-800">{localStatus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route */}
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Route</p>
            <p className="font-semibold">
              {ride.from} → {ride.to}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Departure</p>
            <p className="font-semibold">{ride.departureTime}</p>
          </div>
        </div>

        {/* Passengers & Seats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600">Passengers</p>
              <p className="font-semibold">{ride.passengers || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-600">Per Seat</p>
              <p className="font-semibold">{ride.pricePerSeat?.toLocaleString()} RWF</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={handleCancelRide} 
            disabled={isLoading || localStatus === 'completed' || localStatus === 'cancelled'}
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? 'Cancelling...' : 'Cancel'}
          </Button>
          <Button 
            onClick={handleStartRide} 
            disabled={isLoading || localStatus === 'completed' || localStatus === 'cancelled'}
            className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white disabled:opacity-50"
          >
            {isUpdating ? 'Starting...' : 'Start Ride'}
          </Button>
          <Button 
            onClick={handleCompleteRide} 
            disabled={isLoading || localStatus === 'completed' || localStatus === 'cancelled'}
            className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white disabled:opacity-50"
          >
            {isUpdating ? 'Completing...' : 'Complete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

