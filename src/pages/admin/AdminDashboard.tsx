import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent } from "../../components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { Link } from "react-router-dom";

const StatCard: React.FC<{ title: string; value: string; delta?: string; icon?: React.ReactNode; accent?: string }> = ({ title, value, delta, icon, accent }) => (
  <Card className="p-4 flex items-center gap-3">
    <div className={`w-10 h-10 rounded-md flex items-center justify-center ${accent ?? "bg-blue-50"}`}>{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
      {delta && <div className="text-xs text-green-600 mt-1">{delta}</div>}
    </div>
  </Card>
);

const AdminDashboard: React.FC = () => {
  // Placeholder chart data; integrate real data via context/redux later
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul"];
  const revenueData = labels.map((label, i) => ({ label, revenue: [500,450,700,1200,1500,1800,2200][i] }));
  const usersData = labels.map((label, i) => ({ label, users: [1200,1500,1900,2300,2800,3200,4100][i] }));

  const recentActivity = [
    { iconColor: "bg-blue-100", title: "New user registered", by: "Sarah Johnson", time: "2 minutes ago" },
    { iconColor: "bg-green-100", title: "Driver verification completed", by: "Peter Omwami", time: "5 minutes ago" },
    { iconColor: "bg-yellow-100", title: "Trip cancelled by driver", by: "Kipti to Gikondo", time: "8 minutes ago" },
  ];

  const pendingVerifications = [
    { name: "James Mugisha", car: "Toyota - RAD 123A" },
    { name: "Eric Nzeyimana", car: "Honda Civic - RAC 456B" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="p-4 font-semibold text-primary">RwaRide Admin</div>
        <Separator />
        <nav className="p-2 space-y-1 text-sm">
          <Button variant="ghost" asChild className="w-full justify-start text-primary hover:bg-primary/10">
            <Link to="/admin">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/users">Users</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/drivers">Drivers</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/trips">Trips</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/bookings">Bookings</Link>
          </Button>
          <div className="mt-2 text-xs px-2 text-muted-foreground">Management</div>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/payments">Payments</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/reviews">Reviews</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/verification">Verification</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/settings">Settings</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/admin/profile">Profile Management</Link>
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-muted/30">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div>
            <h1 className="text-xl font-semibold text-primary">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">Monitor your RwaRide platform performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/admin-avatar.png" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">John Admin</div>
            <Button variant="outline" asChild size="sm">
              <Link to="/admin/profile">Manage Profile</Link>
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <StatCard title="Total Users" value="12,847" delta="↑ 12% from last month" accent="bg-primary/10" />
          <StatCard title="Active Trips" value="1,234" delta="↑ 8% from yesterday" accent="bg-emerald-100" />
          <StatCard title="Total Revenue" value="RWF 2.4M" delta="↑ 15% from last month" accent="bg-amber-100" />
          <StatCard title="Pending Verifications" value="45" delta="Requires attention" accent="bg-rose-100" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <Card className="p-4">
            <div className="font-semibold mb-2">Revenue Trends</div>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                <ChartLegend content={<></>} />
              </LineChart>
            </ChartContainer>
          </Card>
          <Card className="p-4">
            <div className="font-semibold mb-2">User Growth</div>
            <ChartContainer config={{ users: { label: "Users", color: "hsl(var(--success, 142 76% 36%))" } }}>
              <BarChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4,4,0,0]} />
                <ChartLegend content={<></>} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>

        {/* Activity and verifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 pb-8">
          <Card className="p-4">
            <div className="font-semibold mb-2">Recent Activity</div>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.iconColor}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.by} • {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Pending Verifications</div>
              <div className="text-xs text-muted-foreground">45 pending</div>
            </div>
            <div className="space-y-3">
              {pendingVerifications.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/driver.png" />
                    <AvatarFallback>{v.name.slice(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.car}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default">Approve</Button>
                    <Button size="sm" variant="destructive">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
