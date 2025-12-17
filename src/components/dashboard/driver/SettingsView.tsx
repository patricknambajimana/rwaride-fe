import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  CreditCard,
  Car,
  MapPin,
  Save,
} from 'lucide-react';
import { useState } from 'react';

export function SettingsView() {
  const [settings, setSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+250 788 123 456',
    carModel: 'Toyota Corolla',
    carPlate: 'RAC 123 A',
    carColor: 'White',
    notifications: {
      bookingRequests: true,
      messages: true,
      earnings: false,
      promotions: true,
    },
    availability: true,
  });

  const handleSave = () => {
    console.log('Save settings:', settings);
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-green-500" />
          Profile Information
        </h3>
        
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-4 border-green-500">
            <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-2xl font-bold">
              {settings.firstName.charAt(0)}{settings.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">Change Photo</Button>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max. 2MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={settings.firstName}
              onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={settings.lastName}
              onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Vehicle Information */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-500" />
          Vehicle Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="carModel">Car Model</Label>
            <Input
              id="carModel"
              value={settings.carModel}
              onChange={(e) => setSettings({ ...settings, carModel: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="carPlate">License Plate</Label>
            <Input
              id="carPlate"
              value={settings.carPlate}
              onChange={(e) => setSettings({ ...settings, carPlate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="carColor">Car Color</Label>
            <Input
              id="carColor"
              value={settings.carColor}
              onChange={(e) => setSettings({ ...settings, carColor: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-500" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking Requests</p>
              <p className="text-sm text-gray-500">Get notified when you receive new booking requests</p>
            </div>
            <Switch
              checked={settings.notifications.bookingRequests}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, bookingRequests: checked },
                })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Messages</p>
              <p className="text-sm text-gray-500">Get notified about new messages from passengers</p>
            </div>
            <Switch
              checked={settings.notifications.messages}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, messages: checked },
                })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Earnings Updates</p>
              <p className="text-sm text-gray-500">Get notified about earnings and payouts</p>
            </div>
            <Switch
              checked={settings.notifications.earnings}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, earnings: checked },
                })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Promotions</p>
              <p className="text-sm text-gray-500">Get notified about special offers and promotions</p>
            </div>
            <Switch
              checked={settings.notifications.promotions}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, promotions: checked },
                })
              }
            />
          </div>
        </div>
      </Card>

      {/* Availability */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          Availability
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Currently Available for Rides</p>
            <p className="text-sm text-gray-500">
              Toggle this to {settings.availability ? 'go offline' : 'go online'} and{' '}
              {settings.availability ? 'stop' : 'start'} receiving booking requests
            </p>
          </div>
          <Switch
            checked={settings.availability}
            onCheckedChange={(checked) => setSettings({ ...settings, availability: checked })}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-500" />
          Security
        </h3>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Methods
          </Button>
        </div>
      </Card>
    </div>
  );
}
