import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  MessageSquare,
  CreditCard,
  History,
  Settings,
  Car,
  PlusCircle,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface DriverSidebarProps {
  activeItem: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function DriverSidebar({
  activeItem,
  onSelect,
  className,
}: DriverSidebarProps) {
  const menuItems: MenuItem[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "create", label: "Create Trip", icon: PlusCircle },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "rides", label: "Active Passengers", icon: MapPin },
    { id: "car-registration", label: "Car Registration", icon: Car },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
    { id: "earnings", label: "Earnings", icon: CreditCard },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-20 bottom-0 pt-8 hidden md:flex flex-col overflow-y-auto",
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
                "w-full justify-start gap-3 relative transition-all duration-200",
                isActive
                  ? "bg-linear-to-r from-green-500 to-blue-500 text-white shadow-md hover:from-green-600 hover:to-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
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
