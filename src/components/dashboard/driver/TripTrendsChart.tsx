import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetDriverStatsQuery } from '../../../services/api/driverApi';
import { Skeleton } from '../../ui/skeleton';

const mockTripData = [
  { month: 'Jan', trips: 12 },
  { month: 'Feb', trips: 19 },
  { month: 'Mar', trips: 25 },
  { month: 'Apr', trips: 32 },
  { month: 'May', trips: 28 },
  { month: 'Jun', trips: 35 },
  { month: 'Jul', trips: 42 },
  { month: 'Aug', trips: 45 },
  { month: 'Sep', trips: 38 },
  { month: 'Oct', trips: 48 },
  { month: 'Nov', trips: 52 },
  { month: 'Dec', trips: 58 },
];

export function TripTrendsChart() {
  const { data: stats, isLoading, error } = useGetDriverStatsQuery();
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
            data={mockTripData}
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
