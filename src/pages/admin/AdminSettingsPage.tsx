import { useState } from 'react';
import { useGetAdminProfileQuery, useUpdateAdminProfileMutation } from '../../services/api/adminApi';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { toast } from 'sonner';
import { Mail, Phone, User } from 'lucide-react';

export function AdminSettingsPage() {
  const { data: profile, isLoading } = useGetAdminProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();

  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings & Profile</h1>
        <p className="text-gray-600 mt-1">Manage your admin account settings</p>
      </div>

      {/* Profile Card */}
      <Card className="p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar} />
            <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
            <p className="text-gray-600">{profile?.role}</p>
            <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-green-600 hover:bg-green-700"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    name: profile?.name || '',
                    email: profile?.email || '',
                    phone: profile?.phone || '',
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-lg font-medium text-gray-900">{profile?.name}</p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="text-lg font-medium text-gray-900">{profile?.email}</p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-lg font-medium text-gray-900">{profile?.phone || 'Not provided'}</p>
            </div>

            <Button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive alerts about system activity</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">Activity Logs</p>
              <p className="text-sm text-gray-600">View your account activity history</p>
            </div>
            <Button variant="outline" size="sm">View Logs</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
