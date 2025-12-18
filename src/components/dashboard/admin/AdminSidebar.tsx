import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Car,
  MapPin,
  BookOpen,
  DollarSign,
  Star,
  ShieldCheck,
  Settings,
  FileText,
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
    { id: "users", label: "Users", icon: Users },
    { id: "drivers", label: "Drivers", icon: Car },
    { id: "trips", label: "Trips", icon: MapPin },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "verification", label: "Verification", icon: ShieldCheck, badge: 3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    // Call the onSelect callback to change active tab
    onSelect(itemId);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block shadow-sm",
        className
      )}
    >
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "w-full justify-start gap-3 h-11 transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md hover:from-green-700 hover:to-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-semibold rounded-full",
                    isActive
                      ? "bg-white text-green-600"
                      : "bg-red-100 text-red-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
