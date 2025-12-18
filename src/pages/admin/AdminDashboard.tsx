import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from '../../components/dashboard/admin/AdminLayout';
import { AdminDashboardIntegrated } from '../../components/dashboard/admin/AdminDashboardIntegrated';
import { AdminUsersPage } from './AdminUsersPage';
import { AdminTripsPage } from './AdminTripsPage';
import { AdminBookingsPage } from './AdminBookingsPage';
import { AdminAnalyticsPage } from './AdminAnalyticsPage';
import { AdminVerificationPage } from './AdminVerificationPage';
import { AdminDisputesPage } from './AdminDisputesPage';
import { AdminSettingsPage } from './AdminSettingsPage';

interface AdminDashboardProps {
  user?: any;
  onLogout?: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const currentUser = user || authUser;
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate('/auth/login');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminDashboardIntegrated activeTab={activeTab} />;
      case 'users':
        return <AdminUsersPage />;
      case 'trips':
        return <AdminTripsPage />;
      case 'bookings':
        return <AdminBookingsPage />;
      case 'analytics':
        return <AdminAnalyticsPage />;
      case 'verification':
        return <AdminVerificationPage />;
      case 'disputes':
        return <AdminDisputesPage />;
      case 'settings':
        return <AdminSettingsPage />;
      default:
        return <AdminDashboardIntegrated activeTab={activeTab} />;
    }
  };

  return (
    <AdminLayout
      userName={currentUser?.name || 'Admin'}
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="p-8">
        {renderContent()}
      </div>
    </AdminLayout>
  );
}
