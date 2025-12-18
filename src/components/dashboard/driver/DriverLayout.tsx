import { ReactNode } from 'react';
import { DriverNavbar } from './DriverNavbar';
import { DriverSidebar } from './DriverSidebar';

interface DriverLayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DriverLayout({
  children,
  userName = 'Driver',
  onLogout,
  activeTab = 'overview',
  onTabChange,
}: DriverLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <DriverNavbar 
        userName={userName} 
        onLogout={onLogout}
        onProfileClick={() => onTabChange?.('settings')}
        onSettingsClick={() => onTabChange?.('settings')}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <DriverSidebar activeItem={activeTab} onSelect={onTabChange || (() => {})} />

        {/* Content */}
        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="container mx-auto px-4 md:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

