import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { useGetAdminProfileQuery, useUpdateAdminProfileMutation } from '../../../services/api/adminApi';
import { Skeleton } from '../../ui/skeleton';
import { Save, User, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function AdminSettingsView() {
  const { data: profile, isLoading } = useGetAdminProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error('Failed to update profile', {
        description: error?.data?.message || 'Please try again',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your admin profile and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-green-600 to-blue-600">
              <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-3xl font-bold">
                {profile?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{profile?.name}</h3>
              <p className="text-sm text-gray-500">{profile?.email}</p>
              <Badge className="mt-2 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                Administrator
              </Badge>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="border-gray-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
