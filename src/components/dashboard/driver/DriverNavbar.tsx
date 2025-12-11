import { LogOut, Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";

interface Props {
  userName: string;
  onLogout: () => void;
}

export function DriverNavbar({ userName, onLogout }: Props) {
  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">RwaRide</h1>
            <p className="text-xs text-gray-600">Driver</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{userName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-sm">
              <p className="font-semibold">{userName}</p>
              <p className="text-xs text-gray-600">Driver</p>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
