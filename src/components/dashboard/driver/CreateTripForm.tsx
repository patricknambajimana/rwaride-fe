import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, ArrowLeft } from 'lucide-react';

interface CreateTripFormProps {
  onSubmit: (data: any) => Promise<void>;
  onBack: () => void;
  loading?: boolean;
}

export function CreateTripForm({ onSubmit, onBack, loading = false }: CreateTripFormProps) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      fromLocation,
      toLocation,
      departureDate,
      departureTime,
      availableSeats,
      pricePerSeat: parseFloat(pricePerSeat),
    });

    // Reset form
    setFromLocation('');
    setToLocation('');
    setDepartureDate('');
    setDepartureTime('');
    setAvailableSeats(1);
    setPricePerSeat('');
  };

  return (
    <Card>
      <CardHeader>
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <CardTitle>Create New Trip</CardTitle>
        <CardDescription>Add details for your upcoming trip</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">Departure Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="from"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="e.g., Kigali City Center"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="to"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="e.g., Huye Town"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Departure Date</Label>
              <Input
                id="date"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Departure Time</Label>
              <Input
                id="time"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats</Label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="5"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price Per Seat (RWF)</Label>
              <Input
                id="price"
                type="number"
                step="100"
                value={pricePerSeat}
                onChange={(e) => setPricePerSeat(e.target.value)}
                placeholder="2000"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Trip'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
