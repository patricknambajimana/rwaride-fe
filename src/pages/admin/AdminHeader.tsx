import { Button } from '@/components/ui/button';
import { BarChart3, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  userName: string;
  onLogout: () => void;
}

export function AdminHeader({ userName, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b top-0 z-10 fixed">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">RwaRide Admin</span>
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
