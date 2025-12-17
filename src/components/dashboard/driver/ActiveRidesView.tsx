import { ActiveRideCard, type ActiveRide as CardRide } from './ActiveRideCard';
import { PassengerList } from './PassengerList';
import { Badge } from '../../ui/badge';
import { MapPin } from 'lucide-react';

interface ActivePassengerRide {
  id: string;
  passengerName: string;
  pickupLocation: string;
  destination: string;
  currentLocation: string;
  estimatedArrival: string;
  fare: number;
  distance: string;
}

const mockActiveRides: ActivePassengerRide[] = [
  {
    id: '1',
    passengerName: 'Alice Johnson',
    pickupLocation: 'Nyarutarama',
    destination: 'Kigali Heights',
    currentLocation: 'Kacyiru',
    estimatedArrival: '15 mins',
    fare: 4500,
    distance: '5.2 km',
  },
];

export function ActiveRidesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Active Passengers</h2>
        <Badge className="bg-blue-500 text-white px-3 py-1 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {mockActiveRides.length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {mockActiveRides.map((r) => {
          // Map to ActiveRideCard's expected shape
          const cardRide: CardRide = {
            id: r.id,
            from: r.pickupLocation,
            to: r.destination,
            departureTime: 'ASAP',
            seatsAvailable: 3,
            pricePerSeat: r.fare,
            passengers: 1,
            status: 'active',
          };

          return (
            <ActiveRideCard
              key={r.id}
              ride={cardRide}
              onComplete={() => console.log('Complete ride:', r.id)}
            />
          );
        })}
      </div>

      {mockActiveRides.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">No active passenger</p>
          <p className="text-gray-400 text-sm mt-1">Accept a booking request to start a ride</p>
        </div>
      )}

      {/* Passenger Management Section */}
      {mockActiveRides.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>
          <PassengerList
            passengers={mockActiveRides.map((r) => ({
              id: r.id,
              name: r.passengerName,
              pickupLocation: r.pickupLocation,
              dropoffLocation: r.destination,
              time: r.estimatedArrival,
              seats: 1,
              rating: 4.8,
              status: 'waiting',
            }))}
          />
        </div>
      )}
    </div>
  );
}
