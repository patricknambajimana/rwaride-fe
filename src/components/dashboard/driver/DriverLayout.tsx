import { ReactNode, useState } from 'react';
import { DriverNavbar } from './DriverNavbar';
import { DriverSidebar } from './DriverSidebar';
import { Sheet, SheetContent } from '../../ui/sheet';

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <DriverNavbar 
        userName={userName} 
        onLogout={onLogout}
        onProfileClick={() => onTabChange?.('settings')}
        onSettingsClick={() => onTabChange?.('settings')}
        onToggleSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Mobile Sidebar Drawer */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 md:hidden">
            <DriverSidebar 
              isMobileVariant
              activeItem={activeTab} 
              onSelect={(id) => { onTabChange?.(id); setMobileSidebarOpen(false); }}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <DriverSidebar activeItem={activeTab} onSelect={onTabChange || (() => {})} />

        {/* Content */}
        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="container mx-auto px-4 md:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

