import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  LogOut, 
  Trash2,
  Save,
  X,
  Lock
} from "lucide-react";

export interface PassengerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  city?: string;
  bio?: string;
  totalTrips: number;
  averageRating: number;
  joinDate: string;
  verificationStatus: "verified" | "pending" | "unverified";
  preferencesNotifications?: boolean;
  preferencesSmsAlerts?: boolean;
  preferencesMarketing?: boolean;
}

interface ProfileManagementProps {
  profile: PassengerProfile;
  onUpdateProfile?: (profile: Partial<PassengerProfile>) => Promise<void>;
  onDeleteAccount?: () => Promise<void>;
  onLogout?: () => void;
  onChangePassword?: () => void;
}

export function ProfileManagement({
  profile,
  onUpdateProfile,
  onDeleteAccount,
  onLogout,
  onChangePassword,
}: ProfileManagementProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PassengerProfile>>({
    name: profile.name,
    phone: profile.phone,
    city: profile.city,
    bio: profile.bio,
  });

  const handleSave = async () => {
    try {
      setError(null);
      setIsSaving(true);
      if (formData.name?.trim() === "" || formData.phone?.trim() === "") {
        setError("Name and phone are required");
        return;
      }
      await onUpdateProfile?.(formData);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    onLogout?.();
    navigate("/auth/login", { replace: true });
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.toLowerCase() !== "delete my account") {
      setError("Please type 'delete my account' to confirm");
      return;
    }
    try {
      setError(null);
      await onDeleteAccount?.();
      setShowDeleteDialog(false);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Failed to delete account");
    }
  };

  const getVerificationBadge = () => {
    switch (profile.verificationStatus) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-green-100 to-blue-100 text-green-800 text-xs font-semibold border border-green-300">
            ✓ Verified
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold border border-yellow-300">
            ⏳ Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-300">
            ⚠ Unverified
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Profile Header Card */}
      <Card className="shadow-lg border-0 bg-linear-to-br from-white to-gray-50">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
              <Avatar className="h-20 w-20 md:h-28 md:w-28 ring-4 ring-gradient-to-r ring-green-200 to-blue-200">
                <AvatarImage src={profile.profileImage} alt={profile.name} />
                <AvatarFallback className="bg-linear-to-r from-green-500 to-blue-500 text-white text-lg md:text-2xl font-bold">
                  {profile.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600">
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
                {getVerificationBadge()}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 border-y border-gray-200">
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-blue-600">
                    {profile.totalTrips}
                  </p>
                  <p className="text-xs text-gray-600">Total Trips</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-blue-600">
                    {profile.averageRating}
                  </p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-blue-600">
                    ⭐
                  </p>
                  <p className="text-xs text-gray-600">Starred</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-3 md:mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>{profile.phone}</span>
                </div>
                {profile.city && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{profile.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col gap-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white w-full sm:w-auto"
                size="sm"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="shadow-lg border-0 bg-linear-to-br from-green-50 to-blue-50">
          <CardHeader className="bg-linear-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-lg md:text-xl">Edit Profile</CardTitle>
            <CardDescription className="text-green-50">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4 md:space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs md:text-sm border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-xs md:text-sm border border-green-200">
                {success}
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                Full Name
              </Label>
              <Input
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-9 md:h-10 text-xs md:text-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                Email (Read-only)
              </Label>
              <Input
                value={profile.email}
                disabled
                className="h-9 md:h-10 text-xs md:text-sm bg-gray-100"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                Phone
              </Label>
              <Input
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="h-9 md:h-10 text-xs md:text-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                placeholder="+250 788 123 456"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                City
              </Label>
              <Input
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="h-9 md:h-10 text-xs md:text-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
                placeholder="Your city"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                Bio
              </Label>
              <Textarea
                value={formData.bio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="text-xs md:text-sm border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex-1 sm:flex-none h-9 md:h-10 text-xs md:text-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: profile.name,
                    phone: profile.phone,
                    city: profile.city,
                    bio: profile.bio,
                  });
                }}
                variant="outline"
                className="flex-1 sm:flex-none h-9 md:h-10 text-xs md:text-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Settings */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-linear-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-lg md:text-xl">Account Settings</CardTitle>
          <CardDescription className="text-green-50">
            Manage your account security and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div className="space-y-2">
            <Button
              onClick={onChangePassword}
              variant="outline"
              className="w-full h-9 md:h-10 text-xs md:text-sm justify-start text-gray-700 hover:bg-gray-100"
            >
              <Lock className="w-4 h-4 mr-2 text-green-600" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="shadow-lg border-red-200 border-2">
        <CardHeader className="bg-linear-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-lg md:text-xl">Danger Zone</CardTitle>
          <CardDescription className="text-red-50 text-xs md:text-sm">
            Irreversible actions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={() => setShowLogoutDialog(true)}
              variant="outline"
              className="flex-1 h-9 md:h-10 text-xs md:text-sm text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="outline"
              className="flex-1 h-9 md:h-10 text-xs md:text-sm text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="w-full sm:max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base md:text-lg">
              Logout?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs md:text-sm">
              Are you sure you want to logout from your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <AlertDialogCancel className="h-8 md:h-9 text-xs md:text-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 h-8 md:h-9 text-xs md:text-sm"
            >
              Logout
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="w-full sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base md:text-lg text-red-600">
              Delete Account Permanently?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs md:text-sm">
              This action cannot be undone. All your data, bookings, and history will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {error && (
            <div className="bg-red-50 text-red-700 p-2 rounded text-xs border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <Label className="text-xs md:text-sm font-semibold text-gray-800">
                Type "delete my account" to confirm:
              </Label>
              <Input
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="delete my account"
                className="mt-2 h-9 md:h-10 text-xs md:text-sm border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <AlertDialogCancel className="h-8 md:h-9 text-xs md:text-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation.toLowerCase() !== "delete my account"}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed h-8 md:h-9 text-xs md:text-sm"
            >
              Delete Account
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
