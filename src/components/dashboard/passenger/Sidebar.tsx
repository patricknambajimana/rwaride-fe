import { LayoutDashboard, MapPin, BookOpen, MessageSquare, CreditCard, History, Settings, HelpCircle, User, Lock, LogOut, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  isDanger?: boolean;
}

interface Props {
  activeItem: string;
  onSelect: (id: string) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  unreadCount?: number;
  isMobileVariant?: boolean;
}

export function Sidebar({ activeItem, onSelect, unreadCount, isMobileVariant }: Props) {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "find-rides", label: "Find Rides", icon: <MapPin className="w-5 h-5" /> },
    { id: "my-bookings", label: "My Bookings", icon: <BookOpen className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" />, badge: unreadCount || undefined},
    { id: "payments", label: "Payments", icon: <CreditCard className="w-5 h-5" /> },
    { id: "trip-history", label: "Trip History", icon: <History className="w-5 h-5" /> },
    { id: "setting", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const settingsItems: MenuItem[] = [
    { id: "settings-page", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

 
 

  // Mobile variant (rendered inside a Drawer/Sheet)
  if (isMobileVariant) {
    return (
      <div className="w-64 bg-white min-h-screen pt-4 flex flex-col overflow-y-auto">
        {/* Main Menu Items */}
        <div className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              className={cn("w-full justify-start gap-3 relative", {
                "bg-linear-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600": activeItem === item.id,
              })}
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

        {/* Settings Section */}
        <div className="border-t px-4 py-4 space-y-2">
          {settingsItems.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              className={cn("w-full justify-start gap-3", {
                "bg-linear-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600": activeItem === item.id,
              })}
              onClick={() => onSelect(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen fixed left-0 top-20 bottom-0 pt-8 hidden md:flex flex-col overflow-y-auto">
      {/* Main Menu Items */}
      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            className={cn("w-full justify-start gap-3 relative", {
              "bg-linear-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600": activeItem === item.id,
            })}
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

      {/* Settings Section */}
      <div className="border-t px-4 py-4 space-y-2">
       
        {settingsItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            className={cn("w-full justify-start gap-3", {
              "bg-linear-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600": activeItem === item.id,
            })}
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
