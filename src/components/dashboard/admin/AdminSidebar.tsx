import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import {
  LayoutDashboard,
  Users,
  MapPin,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Settings,
  AlertTriangle,
  BarChart3,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface AdminSidebarProps {
  activeItem: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function AdminSidebar({
  activeItem,
  onSelect,
  className,
}: AdminSidebarProps) {
  const menuItems: MenuItem[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users & Accounts", icon: Users },
    { id: "verification", label: "Verification", icon: ShieldCheck, badge: 5 },
    { id: "disputes", label: "Disputes & Reports", icon: AlertTriangle },
    { id: "trips", label: "Rides Management", icon: MapPin },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-20 bottom-0 pt-8 hidden md:flex flex-col overflow-y-auto z-40",
        className
      )}
    >
      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onSelect(item.id)}
              className={cn(
                "w-full justify-start gap-3 relative transition-all duration-200 font-medium",
                isActive
                  ? "bg-linear-to-r from-green-500 to-blue-500 text-white shadow-md hover:from-green-600 hover:to-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-600")} />
              <span className="font-medium">{item.label}</span>

              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
