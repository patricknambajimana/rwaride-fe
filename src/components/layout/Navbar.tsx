import { Car } from "lucide-react";
import { Button } from "../ui/button";


interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-blue-500 p-2 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              RwaRide
            </h1>
            <p className="text-xs text-gray-600">Smart Carpooling for Rwanda</p>
          </div>
        </div>

        <Button size="lg" onClick={onGetStarted}>Get Started</Button>
      </div>
    </header>
  );
}
