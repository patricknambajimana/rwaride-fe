import { ReactNode } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";

interface PassengerLayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
}

export function PassengerLayout({
  children,
  userName,
  onLogout,
}: PassengerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar userName={userName} onLogout={onLogout} userRole="passenger" />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
