import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Car, BarChart3, CheckCircle } from 'lucide-react';
import { AdminHeader } from './AdminHeader';
import { StatCard } from './StatCard';
import { UsersTable } from './UsersTable';
import { TripsTable } from './TripsTable';
import { adminApi } from './adminApi';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalBookings: 0,
    activeTrips: 0,
  });
  const [users, setUsers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData, tripsData] = await Promise.all([
        adminApi.fetchStats(),
        adminApi.fetchUsers(),
        adminApi.fetchTrips(),
      ]);

      setStats(statsData.stats || stats);
      setUsers(usersData.users || []);
      setTrips(tripsData.trips || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    if (!confirm('Are you sure you want to suspend this user?')) return;

    try {
      await adminApi.suspendUser(userId);
      alert('User suspended successfully');
      loadData();
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Failed to suspend user');
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await adminApi.activateUser(userId);
      alert('User activated successfully');
      loadData();
    } catch (error) {
      console.error('Error activating user:', error);
      alert('Failed to activate user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userName={user.name} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users} 
            iconColor="text-green-500" 
          />
          <StatCard 
            title="Total Trips" 
            value={stats.totalTrips} 
            icon={Car} 
            iconColor="text-blue-500" 
          />
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            icon={CheckCircle} 
            iconColor="text-purple-500" 
          />
          <StatCard 
            title="Active Trips" 
            value={stats.activeTrips} 
            icon={BarChart3} 
            iconColor="text-orange-500" 
          />
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="trips">Trip Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTable
              users={users}
              loading={loading}
              onSuspend={handleSuspendUser}
              onActivate={handleActivateUser}
            />
          </TabsContent>

          <TabsContent value="trips">
            <TripsTable trips={trips} loading={loading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}