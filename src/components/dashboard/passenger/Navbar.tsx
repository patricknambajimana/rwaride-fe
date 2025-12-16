import { LogOut, Settings, Bell, User, ChevronDown, Lock, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";

interface Props {
  userName: string;
  onLogout: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onChangePasswordClick?: () => void;
  onDeleteAccountClick?: () => void;
  onNavigateToSettings?: (tab: string) => void;
}

export function Navbar({ userName, onLogout, onProfileClick, onSettingsClick, onChangePasswordClick, onDeleteAccountClick, onNavigateToSettings }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-r from-green-500 to-blue-500 p-2 rounded-lg">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">RwaRide</h1>
            <p className="text-xs text-gray-600">Passenger</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Profile Dropdown Menu */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:bg-gray-100 px-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-linear-to-r from-green-500 to-blue-500 text-white font-bold">
                    {userName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-600">Passenger</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
              {/* Profile Header */}
              <div className="px-4 py-3 border-b bg-linear-to-r from-green-50 to-blue-50">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-600">Passenger Account</p>
              </div>

              {/* Profile Options */}
              <DropdownMenuItem 
                onClick={() => {
                  onNavigateToSettings?.("setting");
                  setIsDropdownOpen(false);
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50"
              >
                <User className="w-4 h-4 text-green-600" />
                <span>My Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => {
                  onSettingsClick?.();
                  setIsDropdownOpen(false);
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 text-blue-600" />
                <span>Account Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => {
                  onChangePasswordClick?.();
                  setIsDropdownOpen(false);
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50"
              >
                <Lock className="w-4 h-4 text-orange-600" />
                <span>Change Password</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Danger Zone */}
              <DropdownMenuItem 
                onClick={() => {
                  onDeleteAccountClick?.();
                  setIsDropdownOpen(false);
                }}
                className="gap-2 cursor-pointer hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-semibold">Delete Account</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem 
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50 text-gray-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
