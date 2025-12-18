import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetDriverRidesQuery } from '../../../services/api/ridesApi';
import { Skeleton } from '../../ui/skeleton';
import { useMemo } from 'react';

export function TripTrendsChart() {
  const { data: rides = [], isLoading, error } = useGetDriverRidesQuery();

  // Process rides to get monthly trip counts
  const tripData = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    // Initialize counts for all 12 months
    const monthCounts: { [key: string]: number } = {};
    monthNames.forEach(month => {
      monthCounts[month] = 0;
    });

    // Count trips by month
    rides.forEach((ride: any) => {
      const rideDate = new Date(ride.departure_time || ride.created_at);
      if (rideDate.getFullYear() === currentYear) {
        const monthName = monthNames[rideDate.getMonth()];
        monthCounts[monthName]++;
      }
    });

    // Convert to chart format
    return monthNames.map(month => ({
      month,
      trips: monthCounts[month]
    }));
  }, [rides]);
  return (
    <Card className="w-150">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Trip Trends</CardTitle>
        <p className="text-sm text-gray-600">Total trips created by month</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : error ? (
          <div className="flex items-center justify-center h-80 text-red-500">
            Failed to load trip trends
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={tripData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => [`${value} trips`, 'Trips']}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="trips"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Trips Created"
            />
          </LineChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
