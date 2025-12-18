import { ReactNode } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AdminLayout({
  children,
  userName = 'Admin',
  onLogout,
  activeTab = 'overview',
  onTabChange,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <AdminNavbar 
        userName={userName} 
        onLogout={onLogout}
        onProfileClick={() => onTabChange?.('settings')}
        onSettingsClick={() => onTabChange?.('settings')}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar activeItem={activeTab} onSelect={onTabChange || (() => {})} />

        {/* Content */}
        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="container mx-auto px-4 md:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
