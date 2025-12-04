import React from "react";
import { MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  userName: string;
  onLogout: () => void;
}

export function PassengerHeader({ userName, onLogout }: Props) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span>RwaRide</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {userName}</span>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
