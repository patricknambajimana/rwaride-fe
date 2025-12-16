import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import { useUpdateProfileMutation } from "@/services/api/authApi";

interface MyProfileModalProps {
  authUser: any;
  onClose: () => void;
}

export function MyProfileModal({ authUser, onClose }: MyProfileModalProps) {
  const [formData, setFormData] = useState({
    full_name: authUser?.full_name || "",
    email: authUser?.email || "",
    phone_number: authUser?.phone_number || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      await updateProfile({
        full_name: formData.full_name,
      }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to update profile");
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-3 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
          <CardTitle>My Profile</CardTitle>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="pt-6">
          {success ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-4xl mb-2">✓</div>
              <p className="text-green-600 font-semibold">Profile updated successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  placeholder="your@email.com"
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+250 XXX XXX XXX"
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Contact your support to change phone</p>
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
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
