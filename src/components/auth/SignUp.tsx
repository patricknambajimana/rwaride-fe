import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Car, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SignUpProps {
  onSuccess: (
    email: string,
    password: string,
    role: "passenger" | "driver" | "admin",
    name: string,
    phone: string
  ) => void;
  onSwitchToLogin: () => void;
}

export function SignUp({ onSuccess, onSwitchToLogin }: SignUpProps) {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"passenger" | "driver">(
    "passenger"
  );
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVehicle, setShowVehicle] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Use AuthContext to signup
      await signup(name, email, password, role);
      onSuccess(email, password, role, name, phone);

      // Navigate based on role
      if (role === "driver") {
        navigate("/driver");
      } else if (role === "passenger") {
        navigate("/passenger");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/90 p-2">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center bg-linear-to-r from-green-500 to-blue-500 text-white rounded-t-lg py-3">
          <div className="flex justify-center mb-1">
            <div className="bg-white p-1.5 rounded-full shadow-lg">
              <Car className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-lg font-bold">RwaRide</CardTitle>
          <CardDescription className="text-green-50 text-xs">
            Join our carpooling community
          </CardDescription>
        </CardHeader>

        <CardContent className="p-3">
          {/* Role Selection */}
          <div className="mb-2 space-y-1">
            <Label className="text-xs font-semibold text-gray-800">I am a</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {/* Passenger Option */}
              <button
                type="button"
                onClick={() => {
                  setRole("passenger");
                  setShowVehicle(false);
                }}
                className={`p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  role === "passenger"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300"
                }`}
              >
                <Users className={`w-4 h-4 mx-auto mb-0.5 ${role === "passenger" ? "text-blue-600" : "text-gray-600"}`} />
                <p className={`text-xs font-bold ${role === "passenger" ? "text-blue-600" : "text-gray-800"}`}>
                  Passenger
                </p>
              </button>

              {/* Driver Option */}
              <button
                type="button"
                onClick={() => {
                  setRole("driver");
                  setShowVehicle(true);
                }}
                className={`p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  role === "driver"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50 hover:border-green-300"
                }`}
              >
                <Car className={`w-4 h-4 mx-auto mb-0.5 ${role === "driver" ? "text-green-600" : "text-gray-600"}`} />
                <p className={`text-xs font-bold ${role === "driver" ? "text-green-600" : "text-gray-800"}`}>
                  Driver
                </p>
              </button>
            </div>
          </div>

          <hr className="my-2" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-1.5">
            {/* Basic Information */}
            <div>
              <Label htmlFor="name" className="text-xs font-medium">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="mt-0.5 h-8 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-0.5 h-8 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+250 788 123 456"
                className="mt-0.5 h-8 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
                className="mt-0.5 h-8 text-xs"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded text-xs">
                {error}
              </div>
            )}

            {/* Driver-Specific Fields - Hidden by default, shown on toggle */}
            {showVehicle && role === "driver" && (
              <div className="space-y-1 p-2 bg-green-50 rounded border border-green-200">
                <h4 className="font-semibold text-xs text-green-800">Vehicle (Optional)</h4>
                
                <div className="grid grid-cols-2 gap-1">
                  <Input placeholder="Make" className="h-7 text-xs" />
                  <Input placeholder="Model" className="h-7 text-xs" />
                  <Input placeholder="Year" type="number" className="h-7 text-xs" />
                  <Input placeholder="Plate" className="h-7 text-xs" />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full h-8 font-semibold text-xs transition-all duration-200 mt-1 ${
                role === "driver"
                  ? "bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <div className="text-center text-xs mt-1">
              <span className="text-gray-600">Have account? </span>
                <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-green-600 font-semibold hover:text-green-700 hover:underline"
                >
                Log In
                </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
