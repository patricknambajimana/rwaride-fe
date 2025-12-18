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
import { useLoginMutation } from "../../services/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/slices/authSlice";
import { validateLogin, type ValidationError } from "../../lib/validation";
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
  const dispatch = useDispatch();
  const { login: authContextLogin } = useAuth();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [role, setRole] = useState<'passenger' | 'driver' | 'admin'>('passenger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    // Client-side validation
    const validation = validateLogin({ email, password });

    if (!validation.isValid) {
      // Set field-level errors
      const errors: Record<string, string> = {};
      validation.errors.forEach((err: ValidationError) => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);
      setError("Please fix the errors below and try again.");
      setLoading(false);
      return;
    }

    try {
      // Login via RTK Query
      const res = await loginUser({ email, password }).unwrap();
      
      // Store in Redux
      if (res?.access_token) {
        dispatch(setCredentials({ 
          token: res.access_token, 
          user: { 
            id: '',
            name: email.split('@')[0],
            role: role 
          } 
        }));
      }

      // Also update AuthContext for ProtectedRoute compatibility
      if (role !== 'admin') {
        await authContextLogin(email, password, role as 'driver' | 'passenger');
      }
      
      // Success message
      console.log(`Login successful! Redirecting to ${role} dashboard...`);
      
      // Redirect based on role with replace to prevent back navigation
      if (role === 'driver') {
        navigate('/driver', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/passenger', { replace: true });
      }
    } catch (err: any) {
      // Extract error message from backend response
      const errorMessage = err?.data?.msg || err?.data?.message || err?.message || "Login failed. Please try again.";
      setError(errorMessage);
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors(prev => ({ ...prev, email: '' }));
                }}
                required
                placeholder="your.email@example.com"
                className={fieldErrors.email ? 'border-red-500' : ''}
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors(prev => ({ ...prev, password: '' }));
                }}
                required
                placeholder="Enter your password"
                className={fieldErrors.password ? 'border-red-500' : ''}
              />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading || isLoggingIn ? "Logging In..." : "Log In"}
            </Button>
      
            {/* Google Authentication */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-600">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              onClick={() => {
                // TODO: Implement Google OAuth flow
                console.log('Google login clicked');
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <image href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3Cpath fill='none' d='M1 1h22v22H1z'/%3E%3C/svg%3E" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
      
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
