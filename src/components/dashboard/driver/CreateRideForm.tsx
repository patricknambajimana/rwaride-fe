import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateRideMutation } from '../../../services/api/ridesApi';
import { RideHistoryList } from './RideHistoryList';

export interface CreateRideData {
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  seatsAvailable: number;
}

interface CreateRideFormProps {
  onSubmit?: (data: CreateRideData) => Promise<void>;
  loading?: boolean;
  vehicleId?: number;
}

export function CreateRideForm({ onSubmit, loading = false, vehicleId = 1 }: CreateRideFormProps) {
  const [createRide, { isLoading: isMutating }] = useCreateRideMutation();
  const [formData, setFormData] = useState<CreateRideData>({
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    seatsAvailable: 4,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call Redux mutation with API payload
      const apiPayload = {
        origin: formData.from,
        destination: formData.to,
        departure_time: `${formData.departureDate}T${formData.departureTime}:00`,
        total_seats: formData.seatsAvailable,
        vehicle_id: vehicleId,
      };

      await createRide(apiPayload).unwrap();

      toast.success('Trip created successfully! 🎉', {
        description: `${formData.from} → ${formData.to} on ${formData.departureDate}`,
      });

      // Reset form after successful submission
      setFormData({
        from: '',
        to: '',
        departureDate: '',
        departureTime: '',
        seatsAvailable: 4,
      });

      // Call optional onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      toast.error('Failed to create trip', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  return (
    <Card className="w-full shadow-md border-0">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Route Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              Trip Route
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* From Location */}
              <div className="space-y-1">
                <Label htmlFor="from" className="text-xs font-semibold text-gray-700">
                  From <span className="text-red-500">*</span>
                </Label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-2 w-4 h-4 text-green-500 pointer-events-none" />
                  <Input
                    id="from"
                    placeholder="Kigali"
                    value={formData.from}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, from: e.target.value })
                    }
                    className="pl-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-200 transition"
                    required
                  />
                </div>
              </div>

              {/* To Location */}
              <div className="space-y-1">
                <Label htmlFor="to" className="text-xs font-semibold text-gray-700">
                  To <span className="text-red-500">*</span>
                </Label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-2 w-4 h-4 text-blue-500 pointer-events-none" />
                  <Input
                    id="to"
                    placeholder="Huye"
                    value={formData.to}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                    className="pl-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Schedule
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="date" className="text-xs font-semibold text-gray-700">
                  Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, departureDate: e.target.value })
                  }
                  className="py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time" className="text-xs font-semibold text-gray-700">
                  Time <span className="text-red-500">*</span>
                </Label>
                <div className="relative flex items-center">
                  <Clock className="absolute left-2 w-4 h-4 text-purple-500 pointer-events-none" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.departureTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, departureTime: e.target.value })
                    }
                    className="pl-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              Seats
            </h3>
            
            <div className="space-y-1">
              <Label htmlFor="seats" className="text-xs font-semibold text-gray-700">
                Available Seats <span className="text-red-500">*</span>
              </Label>
              <div className="relative flex items-center">
                <Users className="absolute left-2 w-4 h-4 text-orange-500 pointer-events-none" />
                <Select
                  value={formData.seatsAvailable.toString()}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, seatsAvailable: parseInt(value) })
                  }
                >
                  <SelectTrigger id="seats" className="pl-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 transition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'seat' : 'seats'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              disabled={isMutating || loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm py-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {isMutating || loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Create Trip
                </div>
              )}
            </Button>
          </div>

          {/* Trips List Below */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              Your Trips
            </h3>
            <RideHistoryList />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

