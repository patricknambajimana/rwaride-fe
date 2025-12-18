import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from '../../components/dashboard/admin/AdminLayout';
import { AdminDashboardIntegrated } from '../../components/dashboard/admin/AdminDashboardIntegrated';

interface AdminDashboardProps {
  user?: any;
  onLogout?: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
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

  return (
    <AdminLayout
      userName={currentUser?.name || 'Admin'}
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <AdminDashboardIntegrated activeTab={activeTab} />
    </AdminLayout>
  );
}