import { ActiveRideCard, type ActiveRide as CardRide } from './ActiveRideCard';
import { PassengerList } from './PassengerList';
import { Badge } from '../../ui/badge';
import { MapPin, Loader } from 'lucide-react';
import { useGetDriverRidesQuery } from '../../../services/api/ridesApi';
import { toast } from 'sonner';

export function ActiveRidesView() {
  const { data: activeRides = [], isLoading } = useGetDriverRidesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Active Passengers</h2>
        <Badge className="bg-blue-500 text-white px-3 py-1 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {activeRides.length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {activeRides.map((r: any) => {
          const cardRide: CardRide = {
            id: r.id?.toString() || r.trip_id?.toString() || '',
            from: r.origin || r.from_location || '',
            to: r.destination || r.to_location || '',
            departureTime: r.departure_time || 'ASAP',
            seatsAvailable: r.available_seats || 0,
            pricePerSeat: r.price_per_seat || 0,
            passengers: Math.max(0, (r.total_seats || 0) - (r.available_seats || 0)),
            status: r.status || 'active',
          };

          return (
            <ActiveRideCard
              key={r.id || r.trip_id}
              ride={cardRide}
              onComplete={() => {
                toast.success('Ride completed!');
              }}
            />
          );
        })}
      </div>

      {activeRides.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">No active passenger</p>
          <p className="text-gray-400 text-sm mt-1">Accept a booking request to start a ride</p>
        </div>
      )}

      {/* Passenger Management Section */}
      {activeRides.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>
          <PassengerList
            passengers={activeRides.map((r: any) => ({
              id: r.id?.toString() || r.trip_id?.toString() || '',
              name: r.driver_name || 'Passenger',
              pickupLocation: r.origin || r.from_location || '',
              dropoffLocation: r.destination || r.to_location || '',
              time: r.departure_time || 'ASAP',
              seats: r.available_seats || 0,
              rating: 4.8,
              status: r.status || 'waiting',
            }))}
          />
        </div>
      )}
    </div>
  );
}
