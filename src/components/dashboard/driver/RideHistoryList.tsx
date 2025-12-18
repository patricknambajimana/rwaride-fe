import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { MapPin, Calendar, Clock, DollarSign, AlertCircle, TrendingUp, Pencil, X, Save, Trash } from 'lucide-react';
import { useGetDriverRidesQuery, useUpdateRideMutation, useDeleteRideMutation } from '../../../services/api/ridesApi';
import { toast } from 'sonner';
import { format } from 'date-fns';

export interface RideHistory {
  id: string;
  passengerName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  earnings: number;
  rating: number;
}

interface RideHistoryListProps {
  rides?: RideHistory[];
}

export function RideHistoryList({ rides }: RideHistoryListProps) {
  // Fetch driver rides from API
  const { data: apiRides, isLoading, error } = useGetDriverRidesQuery();
  const [updateRide, { isLoading: isUpdating }] = useUpdateRideMutation();
  const [deleteRide] = useDeleteRideMutation();

  // Local edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDestination, setEditDestination] = useState<string>('');
  const [editSeats, setEditSeats] = useState<number>(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Transform API data for display and keep reference to api item for updates
  const pairedRides: { api: any; view: RideHistory }[] = (apiRides || []).map((ride: any) => ({
    api: ride,
    view: {
      id: ride.id?.toString() || `ride-${Math.random()}`,
      passengerName: ride.driver_name || 'Your Trip',
      from: ride.origin || 'N/A',
      to: ride.destination || 'N/A',
      date: ride.departure_time ? format(new Date(ride.departure_time), 'MMM dd, yyyy') : 'N/A',
      time: ride.departure_time ? format(new Date(ride.departure_time), 'hh:mm a') : 'N/A',
      earnings: ride.total_price || 0,
      rating: ride.rating || 0,
    },
  }));

  const rideList = rides
    ? rides.map((r) => ({ api: null as any, view: r }))
    : pairedRides;

  const startEdit = (ride: any) => {
    if (!ride) return;
    setEditingId(Number(ride.id));
    setEditDestination(ride.destination || '');
    setEditSeats(Number(ride.total_seats) || 1);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDestination('');
    setEditSeats(1);
  };

  const saveEdit = async (ride: any) => {
    if (!ride) return;
    try {
      await updateRide({
        ride_id: Number(ride.id),
        data: { total_seats: editSeats, destination: editDestination },
      }).unwrap();
      toast.success('Trip updated successfully');
      cancelEdit();
    } catch (e: any) {
      toast.error('Failed to update trip', {
        description: e?.data?.message || e?.message || 'Please try again',
      });
    }
  };

  const onDelete = async (ride: any) => {
    if (!ride) return;
    const confirmed = typeof window !== 'undefined' ? window.confirm('Delete this trip? This cannot be undone.') : true;
    if (!confirmed) return;
    try {
      setDeletingId(Number(ride.id));
      await deleteRide(Number(ride.id)).unwrap();
      toast.success('Trip deleted');
      if (editingId === Number(ride.id)) cancelEdit();
    } catch (e: any) {
      toast.error('Failed to delete trip', {
        description: e?.data?.message || e?.message || 'Please try again',
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-800 font-semibold">Failed to load trips</p>
          <p className="text-sm text-red-600">Please try again later</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (rideList.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-blue-800 font-semibold">No trips yet</p>
          <p className="text-sm text-blue-600">Create your first trip to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rideList.map(({ api, view }) => (
        <Card
          key={view.id}
          className="border hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-50"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-3">{view.from} → {view.to}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Route Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{view.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{view.time}</span>
                  </div>
                </div>

                {/* Inline edit section */}
                {api && editingId === Number(api.id) && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <Input
                        value={editDestination}
                        onChange={(e) => setEditDestination(e.target.value)}
                        placeholder="Destination"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        min={1}
                        value={editSeats}
                        onChange={(e) => setEditSeats(parseInt(e.target.value || '1'))}
                        placeholder="Seats"
                        className="text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-3">
                      <Button
                        size="sm"
                        disabled={isUpdating}
                        onClick={() => saveEdit(api)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                      >
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-600 text-lg">
                    {view.earnings.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">RWF</span>
                </div>
                {view.rating > 0 ? (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs font-semibold">
                    ⭐ {view.rating.toFixed(1)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    No rating
                  </Badge>
                )}

                {/* Edit button only when API data exists */}
                {api && (
                  <div className="flex items-center gap-2">
                    {editingId === Number(api.id) ? (
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="w-4 h-4 mr-1" /> Close
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => startEdit(api)}>
                        <Pencil className="w-4 h-4 mr-1" /> Update
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      disabled={deletingId === Number(api.id)}
                      onClick={() => onDelete(api)}
                    >
                      <Trash className="w-4 h-4 mr-1" /> {deletingId === Number(api.id) ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
