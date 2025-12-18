import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Skeleton } from '../../ui/skeleton';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  CreditCard,
  Car,
  MapPin,
  Save,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGetDriverProfileQuery, useUpdateDriverProfileMutation } from '@/services/api/driverApi';
import { useGetVehiclesQuery } from '@/services/api/vehiclesApi';
import { useUpdateProfileMutation, useGetMeQuery } from '@/services/api/authApi';
import { toast } from 'sonner';

export function SettingsView() {
  // Fetch user profile and vehicles from API
  const { data: authProfile, isLoading: authLoading, error: authError } = useGetMeQuery();
  const { data: driverProfile, isLoading: driverLoading } = useGetDriverProfileQuery(undefined, {
    skip: !authProfile, // Only fetch if auth profile exists
  });
  const { data: vehicles, isLoading: vehiclesLoading, error: vehiclesError } = useGetVehiclesQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateDriverProfileMutation();
  const [updateAuthProfile, { isLoading: isUpdatingPassword }] = useUpdateProfileMutation();

  const [settings, setSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    city: '',
    carModel: '',
    carPlate: '',
    carColor: '',
    notifications: {
      bookingRequests: true,
      messages: true,
      earnings: false,
      promotions: true,
    },
    availability: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Update local state when profile data loads
  useEffect(() => {
    const profile = driverProfile || authProfile;
    
    if (profile) {
      // Parse name from different possible formats
      const fullName = profile.name || profile.full_name || '';
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Get first vehicle if available
      const vehiclesList = Array.isArray(vehicles) ? vehicles : [];
      const vehicle = vehiclesList[0];
      
      setSettings(prev => ({
        ...prev,
        firstName,
        lastName,
        email: profile.email || '',
        phone: profile.phone || profile.phone_number || '',
        bio: profile.bio || '',
        city: profile.city || '',
        carModel: vehicle?.make && vehicle?.model ? `${vehicle.make} ${vehicle.model}` : '',
        carPlate: vehicle?.plate_number || vehicle?.license_plate || '',
        carColor: vehicle?.color || '',
        availability: profile.verificationStatus === 'verified' || profile.role === 'driver',
      }));
    }
  }, [authProfile, driverProfile, vehicles]);

  const handleSave = async () => {
    try {
      await updateProfile({
        name: `${settings.firstName} ${settings.lastName}`.trim(),
        email: settings.email,
        phone: settings.phone,
        bio: settings.bio,
        city: settings.city,
      }).unwrap();
      
      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save settings', {
        description: error?.data?.message || 'Please try again later',
      });
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await updateAuthProfile({
        password: passwordData.newPassword,
      }).unwrap();
      
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
    } catch (error: any) {
      toast.error('Failed to change password', {
        description: error?.data?.message || 'Please try again later',
      });
    }
  };

  // Loading state
  if (authLoading || driverLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  // Error state
  if (authError) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-red-800 font-semibold">Failed to load settings</p>
          <p className="text-sm text-red-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <Button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <Save className="w-4 h-4 mr-2" />
          {isUpdating ? 'Saving...' : 'Save Changes'}
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
            <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white text-2xl font-bold">
              {settings.firstName?.charAt(0) || 'D'}{settings.lastName?.charAt(0) || 'D'}
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
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              placeholder="e.g., Kigali"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
              placeholder="Tell us about yourself"
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
        
        {vehiclesLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {vehicles && Array.isArray(vehicles) && vehicles.length > 0 
                ? 'Vehicle information is managed in the Car Registration section. Current vehicle details are shown below.' 
                : 'No vehicles registered yet. Go to Car Registration to add your vehicle.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="carModel">Car Model</Label>
                <Input
                  id="carModel"
                  value={settings.carModel || 'Not set'}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="carPlate">License Plate</Label>
                <Input
                  id="carPlate"
                  value={settings.carPlate || 'Not set'}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="carColor">Car Color</Label>
                <Input
                  id="carColor"
                  value={settings.carColor || 'Not set'}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>
          </>
        )}
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
          Security & Password
        </h3>
        
        <div className="space-y-4">
          {!showPasswordChange ? (
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowPasswordChange(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          ) : (
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePasswordChange}
                  disabled={isUpdatingPassword}
                  className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isUpdatingPassword ? 'Changing...' : 'Change Password'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Login Email</p>
            <p className="text-gray-900">{settings.email || 'Not set'}</p>
            <p className="text-xs text-gray-500 mt-1">This email is used to sign in to your account</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
