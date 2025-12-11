import { useState, useEffect } from 'react';
import { DriverHeader } from './DriverHeader';
import { DashboardStats, RecentTripsCard } from './DashboardSection';
import { CreateTripCTA } from './CreateTripCTA';
import { CreateTripForm } from './CreateTripForm';
import { BookingRequest } from './BookingRequest';
import { NavigationScreen } from './NavigationScreen';
import { RideActive } from './RideActive';
import { RideComplete } from './RideComplete';
import { RatePassenger } from './RatePassenger';

type DriverStep =
  | 'dashboard'
  | 'create-trip'
  | 'waiting'
  | 'booking-request'
  | 'navigate'
  | 'ride-active'
  | 'ride-complete'
  | 'rate-passenger';

interface DriverFlowProps {
  user: any;
  onLogout: () => void;
}

export function DriverFlow({ user, onLogout }: DriverFlowProps) {
  const [currentStep, setCurrentStep] = useState<DriverStep>('dashboard');
  const [myTrips, setMyTrips] = useState<any[]>([
    {
      id: '1',
      from_location: 'Kigali',
      to_location: 'Huye',
      departure_date: '2025-12-12',
      departure_time: '08:00',
      status: 'active',
      bookings: [{ id: '1' }, { id: '2' }],
    },
  ]);
  const [activeTrip, setActiveTrip] = useState<any>(null);
  const [pendingBooking, setPendingBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [navigationProgress, setNavigationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep === 'waiting') {
        simulatePendingBooking();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const simulatePendingBooking = () => {
    // Simulate receiving a booking
    if (Math.random() > 0.7) {
      setPendingBooking({
        id: '1',
        passenger_name: 'John Doe',
      });
      setCurrentStep('booking-request');
    }
  };

  const handleCreateTrip = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setActiveTrip({
      id: Math.random().toString(),
      ...data,
      status: 'active',
    });
    alert('Trip created successfully!');
    setCurrentStep('waiting');
    setLoading(false);
  };

  const handleAcceptBooking = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert('Booking accepted!');
    setCurrentStep('navigate');
    simulateNavigation();
  };

  const handleRejectBooking = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert('Booking rejected');
    setPendingBooking(null);
    setCurrentStep('waiting');
  };

  const simulateNavigation = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setNavigationProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setCurrentStep('ride-active');

        // Auto-complete ride after 10 seconds
        setTimeout(() => {
          setCurrentStep('ride-complete');
        }, 10000);
      }
    }, 1000);
  };

  const handleRatePassenger = (rating: number) => {
    alert(`Passenger rated ${rating} stars`);
    setCurrentStep('dashboard');
    setActiveTrip(null);
    setPendingBooking(null);
  };

  const calculateEarnings = () => {
    return myTrips.reduce((total, trip) => {
      const bookedSeats = (trip.total_seats || 0) - (trip.available_seats || 0);
      return total + (bookedSeats * (trip.price_per_seat || 0));
    }, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      <DriverHeader 
        userName={user.name} 
        userId={user.id} 
        onLogout={onLogout} 
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {currentStep === 'dashboard' && (
          <div className="space-y-6">
            <DashboardStats 
              totalTrips={myTrips.length} 
              earnings={calculateEarnings()} 
            />
            <CreateTripCTA onClick={() => setCurrentStep('create-trip')} />
            <RecentTripsCard trips={myTrips} />
          </div>
        )}

        {currentStep === 'create-trip' && (
          <CreateTripForm
            onSubmit={handleCreateTrip}
            onBack={() => setCurrentStep('dashboard')}
            loading={loading}
          />
        )}

        {currentStep === 'waiting' && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Waiting for passenger bookings...</p>
          </div>
        )}

        {currentStep === 'booking-request' && pendingBooking && (
          <BookingRequest
            passengerName={pendingBooking.passenger_name}
            from={activeTrip?.fromLocation}
            to={activeTrip?.toLocation}
            onAccept={handleAcceptBooking}
            onReject={handleRejectBooking}
          />
        )}

        {currentStep === 'navigate' && (
          <NavigationScreen progress={navigationProgress} />
        )}

        {currentStep === 'ride-active' && activeTrip && (
          <RideActive 
            from={activeTrip.fromLocation} 
            to={activeTrip.toLocation} 
          />
        )}

        {currentStep === 'ride-complete' && activeTrip && (
          <RideComplete
            earnings={activeTrip.pricePerSeat}
            onRate={() => setCurrentStep('rate-passenger')}
          />
        )}

        {currentStep === 'rate-passenger' && pendingBooking && (
          <RatePassenger
            passengerName={pendingBooking.passenger_name}
            onRate={handleRatePassenger}
            onSkip={() => {
              setCurrentStep('dashboard');
              setActiveTrip(null);
              setPendingBooking(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
