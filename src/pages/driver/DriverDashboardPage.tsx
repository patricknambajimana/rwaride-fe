import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DriverDashboard as DriverDashboardComponent } from '../../components/dashboard/driver';

interface DriverDashboardPageProps {
  user?: any;
  onLogout?: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardPageProps) {
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
    <DriverDashboardComponent
      userName={currentUser?.name}
      onLogout={handleLogout}
    />
  );
}