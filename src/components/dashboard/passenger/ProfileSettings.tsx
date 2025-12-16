import { useEffect, useState } from "react";
import { LogOut, Trash2 } from "lucide-react";
import { useUpdateProfileMutation, useDeleteAccountMutation } from "@/services/api/authApi";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

interface ProfileSettingsProps {
  authUser: any;
  onLogout: () => void;
}

export function ProfileSettings({ authUser, onLogout }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    full_name: authUser?.full_name || authUser?.name || "",
    bio: authUser?.bio || "",
    new_password: "",
    confirm_password: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      full_name: authUser?.full_name || authUser?.name || "",
      bio: authUser?.bio || "",
    }));
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      setError("Full name is required");
      return;
    }
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setError("New passwords do not match");
      return;
    }
    if (formData.new_password && formData.new_password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const payload: { full_name: string; bio?: string; password?: string } = {
        full_name: formData.full_name.trim(),
        bio: formData.bio.trim() || undefined,
      };

      if (formData.new_password) {
        payload.password = formData.new_password;
      }

      await updateProfile(payload).unwrap();
      setSuccess("Profile updated successfully");
      setFormData((prev) => ({ ...prev, new_password: "", confirm_password: "" }));
      setTimeout(() => setSuccess(null), 2500);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      setError("Type 'delete my account' to confirm");
      return;
    }

    try {
      setError(null);
      await deleteAccount().unwrap();
      onLogout();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-white border border-green-100 shadow-sm">
        <CardContent className="pt-10 pb-10 px-6 md:px-8">
          <div className="flex items-center gap-4 md:gap-5 flex-wrap">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-white shadow-md flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl md:text-2xl font-bold">
                {authUser?.full_name?.[0]?.toUpperCase() || authUser?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{authUser?.full_name || authUser?.name}</h3>
              <p className="text-sm md:text-base text-gray-700 mt-1">{authUser?.email}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-2">Passenger account • Secure & up-to-date</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg space-y-1.5 py-6 px-6 md:px-8">
          <CardTitle className="text-xl md:text-2xl">Profile & Security</CardTitle>
          <CardDescription className="text-green-50 text-sm md:text-base">Keep your information current and your account secure.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-7">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">Full Name *</label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-11 md:h-12 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="min-h-[108px] text-sm md:text-base"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800 text-sm md:text-base leading-relaxed">
              ℹ️ Password change is optional. Leave the fields blank to keep your current password.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">New Password</label>
                <Input
                  name="new_password"
                  type="password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="h-11 md:h-12 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">Confirm New Password</label>
                <Input
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="h-11 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1 h-11 md:h-12 text-sm md:text-base font-semibold bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onLogout}
                className="flex-1 h-11 md:h-12 text-sm md:text-base"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-red-200 border-2">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg space-y-1.5 py-5 px-6 md:px-8">
          <CardTitle className="text-lg md:text-xl">Danger Zone</CardTitle>
          <CardDescription className="text-red-50 text-sm md:text-base">Deleting your account is irreversible.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-4">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Type <span className="font-semibold">delete my account</span> to confirm.
          </p>
          <Input
            name="deleteConfirm"
            value={deleteConfirm}
            onChange={(e) => {
              setDeleteConfirm(e.target.value);
              setError(null);
            }}
            placeholder="delete my account"
            className="h-11 md:h-12 text-sm md:text-base"
          />
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            variant="outline"
            className="w-full h-11 md:h-12 text-sm md:text-base font-semibold text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" /> {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
