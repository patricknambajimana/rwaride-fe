import { Hero } from "../../components/hero/Hero";
import { Stats } from "../../components/stats/Stats";
import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";
import { Features } from "../../components/Features/Feature";
import { DriverSteps } from "../../components/how-it-works/DriverSteps";
import { PassengerSteps } from "../../components/how-it-works/PassengerSteps";
import { JoinRwaRide } from "../../components/joinrwaride/JoinRwaride";

export function LandingPage() {
  function handleStart() {
    console.log("Clicked!");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar onGetStarted={handleStart} />
      <section id="home" className="scroll-mt-24">
        <Hero onGetStarted={handleStart} />
      </section>
      <section id="stats" className="scroll-mt-24">
        <Stats />
      </section>
      <section id="driver" className="scroll-mt-24 space-y-8">
        <DriverSteps />
        </section>
        <section id="passenger" className="scroll-mt-24 space-y-8" >
        <PassengerSteps />
      </section>
      <section id="features" className="scroll-mt-24">
        <Features />
      </section>
      <section id="join" className="scroll-mt-24">
        <JoinRwaRide onGetStarted={handleStart} />
      </section>
      <section id="contact" className="scroll-mt-24">
        <Footer />
      </section>
    </div>
  );
}
