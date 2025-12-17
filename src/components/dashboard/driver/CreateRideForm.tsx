import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { MapPin, Calendar, Clock } from 'lucide-react';

export interface CreateRideData {
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  description?: string;
}

interface CreateRideFormProps {
  onSubmit?: (data: CreateRideData) => Promise<void>;
  loading?: boolean;
}

export function CreateRideForm({ onSubmit, loading = false }: CreateRideFormProps) {
  const [formData, setFormData] = useState<CreateRideData>({
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    seatsAvailable: 4,
    pricePerSeat: 5000,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <Card className="w-full shadow-lg border-2 bg-linear-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-linear-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle>Create New Ride</CardTitle>
        <CardDescription className="text-green-50">
          Share your ride and earn money
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Location */}
          <div className="space-y-2">
            <Label htmlFor="from">Departure Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="from"
                placeholder="e.g., Kigali City Center"
                value={formData.from}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* To Location */}
          <div className="space-y-2">
            <Label htmlFor="to">Destination *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="to"
                placeholder="e.g., Huye Town"
                value={formData.to}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Departure Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.departureDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, departureDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Departure Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, departureTime: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Seats & Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats *</Label>
              <Select
                value={formData.seatsAvailable.toString()}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, seatsAvailable: parseInt(value) })
                }
              >
                <SelectTrigger id="seats">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} seats
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price Per Seat (RWF) *</Label>
              <Input
                id="price"
                type="number"
                min="1000"
                step="500"
                value={formData.pricePerSeat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, pricePerSeat: parseInt(e.target.value) })
                }
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Notes</Label>
            <Textarea
              id="description"
              placeholder="e.g., I have a comfortable car, AC working, clean..."
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
          >
            {loading ? 'Creating...' : 'Create Ride'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

