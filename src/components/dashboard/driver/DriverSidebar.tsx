import { LayoutDashboard, MapPin, BookOpen, MessageSquare, DollarSign, Settings, HelpCircle, Star } from "lucide-react";
import { Button } from "../../ui/button";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface Props {
  activeItem: string;
  onSelect: (id: string) => void;
}

export function DriverSidebar({ activeItem, onSelect }: Props) {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "my-trips", label: "My Trips", icon: <MapPin className="w-5 h-5" /> },
    { id: "bookings", label: "Bookings", icon: <BookOpen className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" />, badge: 2 },
    { id: "earnings", label: "Earnings", icon: <DollarSign className="w-5 h-5" /> },
    { id: "ratings", label: "Ratings", icon: <Star className="w-5 h-5" /> },
  ];

  const bottomItems: MenuItem[] = [
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen fixed left-0 top-16 bottom-0 pt-8 hidden md:flex flex-col overflow-y-auto">
      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            className="w-full justify-start gap-3 relative"
            onClick={() => onSelect(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </div>

      <div className="border-t px-4 py-4 space-y-2">
        {bottomItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSelect(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
