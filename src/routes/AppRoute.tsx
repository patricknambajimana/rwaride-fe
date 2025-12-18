import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProfileManagement from "../pages/admin/ProfileManagement";
import { ProtectedRoute } from "./ProtectedRoute";
import { LandingPage } from "../pages/homepage/LandingPage";
import PassengerPage from "../pages/passenger/PassengerPage";
import { Login } from "../components/auth/Login";
import { SignUp } from "../components/auth/SignUp";
import { DriverDashboard } from "../pages/driver/DriverDashboardPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/passenger"
            element={
              <ProtectedRoute requiredRole="passenger">
                <PassengerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver"
            element={
             
                <DriverDashboard user={null} onLogout={() => { console.log('Logged out'); }} />
              
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/drivers" element={<AdminDashboard />} />
          <Route path="/admin/trips" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminDashboard />} />
          <Route path="/admin/payments" element={<AdminDashboard />} />
          <Route path="/admin/reviews" element={<AdminDashboard />} />
          <Route path="/admin/verification" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<ProfileManagement />} />
          <Route path="/auth/login" element={<Login onSuccess={() => {}} onSwitchToSignUp={() => {}} />} />
          <Route path="/auth/signup" element={<SignUp onSuccess={() => {}} onSwitchToLogin={() => {}} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
