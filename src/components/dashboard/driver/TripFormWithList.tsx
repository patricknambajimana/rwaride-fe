import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CreateRideForm } from './CreateRideForm';
import { RideHistoryList } from './RideHistoryList';
import { TrendingUp } from 'lucide-react';

export function TripFormWithList() {
  return (
    <div className="space-y-6">
      {/* Form on top */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-lg">
          <CardTitle className="text-lg">Create Trip</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CreateRideForm vehicleId={1} />
        </CardContent>
      </Card>

      {/* List below */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <CardTitle className="text-lg">Your Trips</CardTitle>
          </div>
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-200">Live</Badge>
        </CardHeader>
        <CardContent className="p-4">
          <RideHistoryList />
        </CardContent>
      </Card>
    </div>
  );
}
