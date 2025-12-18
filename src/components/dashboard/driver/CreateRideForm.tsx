import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { MapPin, Calendar, Clock, Users, ArrowRight, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateRideMutation } from '../../../services/api/ridesApi';
import { useGetVehiclesQuery } from '../../../services/api/vehiclesApi';
import { RideHistoryList } from './RideHistoryList';

export interface CreateRideData {
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat?: number;
}

interface CreateRideFormProps {
  onSubmit?: (data: CreateRideData) => Promise<void>;
  loading?: boolean;
}

export function CreateRideForm({ onSubmit, loading = false }: CreateRideFormProps) {
  const [createRide, { isLoading: isMutating }] = useCreateRideMutation();
  const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehiclesQuery();
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CreateRideData>({
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    seatsAvailable: 4,
    pricePerSeat: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate vehicle selection
    if (!selectedVehicleId) {
      toast.error('Please select a vehicle', {
        description: 'You must select one of your registered vehicles to create a trip',
      });
      return;
    }

    try {
      // Call Redux mutation with API payload
      const apiPayload = {
        origin: formData.from,
        destination: formData.to,
        departure_time: `${formData.departureDate}T${formData.departureTime}:00`,
        total_seats: formData.seatsAvailable,
        vehicle_id: selectedVehicleId,
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
        pricePerSeat: 0,
      });
      setSelectedVehicleId(null);

      // Call optional onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.msg || error?.data?.message || error?.message || 'Please try again';
      toast.error('Failed to create trip', {
        description: errorMessage,
      });
    }
  };

  return (
    <Card className="w-full shadow-md border-0">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vehicle Selection */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Select Vehicle
            </h3>
            
            {isLoadingVehicles ? (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Loading vehicles...</p>
              </div>
            ) : !vehicles || vehicles.length === 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">No vehicles registered</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Please register a vehicle first in the "Car Registration" tab
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <Label htmlFor="vehicle" className="text-xs font-semibold text-gray-700">
                  Vehicle <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedVehicleId?.toString() || ''}
                  onValueChange={(value: string) => setSelectedVehicleId(parseInt(value))}
                >
                  <SelectTrigger id="vehicle" className="py-2 text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition">
                    <SelectValue placeholder="Choose a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle: any) => (
                      <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                        {vehicle.make && vehicle.model
                          ? `${vehicle.make} ${vehicle.model} (${vehicle.license_plate})`
                          : vehicle.license_plate}
                        {vehicle.seat_capacity && ` - ${vehicle.seat_capacity} seats`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

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

          {/* Price Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              Pricing
            </h3>
            
            <div className="space-y-1">
              <Label htmlFor="price" className="text-xs font-semibold text-gray-700">
                Price per Seat (RWF) <span className="text-red-500">*</span>
              </Label>
              <div className="relative flex items-center">
                <DollarSign className="absolute left-2 w-4 h-4 text-blue-500 pointer-events-none" />
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.pricePerSeat || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value ? parseInt(e.target.value) : 0;
                    setFormData({ ...formData, pricePerSeat: value });
                  }}
                  className="pl-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                  min="0"
                />
              </div>
              {formData.pricePerSeat && formData.pricePerSeat > 0 && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-1">
                  <p className="text-xs text-gray-700 font-medium">Fee Breakdown:</p>
                  <div className="space-y-0.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="font-semibold">{formData.pricePerSeat} RWF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admin Fee (2%):</span>
                      <span className="text-red-600">-{Math.round(formData.pricePerSeat * 0.02)} RWF</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-300">
                      <span className="text-gray-700 font-semibold">You receive:</span>
                      <span className="font-bold text-green-600">
                        {formData.pricePerSeat - Math.round(formData.pricePerSeat * 0.02)} RWF
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              disabled={isMutating || loading || !vehicles || vehicles.length === 0 || !selectedVehicleId}
              className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm py-4 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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

