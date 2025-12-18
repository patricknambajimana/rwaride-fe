import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertCircle, Upload, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRegisterVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation, useGetVehiclesQuery } from '../../../services/api/vehiclesApi';

export interface CarRegistrationData {
  make: string;
  model: string;
  color: string;
  license_plate: string;
  seat_capacity: number;
  year: number;
}

interface CarRegistrationProps {
  vehicleId?: number;
  onSuccess?: () => void;
}

export function CarRegistration({ vehicleId, onSuccess }: CarRegistrationProps) {
  const [formData, setFormData] = useState<CarRegistrationData>({
    make: '',
    model: '',
    color: '',
    license_plate: '',
    seat_capacity: 4,
    year: new Date().getFullYear(),
  });

  const [registerVehicle, { isLoading: isRegistering }] = useRegisterVehicleMutation();
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();
  const { data: vehicles } = useGetVehiclesQuery();

  const isEditing = !!vehicleId;
  const isLoading = isRegistering || isUpdating || isDeleting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        license_plate: formData.license_plate,
        seat_capacity: formData.seat_capacity,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        color: formData.color,
      };

      if (isEditing && vehicleId) {
        await updateVehicle({
          vehicle_id: vehicleId,
          data: { color: formData.color, seat_capacity: formData.seat_capacity },
        }).unwrap();
        toast.success('Vehicle updated successfully', {
          description: `${formData.make} ${formData.model} updated`,
        });
        if (onSuccess) onSuccess();
      } else {
        await registerVehicle(payload).unwrap();
        toast.success('Vehicle registered successfully! 🚗', {
          description: `${formData.make} ${formData.model} registered`,
        });
        // Reset form
        setFormData({
          make: '',
          model: '',
          color: '',
          license_plate: '',
          seat_capacity: 4,
          year: new Date().getFullYear(),
        });
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      toast.error(isEditing ? 'Failed to update vehicle' : 'Failed to register vehicle', {
        description: error?.data?.message || error?.message || 'Please try again',
      });
    }
  };

  const handleDelete = async () => {
    if (!vehicleId) return;
    const confirmed = window.confirm('Delete this vehicle? This cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteVehicle(vehicleId).unwrap();
      toast.success('Vehicle deleted successfully');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error('Failed to delete vehicle', {
        description: error?.data?.message || error?.message || 'Please try again',
      });
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle>{isEditing ? 'Update Vehicle' : 'Register Vehicle'}</CardTitle>
        <CardDescription className="text-green-50">
          {isEditing ? 'Modify your vehicle details' : 'Register your vehicle details'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Make & Model */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make" className="font-semibold text-gray-700">
                Make <span className="text-red-500">*</span>
              </Label>
              <Input
                id="make"
                placeholder="e.g., Toyota"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="py-2.5 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model" className="font-semibold text-gray-700">
                Model <span className="text-red-500">*</span>
              </Label>
              <Input
                id="model"
                placeholder="e.g., RAV4"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="py-2.5 text-sm"
                required
              />
            </div>
          </div>

          {/* Year & Color */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="font-semibold text-gray-700">
                Year <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.year.toString()} onValueChange={(v) => setFormData({ ...formData, year: parseInt(v) })}>
                <SelectTrigger className="py-2.5 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color" className="font-semibold text-gray-700">
                Color <span className="text-red-500">*</span>
              </Label>
              <Input
                id="color"
                placeholder="e.g., White"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="py-2.5 text-sm"
                required
              />
            </div>
          </div>

          {/* License Plate & Seats */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plate" className="font-semibold text-gray-700">
                License Plate <span className="text-red-500">*</span>
              </Label>
              <Input
                id="plate"
                placeholder="e.g., RAB123L"
                value={formData.license_plate}
                onChange={(e) => setFormData({ ...formData, license_plate: e.target.value.toUpperCase() })}
                className="py-2.5 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats" className="font-semibold text-gray-700">
                Seat Capacity <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.seat_capacity.toString()} onValueChange={(v) => setFormData({ ...formData, seat_capacity: parseInt(v) })}>
                <SelectTrigger className="py-2.5 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} seat{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-semibold">Vehicle Information</p>
                <p>Please ensure all information is accurate. Update anytime by editing color and seat capacity.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Registering...'}
                </span>
              ) : (
                isEditing ? 'Update Vehicle' : 'Register Vehicle'
              )}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isDeleting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </span>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
