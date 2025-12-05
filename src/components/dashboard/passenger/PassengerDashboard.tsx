import { useState, useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { ChatDialog } from "./ChatDialog";
import { PassengerHeader } from "./PassengerHeader";
import { SearchForm } from "./SearchForm";
import { TripList } from "./TripList";
import { BookingsList } from "./BookingsList";
import { ProfileSection } from "./ProfileSection";

interface PassengerDashboardProps {
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  onLogout: () => void;

  // NEW reusable handlers
  onSearchTrips: (from: string, to: string, date: string) => Promise<any[]>;
  onBookTrip: (tripId: string) => void;
  onRateTrip: (bookingId: string, rating: number) => void;
  fetchBookings: () => Promise<any[]>;
}

export function PassengerDashboard({
  user,
  onLogout,
  onSearchTrips,
  onBookTrip,
  onRateTrip,
  fetchBookings,
}: PassengerDashboardProps) {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const bookings = await fetchBookings();
    setMyBookings(bookings || []);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trips = await onSearchTrips(searchFrom, searchTo, searchDate);
    setAvailableTrips(trips || []);

    setLoading(false);
  };

  const openChat = (trip: any) => {
    setSelectedTrip(trip);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PassengerHeader userName={user.name} onLogout={onLogout} />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Rides</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Find Your Ride</h3>
                <p className="text-sm text-gray-600">
                  Search for available trips to your destination
                </p>
                <div className="mt-4">
                  <SearchForm
                    from={searchFrom}
                    to={searchTo}
                    date={searchDate}
                    setFrom={setSearchFrom}
                    setTo={setSearchTo}
                    setDate={setSearchDate}
                    onSubmit={handleSearch}
                    loading={loading}
                  />
                </div>
              </div>
            </Card>

            {availableTrips.length === 0 && !loading ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <p>No trips found. Try adjusting your search.</p>
                </CardContent>
              </Card>
            ) : (
              <TripList
                trips={availableTrips}
                onBookTrip={onBookTrip}
                openChat={openChat}
              />
            )}
          </TabsContent>

          <TabsContent value="bookings">
            {myBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <p>No bookings yet.</p>
                </CardContent>
              </Card>
            ) : (
              <BookingsList bookings={myBookings} onRateTrip={onRateTrip} />
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <div className="mt-4">
                  <ProfileSection user={user} />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {chatOpen && selectedTrip && (
        <ChatDialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          tripId={selectedTrip.id}
          recipientId={selectedTrip.driver_id}
          recipientName={selectedTrip.driver_name}
        />
      )}
    </div>
  );
}
