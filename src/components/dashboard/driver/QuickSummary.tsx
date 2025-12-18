import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TrendingUp, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface QuickSummaryItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

interface QuickSummaryProps {
  items?: QuickSummaryItem[];
}

const defaultItems: QuickSummaryItem[] = [
  {
    label: 'Active Now',
    value: 3,
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700',
    trend: '+2 since yesterday',
  },
  {
    label: 'Pending Requests',
    value: 5,
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'bg-orange-100 text-orange-700',
    trend: 'Awaiting response',
  },
  {
    label: 'Distance Today',
    value: '245 km',
    icon: <MapPin className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-700',
    trend: 'vs 198 km yesterday',
  },
  {
    label: 'Revenue Growth',
    value: '+12%',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'bg-purple-100 text-purple-700',
    trend: 'This month',
  },
];

export function QuickSummary({ items = defaultItems }: QuickSummaryProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick Summary</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Today's Performance</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between pb-4 border-b last:border-b-0">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  {item.trend && (
                    <p className="text-xs text-gray-500 mt-1">{item.trend}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
