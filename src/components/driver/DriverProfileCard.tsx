import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Mail, Phone, MapPin, Edit2, Shield, AlertCircle } from "lucide-react";
import { useState } from "react";

export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  city?: string;
  bio?: string;
  licenseNumber: string;
  licenseExpiry: string;
  insuranceProvider: string;
  insuranceExpiry: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  vehicleColor: string;
  seatingCapacity: number;
  totalRides: number;
  averageRating: number;
  joinDate: string;
  verificationStatus: "verified" | "pending" | "unverified";
  documentsStatus: "approved" | "pending" | "rejected";
  bankAccountVerified: boolean;
}

interface DriverProfileCardProps {
  profile: DriverProfile;
  onUpdateProfile?: (profile: Partial<DriverProfile>) => void;
  onEditPhoto?: () => void;
  onUploadDocuments?: () => void;
  onChangePassword?: () => void;
}

export function DriverProfileCard({
  profile,
  onUpdateProfile,
  onEditPhoto,
  onUploadDocuments,
  onChangePassword,
}: DriverProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<DriverProfile>>({
    name: profile.name,
    phone: profile.phone,
    city: profile.city,
    bio: profile.bio,
  });

  const handleSave = () => {
    onUpdateProfile?.(formData);
    setIsEditing(false);
  };

  const getVerificationBadge = () => {
    switch (profile.verificationStatus) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
            ✓ Verified
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            ⏳ Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
            ⚠ Unverified
          </span>
        );
    }
  };

  const getDocumentsStatus = () => {
    switch (profile.documentsStatus) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
            ✓ Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            ⏳ Pending Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
            ✗ Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={profile.profileImage} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              {onEditPhoto && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  onClick={onEditPhoto}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  {getVerificationBadge()}
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    ⭐ {profile.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y">
                <div>
                  <p className="text-sm text-gray-600">Total Rides</p>
                  <p className="text-lg font-bold text-green-600">
                    {profile.totalRides}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {profile.averageRating.toFixed(1)} ★
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-bold text-blue-600">
                    {new Date(profile.joinDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">{profile.phone}</span>
                </div>
                {profile.city && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">{profile.city}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.documentsStatus !== "approved" && onUploadDocuments && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUploadDocuments}
                    className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Upload Documents
                  </Button>
                )}
                {onChangePassword && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onChangePassword}
                  >
                    Change Password
                  </Button>
                )}
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle & Documents Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">
                Vehicle
              </p>
              <p className="text-sm font-medium">
                {profile.vehicleMake} {profile.vehicleModel}
              </p>
              <p className="text-xs text-gray-600">
                {profile.licensePlate} • {profile.vehicleColor}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">
                Seating Capacity
              </p>
              <p className="text-sm font-medium">{profile.seatingCapacity} passengers</p>
            </div>
          </CardContent>
        </Card>

        {/* Documents Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">Status</p>
              {getDocumentsStatus()}
            </div>
            <div className="space-y-2 pt-2 border-t text-xs">
              <div className="flex justify-between">
                <span>License Expires:</span>
                <span className="font-medium">
                  {new Date(profile.licenseExpiry).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insurance Expires:</span>
                <span className="font-medium">
                  {new Date(profile.insuranceExpiry).toLocaleDateString()}
                </span>
              </div>
              {profile.bankAccountVerified && (
                <div className="flex justify-between text-green-700">
                  <span>✓ Bank Account:</span>
                  <span className="font-medium">Verified</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="Your city"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Tell passengers about yourself (optional)"
                className="mt-1 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
