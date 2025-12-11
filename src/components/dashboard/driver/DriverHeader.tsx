import { NotificationBell } from '@/components/notification/NotificationBell';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut } from 'lucide-react';


interface DriverHeaderProps {
  userName: string;
  userId: string;
  onLogout: () => void;
}

export function DriverHeader({ userName, userId, onLogout }: DriverHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">RwaRide Driver</h1>
              <p className="text-xs text-gray-600">Welcome, {userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell userId={userId} />
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
