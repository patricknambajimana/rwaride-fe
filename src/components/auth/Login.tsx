import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Car } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export type UserRole = "passenger" | "driver" | "admin";

interface LoginProps {
  onSuccess: (email: string, password: string, role: UserRole) => void;
  onSwitchToSignUp: () => void;
  initialEmail?: string;
  initialPassword?: string;
}

export function Login({
  onSuccess,
  onSwitchToSignUp,
  initialEmail = "",
  initialPassword = "",
}: LoginProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [role, setRole] = useState<'passenger' | 'driver'>('passenger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Use AuthContext to login
      await login(email, password, role);
      onSuccess(email, password, role);
      
      // Redirect based on role
      if (role === 'driver') {
        navigate('/driver');
      } else {
        navigate('/passenger');
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Log in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">I am a</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('passenger')}
                  className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${
                    role === 'passenger'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className={`text-sm font-medium ${role === 'passenger' ? 'text-blue-600' : 'text-gray-600'}`}>
                    Passenger
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('driver')}
                  className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${
                    role === 'driver'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className={`text-sm font-medium ${role === 'driver' ? 'text-green-600' : 'text-gray-600'}`}>
                    Driver
                  </p>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
      
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/auth/signup"
                onClick={onSwitchToSignUp}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
