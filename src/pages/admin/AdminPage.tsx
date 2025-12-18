import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NewAdminDashboard } from '../../components/dashboard/admin';

interface AdminDashboardProps {
  user?: any;
  onLogout?: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const currentUser = user || authUser;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate('/auth/login');
    }
  };

  return (
    <NewAdminDashboard
      userName={currentUser?.name || 'Admin'}
      onLogout={handleLogout}
    />
  );
}