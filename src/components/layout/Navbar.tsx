import { Car } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const navigate = useNavigate();
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
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="capitalize text-sm text-gray-700 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="capitalize text-sm text-gray-700 hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="capitalize text-sm text-gray-700 hover:underline"
          >
            Contact
          </Link>
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
            onClick={onGetStarted}
            className="capitalize bg-[#101828]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
