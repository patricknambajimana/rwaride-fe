import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { User, Lock, HelpCircle, Shield, Bell, LogOut, ChevronRight, AlertCircle } from "lucide-react";

interface SettingsPageProps {
  userName: string;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
  onLogout?: () => void;
}

export function SettingsPage({
  userName,
  onProfileClick,
  onChangePasswordClick,
  onLogout,
}: SettingsPageProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings Card */}
        <Card className="hover:shadow-lg transition-all border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">My Profile</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Update your information</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              View and update your profile information, including name, email, and phone number.
            </p>
            <Button
              onClick={onProfileClick}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium"
            >
              Edit Profile
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings Card */}
        <Card className="hover:shadow-lg transition-all border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Security</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Password & safety</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Change your password and manage your account security settings.
            </p>
            <Button
              onClick={onChangePasswordClick}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium"
            >
              Change Password
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="hover:shadow-lg transition-all border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-cyan-50 to-cyan-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Notifications</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Coming soon</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Manage notification preferences for rides, messages, and updates.
            </p>
            <Button
              disabled
              className="w-full bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Safety Card */}
        <Card className="hover:shadow-lg transition-all border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Privacy & Safety</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Coming soon</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Control your privacy settings and manage blocked users.
            </p>
            <Button
              disabled
              className="w-full bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support Card */}
        <Card className="hover:shadow-lg transition-all border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-teal-50 to-teal-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500 rounded-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Help & Support</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Coming soon</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Get help with your account and find answers to common questions.
            </p>
            <Button
              disabled
              className="w-full bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions Card */}
        <Card className="hover:shadow-lg transition-all border-red-200 shadow-sm md:col-span-2">
          <CardHeader className="bg-gradient-to-br from-red-50 to-red-100 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-red-700">Account Actions</CardTitle>
                <p className="text-xs text-red-600 mt-0.5">Logout or delete account</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              You can logout from your account. Note: To permanently delete your account, please use the Profile Settings option.
            </p>
            <Button
              onClick={onLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>


      {/* Account Information Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4 rounded-t-lg border-b">
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-700">Account Name</span>
              <span className="text-gray-600">{userName}</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-700">Account Type</span>
              <span className="text-gray-600">Passenger</span>
            </div>
            <div className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-700">Member Since</span>
              <span className="text-gray-600">December 2025</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
