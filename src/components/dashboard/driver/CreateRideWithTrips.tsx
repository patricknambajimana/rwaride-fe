import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { CreateRideForm } from './CreateRideForm';
import { useGetDriverRidesQuery } from '../../../services/api/ridesApi';
import { MapPin, Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export function CreateRideWithTrips() {
  const { data: rides, isLoading, error } = useGetDriverRidesQuery();

  const recentRides = rides?.slice(0, 5) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Compact Form */}
      <div className="lg:col-span-1">
        <Card className="shadow-md border-0 sticky top-4">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-lg">
            <CardTitle className="text-lg">Quick Trip</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <CreateRideForm vehicleId={1} />
          </CardContent>
        </Card>
      </div>

      {/* Trips List */}
      <div className="lg:col-span-2">
        <Card className="shadow-md border-0 h-fit">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <CardTitle className="text-lg">Your Trips</CardTitle>
            </div>
            <Badge className="bg-white text-blue-600">{recentRides.length}</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="p-6 text-center text-gray-500">
                <p>Failed to load trips</p>
              </div>
            ) : recentRides.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>No trips created yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentRides.map((ride: any, index: number) => (
                  <div key={ride.id || index} className="p-4 hover:bg-gray-50 transition">
                    {/* Route */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span>{ride.origin}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mt-1">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{ride.destination}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {ride.total_seats} seats
                      </Badge>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        <span>
                          {ride.departure_time
                            ? format(new Date(ride.departure_time), 'MMM dd')
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        <span>
                          {ride.departure_time
                            ? format(new Date(ride.departure_time), 'HH:mm')
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{ride.available_seats || 0} available</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          ride.status === 'active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : ride.status === 'completed'
                            ? 'bg-gray-50 text-gray-700 border-gray-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {ride.status || 'pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
