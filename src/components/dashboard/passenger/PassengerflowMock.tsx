

import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  CreditCard,
  Navigation,
  CheckCircle,
  ArrowLeft,
  LogOut,
} from "lucide-react";

type FlowStep =
  | "dashboard"
  | "search"
  | "results"
  | "booking"
  | "payment"
  | "confirmed"
  | "tracking"
  | "during-ride"
  | "complete"
  | "rating";

interface Trip {
  id: string;
  driver_name: string;
  driver_rating?: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  price_per_seat: number;
}

interface Booking {
  id: string;
  from_location: string;
  to_location: string;
  driver_name: string;
  status: string;
}

interface PassengerFlowProps {
  user: any;
  onLogout: () => void;
}

export function PassengerFlow({ user, onLogout }: PassengerFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("dashboard");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Payment details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  // Tracking
  const [eta, setEta] = useState(15);

  // Use dummy data for trips and bookings
  const dummyTrips: Trip[] = [
    {
      id: "trip1",
      driver_name: "John Doe",
      driver_rating: "4.8",
      from_location: "Kigali",
      to_location: "Nyamirambo",
      departure_date: new Date().toISOString(),
      departure_time: "10:30 AM",
      available_seats: 3,
      price_per_seat: 3000,
    },
    {
      id: "trip2",
      driver_name: "Jane Smith",
      driver_rating: "5.0",
      from_location: "Kigali",
      to_location: "Gisenyi",
      departure_date: new Date().toISOString(),
      departure_time: "11:00 AM",
      available_seats: 2,
      price_per_seat: 5000,
    },
  ];

  const dummyBookings: Booking[] = [
    {
      id: "booking1",
      from_location: "Kigali",
      to_location: "Nyamirambo",
      driver_name: "John Doe",
      status: "completed",
    },
    {
      id: "booking2",
      from_location: "Kigali",
      to_location: "Gisenyi",
      driver_name: "Jane Smith",
      status: "confirmed",
    },
  ];

  useEffect(() => {
    // Load dummy bookings
    setMyBookings(dummyBookings);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Filter dummy trips
      const trips = dummyTrips.filter(
        (trip) =>
          trip.from_location.toLowerCase().includes(searchFrom.toLowerCase()) &&
          trip.to_location.toLowerCase().includes(searchTo.toLowerCase())
      );
      setAvailableTrips(trips);
      setCurrentStep("results");
      setLoading(false);
    }, 500);
  };

  const handleSelectRide = (trip: Trip) => {
    setSelectedTrip(trip);
    setCurrentStep("booking");
  };

  const handleConfirmBooking = () => {
    setCurrentStep("payment");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (selectedTrip) {
        const booking: Booking = {
          id: `booking-${Math.random().toString(36).substring(2, 7)}`,
          from_location: selectedTrip.from_location,
          to_location: selectedTrip.to_location,
          driver_name: selectedTrip.driver_name,
          status: "confirmed",
        };
        setCurrentBooking(booking);
        setCurrentStep("confirmed");

        setTimeout(() => {
          setCurrentStep("tracking");
        }, 2000);
      }
      setLoading(false);
    }, 1000);
  };

  const simulateDriverTracking = () => {
    let timeRemaining = eta;
    const interval = setInterval(() => {
      timeRemaining -= 1;
      setEta(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setCurrentStep("during-ride");

        setTimeout(() => {
          setCurrentStep("complete");
        }, 5000);
      }
    }, 1000);
  };

  useEffect(() => {
    if (currentStep === "tracking") {
      simulateDriverTracking();
    }
  }, [currentStep]);

  const handleRateDriver = (rating: number) => {
    alert(`Thank you for rating ${rating} stars!`);
    setCurrentStep("dashboard");
    setSelectedTrip(null);
    setCurrentBooking(null);
  };

  const getProgressPercentage = () => {
    const steps = [
      "dashboard",
      "search",
      "results",
      "booking",
      "payment",
      "confirmed",
      "tracking",
      "during-ride",
      "complete",
      "rating",
    ];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">RwaRide</h1>
              <p className="text-xs text-gray-600">Welcome, {user.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
        {currentStep !== "dashboard" && (
          <Progress value={getProgressPercentage()} className="h-2" />
        )}
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Dashboard */}
        {currentStep === "dashboard" && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Find Your Ride</CardTitle>
                <CardDescription>
                  Search for available trips to your destination
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep("search")}
                  className="w-full max-w-md"
                >
                  <Search className="w-5 h-5 mr-2" /> Search for Rides
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            {myBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myBookings.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {booking.driver_name?.[0] || "D"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {booking.from_location} → {booking.to_location}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Search, Results, Booking, Payment, Tracking, etc. */}
        {/* The rest of your component logic stays the same but uses only frontend dummy data */}
      </div>
    </div>
  );
}
