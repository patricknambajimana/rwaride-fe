import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Plus, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { TripCard } from './TripCard';
import { CreateTripForm } from './CreateTripForm';

interface Trip {
  id: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  status: 'active' | 'completed' | 'cancelled';
  bookings?: any[];
}

interface TripsTabProps {
  myTrips: Trip[];
  onCreateTrip: (formData: any) => Promise<void>;
  loading: boolean;
  onOpenChat?: (payload: { tripId: string; recipientId: string; recipientName: string }) => void;
  onUpdateBookingStatus?: (tripId: string, bookingId: string, status: 'confirmed' | 'cancelled') => void;
}

export function TripsTab({ myTrips, onCreateTrip, loading, onOpenChat, onUpdateBookingStatus }: TripsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Trips</h2>
          <p className="text-gray-600">Manage your trips and passengers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>Add details for your upcoming trip</DialogDescription>
            </DialogHeader>
            <CreateTripForm onSubmit={onCreateTrip} onBack={() => {}} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {myTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onOpenChat={onOpenChat} onUpdateBookingStatus={onUpdateBookingStatus} />
        ))}

        {myTrips.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No trips yet. Create your first trip to start earning!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
