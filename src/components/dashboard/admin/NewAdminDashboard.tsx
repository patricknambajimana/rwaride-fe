import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { AdminOverview } from './AdminOverview';
import { AdminUsersView } from './AdminUsersView';
import { AdminSettingsView } from './AdminSettingsView';

interface NewAdminDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

export function NewAdminDashboard({ userName = 'Admin', onLogout }: NewAdminDashboardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Detect tab from pathname (e.g., /admin/users -> 'users')
  const getTabFromPathname = () => {
    const pathname = location.pathname;
    const pathParts = pathname.split('/').filter(Boolean);
    
    if (pathParts.length > 1) {
      return pathParts[1]; // Get 'users' from '/admin/users'
    }
    
    // Fallback to query param or default
    return searchParams.get('tab') || 'overview';
  };
  
  const tabFromUrl = getTabFromPathname();
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Update URL when tab changes
  useEffect(() => {
    const newTab = getTabFromPathname();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Navigate to the new path
    navigate(`/admin/${tab}`, { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      
      case 'users':
        return <AdminUsersView />;
      
      case 'drivers':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Drivers Management</h2>
            <p className="text-gray-600">View and manage all drivers (Coming soon)</p>
          </div>
        );
      
      case 'trips':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Trips Management</h2>
            <p className="text-gray-600">Monitor all trips on the platform (Coming soon)</p>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Bookings Management</h2>
            <p className="text-gray-600">Track all bookings (Coming soon)</p>
          </div>
        );
      
      case 'payments':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Payments</h2>
            <p className="text-gray-600">Manage payment transactions (Coming soon)</p>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h2>
            <p className="text-gray-600">Monitor user reviews (Coming soon)</p>
          </div>
        );
      
      case 'verification':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Driver Verification</h2>
            <p className="text-gray-600">Verify driver documents (Coming soon)</p>
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600">Generate platform reports (Coming soon)</p>
          </div>
        );
      
      case 'settings':
        return <AdminSettingsView />;
      
      default:
        return <AdminOverview />;
    }
  };

  return (
    <AdminLayout 
      userName={userName} 
      onLogout={onLogout}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {renderContent()}
    </AdminLayout>
  );
}
