import { CreateRideForm, CreateRideData } from './CreateRideForm';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function CreateTripView() {
  const handleSubmit = async (data: CreateRideData) => {
    // TODO: replace with API integration
    console.log('Create trip submitted:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Create Trip</h2>
        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          New Ride
        </Badge>
      </div>

      <Card className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-semibold">Select departure and destination</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">Pick a departure date</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold">Choose departure time</p>
          </div>
        </div>
      </Card>

      <CreateRideForm onSubmit={handleSubmit} />
    </div>
  );
}
