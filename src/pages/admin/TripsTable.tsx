import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Car } from 'lucide-react';

interface Trip {
  id: string;
  driver_name: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  available_seats: number;
  status: string;
}

interface TripsTableProps {
  trips: Trip[];
  loading?: boolean;
}

export function TripsTable({ trips, loading = false }: TripsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Trips</CardTitle>
        <CardDescription>Monitor all trips on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No trips found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{trip.driver_name?.[0] || 'D'}</AvatarFallback>
                        </Avatar>
                        <span>{trip.driver_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {trip.from_location} → {trip.to_location}
                    </TableCell>
                    <TableCell>{new Date(trip.departure_date).toLocaleDateString()}</TableCell>
                    <TableCell>{trip.available_seats}</TableCell>
                    <TableCell>
                      <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                        {trip.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
