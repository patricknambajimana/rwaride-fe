import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MapPin, Clock, Users, DollarSign, AlertCircle } from "lucide-react";

export interface CreateRideData {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  amenities: string[];
  notes?: string;
}

interface CreateRideFormProps {
  onSubmit: (data: CreateRideData) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export function CreateRideForm({
  onSubmit,
  loading = false,
  onCancel,
}: CreateRideFormProps) {
  const [formData, setFormData] = useState<CreateRideData>({
    fromLocation: "",
    toLocation: "",
    departureDate: "",
    departureTime: "",
    availableSeats: 1,
    pricePerSeat: 10,
    amenities: [],
    notes: "",
  });

  const amenitiesOptions = ["WiFi", "Water", "AC", "Phone Charger", "Snacks", "Music"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.fromLocation &&
      formData.toLocation &&
      formData.departureDate &&
      formData.departureTime
    ) {
      onSubmit(formData);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a New Ride</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Route
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">Departure Location *</Label>
                <Input
                  id="from"
                  placeholder="e.g., Kigali City Center"
                  value={formData.fromLocation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fromLocation: e.target.value,
                    }))
                  }
                  required
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">Destination *</Label>
                <Input
                  id="to"
                  placeholder="e.g., Kigali International Airport"
                  value={formData.toLocation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      toLocation: e.target.value,
                    }))
                  }
                  required
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Schedule
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Departure Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureDate: e.target.value,
                    }))
                  }
                  required
                  min={minDate}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Departure Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureTime: e.target.value,
                    }))
                  }
                  required
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Seats & Price Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-700">
              Passengers & Pricing
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seats" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Available Seats *
                </Label>
                <Select
                  value={String(formData.availableSeats)}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      availableSeats: Number(value),
                    }))
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Seat</SelectItem>
                    <SelectItem value="2">2 Seats</SelectItem>
                    <SelectItem value="3">3 Seats</SelectItem>
                    <SelectItem value="4">4 Seats</SelectItem>
                    <SelectItem value="5">5 Seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price per Seat ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="0.5"
                  value={formData.pricePerSeat}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pricePerSeat: Number(e.target.value),
                    }))
                  }
                  required
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-700">
              Amenities (Optional)
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenitiesOptions.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-2 rounded-lg border-2 transition-colors text-sm font-medium ${
                    formData.amenities.includes(amenity)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="e.g., No smoking, prefer quiet ride, stop at specific locations..."
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              className="text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Info Box */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Your ride will be visible to passengers immediately after creation.
                You can cancel it anytime.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? "Creating..." : "Create Ride"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
