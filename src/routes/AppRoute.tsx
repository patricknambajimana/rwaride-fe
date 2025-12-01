import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { FindRide}  from "../pages/FindRide";
import { BecomeDriver } from "../pages/BecomeDriver";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-ride" element={<FindRide />} />
        <Route path="/driver" element={<BecomeDriver />} />
      </Routes>
    </BrowserRouter>
  );
}
