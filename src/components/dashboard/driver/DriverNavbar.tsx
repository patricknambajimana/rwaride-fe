import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../ui/dropdown-menu';
import { Badge } from '../../ui/badge';
import { Bell, LogOut, Settings, User, ChevronDown, PanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DriverNavbarProps {
  userName?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  activeTab?: string;
  onToggleSidebar?: () => void;
}

export function DriverNavbar({ userName = 'Driver', onLogout, onProfileClick, onSettingsClick, onToggleSidebar }: DriverNavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Call the onLogout callback if provided
    onLogout?.();
    
    // Navigate to login page
    navigate('/auth/login', { replace: true });
  };
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile: Sidebar trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-1"
            onClick={() => onToggleSidebar?.()}
            aria-label="Open menu"
          >
            <PanelLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-lg bg-linear-to-r from-green-600 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">RwaRide</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <Badge className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs">
              2
            </Badge>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100 rounded-lg">
                <Avatar className="w-9 h-9 border-2 border-gray-200">
                  <AvatarFallback className="bg-linear-to-r from-green-600 to-blue-600 text-white text-sm font-semibold">
                    {userName?.charAt(0).toUpperCase() || 'D'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-semibold text-gray-900">{userName}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* Profile Header */}
              <div className="px-4 py-3 border-b bg-linear-to-r from-green-50 to-blue-50">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-600">Driver Account</p>
              </div>

              {/* Profile Management - Links to Settings Tab */}
              <DropdownMenuItem 
                onClick={() => {
                  onProfileClick?.();
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50"
              >
                <User className="w-4 h-4 text-green-600" />
                <span>Profile Management</span>
              </DropdownMenuItem>

              {/* Settings - Links to Settings Tab */}
              <DropdownMenuItem 
                onClick={() => {
                  onSettingsClick?.();
                }}
                className="gap-2 cursor-pointer hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 text-blue-600" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="gap-2 cursor-pointer hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600"
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
