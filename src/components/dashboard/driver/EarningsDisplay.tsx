import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface EarningsData {
  totalEarnings: number;
  weeklyEarnings: number;
  totalRides: number;
  averagePerRide: number;
}

interface EarningsDisplayProps {
  data?: EarningsData;
}

export function EarningsDisplay({ data }: EarningsDisplayProps) {
  const earnings = data || {
    totalEarnings: 250000,
    weeklyEarnings: 45000,
    totalRides: 120,
    averagePerRide: 2083,
  };

  return (
    <Card className="w-full shadow-lg border-2 bg-linear-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-linear-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription className="text-green-50">
          Your earnings summary
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Total & Weekly */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-green-600">
              {earnings.totalEarnings.toLocaleString()} RWF
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">This Week</p>
            <p className="text-3xl font-bold text-blue-600">
              {earnings.weeklyEarnings.toLocaleString()} RWF
            </p>
          </div>
        </div>

        {/* Rides & Average */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm mb-1">Total Rides</p>
            <p className="text-3xl font-bold text-purple-600">{earnings.totalRides}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-gray-600 text-sm mb-1">Average Per Ride</p>
            <p className="text-3xl font-bold text-orange-600">
              {earnings.averagePerRide.toLocaleString()} RWF
            </p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-900">Payment Status</p>
            <p className="text-sm text-green-700">Your earnings will be paid on Friday</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
