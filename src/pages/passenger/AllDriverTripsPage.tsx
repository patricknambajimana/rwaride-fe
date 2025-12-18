import { useState } from "react";
import { useGetAvailableRidesQuery, useBookRideMutation } from "../../services/store/hooks";
import { AvailableRidesDisplay } from "../../components/dashboard/passenger/AvailableRidesDisplay";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Search, RefreshCw, Filter, Car } from "lucide-react";

export function AllDriverTripsPage() {
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  
  const { data: allTrips = [], isLoading, refetch } = useGetAvailableRidesQuery({ status: "active" });
  const [bookRide, { isLoading: isBooking }] = useBookRideMutation();

  // Client-side filtering for quick search
  const filteredTrips = allTrips.filter((trip) => {
    const matchOrigin = !filterOrigin || 
      trip.origin?.toLowerCase().includes(filterOrigin.toLowerCase());
    const matchDestination = !filterDestination || 
      trip.destination?.toLowerCase().includes(filterDestination.toLowerCase());
    return matchOrigin && matchDestination;
  });

  const handleBookRide = async (rideId: string, seats: number) => {
    try {
      await bookRide({ rideId: parseInt(rideId), seats }).unwrap();
      alert("Booking successful!");
      refetch();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book ride. Please try again.");
    }
  };

  const handleClearFilters = () => {
    setFilterOrigin("");
    setFilterDestination("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">All Available Trips</h1>
          </div>
          <p className="text-gray-600">Browse all trips created by drivers and book your ride</p>
        </div>

        {/* Filter Section */}
        <Card className="p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Trips</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Filter by origin..."
                value={filterOrigin}
                onChange={(e) => setFilterOrigin(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Filter by destination..."
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="flex-1"
                disabled={!filterOrigin && !filterDestination}
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="px-4"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {(filterOrigin || filterDestination) && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {filterOrigin && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Origin: {filterOrigin}
                </Badge>
              )}
              {filterDestination && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Destination: {filterDestination}
                </Badge>
              )}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-sm text-blue-800 mb-1">Total Available Trips</div>
            <div className="text-3xl font-bold text-blue-900">{allTrips.length}</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-sm text-green-800 mb-1">Filtered Results</div>
            <div className="text-3xl font-bold text-green-900">{filteredTrips.length}</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-sm text-purple-800 mb-1">Active Drivers</div>
            <div className="text-3xl font-bold text-purple-900">
              {new Set(allTrips.map(t => t.driver_id || t.driver_name)).size}
            </div>
          </Card>
        </div>

        {/* Trips Display */}
        <AvailableRidesDisplay 
          rides={filteredTrips} 
          isLoading={isLoading}
          onBookRide={handleBookRide}
          searchActive={!!(filterOrigin || filterDestination)}
        />
      </div>
    </div>
  );
}

export default AllDriverTripsPage;
