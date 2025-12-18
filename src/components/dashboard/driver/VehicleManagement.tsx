import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Skeleton } from '../../ui/skeleton';
import { AlertCircle, Plus, Pencil, Trash2 } from 'lucide-react';
import { useGetVehiclesQuery, useDeleteVehicleMutation } from '../../../services/api/vehiclesApi';
import { toast } from 'sonner';
import { CarRegistration } from './CarRegistration';

export function VehicleManagement() {
  const [editingVehicleId, setEditingVehicleId] = useState<number | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { data: vehicles, isLoading, error, refetch } = useGetVehiclesQuery();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  const handleDelete = async (vehicleId: number, vehicleName: string) => {
    const confirmed = window.confirm(`Delete ${vehicleName}? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteVehicle(vehicleId).unwrap();
      toast.success('Vehicle deleted successfully');
      refetch();
    } catch (error: any) {
      toast.error('Failed to delete vehicle', {
        description: error?.data?.message || 'Please try again',
      });
    }
  };

  const handleEditSuccess = () => {
    setEditingVehicleId(null);
    refetch();
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
    refetch();
  };

  // Show registration form if registering
  if (isRegistering) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setIsRegistering(false)}
          className="mb-4"
        >
          ← Back to Vehicles
        </Button>
        <CarRegistration onSuccess={handleRegisterSuccess} />
      </div>
    );
  }

  // Show edit form if editing
  if (editingVehicleId !== null) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setEditingVehicleId(null)}
          className="mb-4"
        >
          ← Back to Vehicles
        </Button>
        <CarRegistration vehicleId={editingVehicleId} onSuccess={handleEditSuccess} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Vehicles</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your registered vehicles</p>
        </div>
        <Button
          onClick={() => setIsRegistering(true)}
          className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Register Vehicle
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center text-red-700">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Failed to load vehicles</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && (!vehicles || vehicles.length === 0) && (
        <div className="flex items-center justify-center p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-center text-blue-700">
            <p className="font-semibold mb-3">No vehicles registered yet</p>
            <Button
              onClick={() => setIsRegistering(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Register Your First Vehicle
            </Button>
          </div>
        </div>
      )}

      {/* Vehicles List */}
      {!isLoading && !error && vehicles && vehicles.length > 0 && (
        <div className="grid gap-4">
          {vehicles.map((vehicle: any) => {
            const vehicleName = `${vehicle.make || 'Vehicle'} ${vehicle.model || ''}`.trim();
            return (
              <Card key={vehicle.id} className="border hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {vehicleName}
                        </h3>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {vehicle.year}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-600">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">License Plate</p>
                          <p className="font-semibold text-gray-900">{vehicle.license_plate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Color</p>
                          <p className="font-semibold text-gray-900">{vehicle.color}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Seats</p>
                          <p className="font-semibold text-gray-900">{vehicle.seat_capacity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Status</p>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingVehicleId(vehicle.id)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(vehicle.id, vehicleName)}
                        disabled={isDeleting}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
