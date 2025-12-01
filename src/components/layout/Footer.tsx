import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">RwaRide</h2>
          <p className="mt-2 text-sm">
            Smart, safe, and affordable carpooling solutions for Rwanda.
          </p>

          <div className="flex gap-3 mt-4">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Find a Ride</li>
            <li className="hover:text-white cursor-pointer">Become a Driver</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              support@rwaride.rw
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-400" />
              +250 788 123 456
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              Kigali, Rwanda
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} RwaRide. All rights reserved.
      </p>
    </footer>
  );
}
