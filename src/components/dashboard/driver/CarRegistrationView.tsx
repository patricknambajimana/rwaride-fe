import { CarRegistration, CarRegistrationData } from './CarRegistration';
import { Badge } from '../../ui/badge';
import { Car, ShieldCheck } from 'lucide-react';

export function CarRegistrationView() {
  const handleSubmit = async (data: CarRegistrationData) => {
    // TODO: replace with API integration
    console.log('Car registration submitted:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Car Registration</h2>
        <Badge className="bg-linear-to-r from-green-500 to-blue-500 text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Required for trips
        </Badge>
      </div>

      <div className="flex items-center gap-3 text-gray-600">
        <Car className="w-5 h-5" />
        <p className="text-sm">Provide accurate vehicle info to enable bookings and verification.</p>
      </div>

      <CarRegistration onSubmit={handleSubmit} />
    </div>
  );
}
