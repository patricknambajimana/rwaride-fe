import { Card, CardContent } from '@/components/ui/card';
import { Star, Users } from 'lucide-react';

interface DashboardStatsProps {
  totalTrips: number;
  earnings: number;
}

export function DashboardStats({ totalTrips, earnings }: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Trips</p>
            <p className="text-3xl font-bold text-blue-600">{totalTrips}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Earnings</p>
            <p className="text-3xl font-bold text-green-600">{earnings} RWF</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Rating</p>
            <div className="flex items-center justify-center gap-1">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <p className="text-3xl font-bold">4.8</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RecentTripsCard({ trips }: { trips: any[] }) {
  if (trips.length === 0) return null;

  return (
    <Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Your Recent Trips</h3>
          <div className="space-y-4">
            {trips.slice(0, 5).map((trip) => (
              <div key={trip.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {trip.from_location} → {trip.to_location}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(trip.departure_date).toLocaleDateString()} at{" "}
                      {trip.departure_time}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      trip.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
                {trip.bookings && trip.bookings.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <Users className="w-4 h-4 inline mr-1" />
                    {trip.bookings.length} passenger
                    {trip.bookings.length > 1 ? "s" : ""} booked
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
