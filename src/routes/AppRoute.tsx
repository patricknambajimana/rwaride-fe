import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AdminDashboard from "../pages/admin/AdminDashboard";
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
          <Route
            path="/admin"
            element={
              
                <AdminDashboard />
             
            }
          />
          
          <Route path="/auth/login" element={<Login onSuccess={() => {}} onSwitchToSignUp={() => {}} />} />
          <Route path="/auth/signup" element={<SignUp onSuccess={() => {}} onSwitchToLogin={() => {}} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
