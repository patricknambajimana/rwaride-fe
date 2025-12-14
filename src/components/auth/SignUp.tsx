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
// Integrate RTK Query auth API
import { useRegisterMutation } from "../../services/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/slices/authSlice";
import { validateSignUp, type ValidationError } from "../../lib/validation";
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
  const dispatch = useDispatch();
  const { signup: authContextSignup } = useAuth();
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"passenger" | "driver">(
    "passenger"
  );
  const [phone, setPhone] = useState("");
  const [driverLicenseId, setDriverLicenseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showVehicle, setShowVehicle] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    // Client-side validation
    const validation = validateSignUp({
      full_name: name,
      email,
      phone_number: phone,
      password,
      role,
      driver_license_id: driverLicenseId,
    });

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
      // Build registration payload based on role
      const registrationData: {
        full_name: string;
        email: string;
        phone_number: string;
        password: string;
        role: 'driver' | 'passenger';
        driver_license_id?: string;
      } = {
        full_name: name,
        email,
        phone_number: phone,
        password,
        role,
      };

      // Add driver license ONLY for driver role
      if (role === "driver" && driverLicenseId) {
        registrationData.driver_license_id = driverLicenseId;
      }

      // Call register API endpoint
      const res = await registerUser(registrationData).unwrap();

      // Store access token in Redux
      if (res?.access_token) {
        dispatch(setCredentials({ 
          token: res.access_token, 
          user: { 
            id: '', // Backend should return user details
            name: name,
            role: role 
          } 
        }));
      }

      // Also update AuthContext for ProtectedRoute compatibility
      await authContextSignup(name, email, password, role);

      // Success message
      console.log(` Registration successful! Redirecting to ${role} dashboard...`);

      // Navigate to role-specific dashboard immediately
      // Use replace: true to prevent back navigation to signup
      if (role === "driver") {
        navigate("/driver", { replace: true });
      } else if (role === "passenger") {
        navigate("/passenger", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      // Extract error message from backend response
      const errorMessage = err?.data?.msg || err?.data?.message || err?.message || "Sign up failed. Please try again.";
      setError(errorMessage);
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
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors(prev => ({ ...prev, full_name: '' }));
                }}
                required
                placeholder="John Doe"
                className={`mt-0.5 h-8 text-xs ${fieldErrors.full_name ? 'border-red-500' : ''}`}
              />
              {fieldErrors.full_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.full_name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors(prev => ({ ...prev, email: '' }));
                }}
                required
                placeholder="you@example.com"
                className={`mt-0.5 h-8 text-xs ${fieldErrors.email ? 'border-red-500' : ''}`}
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFieldErrors(prev => ({ ...prev, phone_number: '' }));
                }}
                required
                placeholder="+250 788 123 456"
                className={`mt-0.5 h-8 text-xs ${fieldErrors.phone_number ? 'border-red-500' : ''}`}
              />
              {fieldErrors.phone_number && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone_number}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors(prev => ({ ...prev, password: '' }));
                }}
                required
                placeholder="••••••••"
                minLength={6}
                className={`mt-0.5 h-8 text-xs ${fieldErrors.password ? 'border-red-500' : ''}`}
              />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
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

                {/* Driver License ID - required for driver registration */}
                <div className="mt-2">
                  <Label htmlFor="driver_license" className="text-xs font-medium">Driver License ID</Label>
                  <Input
                    id="driver_license"
                    type="text"
                    value={driverLicenseId}
                    onChange={(e) => {
                      setDriverLicenseId(e.target.value);
                      setFieldErrors(prev => ({ ...prev, driver_license_id: '' }));
                    }}
                    required
                    placeholder="RWA12345D"
                    className={`mt-0.5 h-7 text-xs ${fieldErrors.driver_license_id ? 'border-red-500' : ''}`}
                  />
                  {fieldErrors.driver_license_id && <p className="text-red-500 text-xs mt-1">{fieldErrors.driver_license_id}</p>}
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
              {loading || isRegistering ? "Creating..." : "Sign Up"}
            </Button>

            {/* Google Authentication */}
            <div className="relative my-1.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-600">Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-xs"
              onClick={() => {
                // TODO: Implement Google OAuth flow
                console.log('Google signup clicked');
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <image href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3Cpath fill='none' d='M1 1h22v22H1z'/%3E%3C/svg%3E" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
              </svg>
              <span className="font-medium text-gray-700">Google</span>
            </button>

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
