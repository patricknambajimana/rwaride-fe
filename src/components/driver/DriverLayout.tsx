import { ReactNode } from "react";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";

interface DriverLayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
}

export function DriverLayout({
  children,
  userName,
  onLogout,
}: DriverLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar userName={userName} onLogout={onLogout} userRole="driver" />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
