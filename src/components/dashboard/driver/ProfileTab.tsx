import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Star } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface CarInfo {
  make: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  seats?: number;
}

interface ProfileTabProps {
  user: User;
  car: CarInfo;
  totalTrips: number;
  averageRating: string | number;
  onUpdateProfile?: (data: Partial<User>) => void;
  onUpdateCar?: (data: Partial<CarInfo>) => void;
}

export function ProfileTab({ user, car, totalTrips, averageRating, onUpdateProfile, onUpdateCar }: ProfileTabProps) {
  const [profileForm, setProfileForm] = useState<User>(user);
  const [carForm, setCarForm] = useState<CarInfo>(car);

  useEffect(() => {
    setProfileForm(user);
  }, [user]);

  useEffect(() => {
    setCarForm(car);
  }, [car]);

  const handleProfileSave = () => {
    onUpdateProfile?.(profileForm);
  };

  const handleCarSave = () => {
    onUpdateCar?.(carForm);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl">{profileForm.name?.[0] || 'D'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-semibold">{profileForm.name}</p>
            <Badge>Driver</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span>Rating: {averageRating}</span>
          </div>
          <div className="text-gray-600 space-y-1">
            <p className="text-sm">
              <span className="font-medium">Email:</span> {profileForm.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {profileForm.phone || 'Not provided'}
            </p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Trips:</span> {totalTrips}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold">Profile Details</p>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="driver-name">Full Name</Label>
                <Input
                  id="driver-name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="driver-email">Email</Label>
                <Input
                  id="driver-email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="driver-phone">Phone</Label>
                <Input
                  id="driver-phone"
                  value={profileForm.phone || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="e.g. +2507..."
                />
              </div>
              <Button onClick={handleProfileSave}>Save Profile</Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Car Information</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="car-make">Make</Label>
                  <Input
                    id="car-make"
                    value={carForm.make}
                    onChange={(e) => setCarForm({ ...carForm, make: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="car-model">Model</Label>
                  <Input
                    id="car-model"
                    value={carForm.model}
                    onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="car-year">Year</Label>
                  <Input
                    id="car-year"
                    value={carForm.year}
                    onChange={(e) => setCarForm({ ...carForm, year: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="car-color">Color</Label>
                  <Input
                    id="car-color"
                    value={carForm.color}
                    onChange={(e) => setCarForm({ ...carForm, color: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="car-plate">Plate</Label>
                  <Input
                    id="car-plate"
                    value={carForm.plate}
                    onChange={(e) => setCarForm({ ...carForm, plate: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="car-seats">Seats</Label>
                  <Input
                    id="car-seats"
                    type="number"
                    value={carForm.seats ?? ''}
                    onChange={(e) => setCarForm({ ...carForm, seats: Number(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
              <Button variant="secondary" onClick={handleCarSave}>Save Car Info</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
