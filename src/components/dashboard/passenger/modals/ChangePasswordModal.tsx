import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import { useUpdateProfileMutation } from "@/services/api/authApi";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      await updateProfile({
        password: formData.newPassword,
      }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-3 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
          <CardTitle>Change Password</CardTitle>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="pt-6">
          {success ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-4xl mb-2">✓</div>
              <p className="text-green-600 font-semibold">Password changed successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
