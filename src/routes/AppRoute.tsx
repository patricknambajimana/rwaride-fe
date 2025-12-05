import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/homepage/LandingPage";
import PassengerPage from "../pages/passenger/PassengerPage";
import {Login} from "../components/auth/Login";
import { SignUp } from "../components/auth/SignUp";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/auth/login" element={<Login onSuccess={() => {}} onSwitchToSignUp={() => {}} />} />
        <Route path="/auth/signup" element={<SignUp onSuccess={() => {}} onSwitchToLogin={() => {}} />} />
      </Routes>
    </BrowserRouter>
  );
}
