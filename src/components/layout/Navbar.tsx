import { Car, LogOut, Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";

interface NavbarProps {
  onGetStarted?: () => void;
  userName?: string;
  onLogout?: () => void;
  userRole?: "driver" | "passenger" | "admin";
}

export function Navbar({ onGetStarted, userName, onLogout, userRole }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard navbar (when user is logged in)
  if (userName && onLogout && userRole) {
    return (
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-linear-to-br from-green-500 to-blue-500 p-2 rounded-lg flex-shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">RwaRide</h1>
              <p className="text-xs text-gray-600 capitalize truncate">{userRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                <AvatarFallback>{userName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold truncate max-w-[150px]">{userName}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-1 sm:gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Logout</span>
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

  const baseNavClass = "capitalize text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-md transition-colors whitespace-nowrap";
  const activeNavClass = "text-primary font-semibold bg-primary/10";
  const inactiveNavClass = "text-gray-700 hover:text-primary hover:bg-primary/5";

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="bg-linear-to-br from-green-500 to-blue-500 p-2 rounded-lg">
            <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              RwaRide
            </h1>
            <p className="text-xs text-gray-600 hidden sm:block">Smart Carpooling</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-3">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <Button
            size="lg"
            onClick={() => navigate("/auth/login")}
            className="bg-linear-to-r from-green-600 to-blue-600 text-white hover:bg-linear-to-r hover:from-blue-600 hover:to-green-600 capitalize text-sm"
          >
            Login
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/auth/signup")}
            className="capitalize bg-[#101828] text-sm"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {landingLinks.map((item) => {
              if (item.type === "hash") {
                const targetHash = item.to.replace("/", "");
                const isActive = location.pathname === "/" && location.hash === targetHash;
                return (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${baseNavClass} block ${isActive ? activeNavClass : inactiveNavClass}`}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `${baseNavClass} block ${isActive ? activeNavClass : inactiveNavClass}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Buttons */}
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2 border-t">
            <Button
              size="lg"
              onClick={() => {
                navigate("/auth/login");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-linear-to-r from-green-600 to-blue-600 text-white hover:bg-linear-to-r hover:from-blue-600 hover:to-green-600 capitalize text-sm"
            >
              Login
            </Button>
            <Button
              size="lg"
              onClick={() => {
                navigate("/auth/signup");
                setMobileMenuOpen(false);
              }}
              className="w-full capitalize bg-[#101828] text-sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
