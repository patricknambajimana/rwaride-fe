import { Car, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface NavbarProps {
  onGetStarted?: () => void;
  userName?: string;
  onLogout?: () => void;
  userRole?: "driver" | "passenger" | "admin";
}

export function Navbar({ onGetStarted, userName, onLogout, userRole }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dashboard navbar (when user is logged in)
  if (userName && onLogout && userRole) {
    return (
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-green-500 to-blue-500 p-2 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">RwaRide</h1>
              <p className="text-xs text-gray-600 capitalize">{userRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{userName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p className="font-semibold">{userName}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Landing page navbar
  const landingLinks: { label: string; to: string; type: "hash" | "route" }[] = [
    { label: "Home", to: "/#home", type: "hash" },
    { label: "Passenger", to: "/#passenger", type: "hash" },
   
    { label: "Drivers", to: "/#driver", type: "hash" },
    { label: "Features", to: "/#features", type: "hash" },
    { label: "Contact", to: "/#contact", type: "hash" },
  ];

  const baseNavClass = "capitalize text-sm px-2 py-1 rounded-md transition-colors";
  const activeNavClass = "text-primary font-semibold bg-primary/10";
  const inactiveNavClass = "text-gray-700 hover:text-primary hover:bg-primary/5";

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-green-500 to-blue-500 p-2 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              RwaRide
            </h1>
            <p className="text-xs text-gray-600">Smart Carpooling for Rwanda</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          {landingLinks.map((item) => {
            if (item.type === "hash") {
              const targetHash = item.to.replace("/", "");
              const isActive = location.pathname === "/" && location.hash === targetHash;
              return (
                <a
                  key={item.to}
                  href={item.to}
                  className={`${baseNavClass} ${isActive ? activeNavClass : inactiveNavClass}`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${baseNavClass} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-4 ">
          <Button
            size="lg"
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-green-600 to-blue-600 text-white hover:bg-linear-to-r hover:from-blue-600 hover:to-green-600 capitalize"
          >
            Login
          </Button>
            <Button
            size="lg"
            onClick={() => navigate("/auth/signup")}
            className="capitalize bg-[#101828]"
            >
            Get Started
            </Button>
        </div>
      </div>
    </header>
  );
}
