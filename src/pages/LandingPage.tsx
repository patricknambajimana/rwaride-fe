import { Hero } from "../components/hero/Hero";
import { Stats } from "../components/stats/Stats";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Features } from "../components/Features/Feature";
import { DriverSteps } from "../components/how-it-works/DriverSteps";
import { PassengerSteps } from "../components/how-it-works/PassengerSteps";
import { JoinRwaRide } from "../components/joinrwaride/JoinRwaride";

export function LandingPage() {
  function handleStart() {
    console.log("Clicked!");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar onGetStarted={handleStart} />
      <Hero onGetStarted={handleStart} />
      <Stats />
      <DriverSteps />
      <PassengerSteps />
      <Features />
      <JoinRwaRide onGetStarted={handleStart} />
      <Footer />
    </div>
  );
}
