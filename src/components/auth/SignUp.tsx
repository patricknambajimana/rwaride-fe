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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Car } from "lucide-react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"passenger" | "driver" | "admin">(
    "passenger"
  );
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call parent onSuccess handler
    onSuccess(email, password, role, name, phone);

    // Navigate based on role
    if (role === "driver") {
      navigate("/driver-dashboard");
    } else if (role === "passenger") {
      navigate("/passenger");
    } else {
      // Admin or default
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-600 to-blue-600 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Welcome to RwaRide</CardTitle>
          <CardDescription>
            Create your account to start carpooling
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+250 XXX XXX XXX"
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
                placeholder="Create a strong password"
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I want to join as</Label>
              <Select
                value={role}
                onValueChange={(value: any) => setRole(value)}
               
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="passenger">Passenger</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-green-600 hover:underline"
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
