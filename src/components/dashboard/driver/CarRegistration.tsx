import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { AlertCircle, Upload } from 'lucide-react';

export interface CarRegistrationData {
  carModel: string;
  carColor: string;
  carPlate: string;
  vin: string;
  registrationDoc?: File;
}

interface CarRegistrationProps {
  onSubmit?: (data: CarRegistrationData) => Promise<void>;
  loading?: boolean;
}

export function CarRegistration({ onSubmit, loading = false }: CarRegistrationProps) {
  const [formData, setFormData] = useState<CarRegistrationData>({
    carModel: '',
    carColor: '',
    carPlate: '',
    vin: '',
  });

  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, registrationDoc: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="bg-linear-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle>Car Registration</CardTitle>
        <CardDescription className="text-green-50">
          Register your vehicle details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Model & Color */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carModel">Car Model *</Label>
              <Input
                id="carModel"
                placeholder="e.g., Toyota Corolla"
                value={formData.carModel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, carModel: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carColor">Car Color *</Label>
              <Input
                id="carColor"
                placeholder="e.g., White"
                value={formData.carColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, carColor: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* License Plate & VIN */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carPlate">License Plate *</Label>
              <Input
                id="carPlate"
                placeholder="e.g., RAA001A"
                value={formData.carPlate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, carPlate: e.target.value.toUpperCase() })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Vehicle Identification) *</Label>
              <Input
                id="vin"
                placeholder="17-character VIN"
                maxLength={17}
                value={formData.vin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, vin: e.target.value.toUpperCase() })
                }
                required
              />
            </div>
          </div>

          {/* Registration Document */}
          <div className="space-y-2">
            <Label>Registration Document *</Label>
            <div className="border-2 border-dashed border-green-300 rounded-lg p-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Registration Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <p>Upload registration document</p>
                </div>
              )}
              <Input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleImageChange}
                className="mt-2"
                required
              />
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <div className="text-sm text-yellow-700">
                <p className="font-semibold">Verification Required</p>
                <p>Please ensure all information matches your registration document exactly</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          >
            {loading ? 'Registering...' : 'Register Vehicle'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
