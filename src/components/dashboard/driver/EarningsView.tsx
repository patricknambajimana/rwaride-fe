import { EarningsDisplay } from './EarningsDisplay';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { TrendingUp, DollarSign, Calendar, Download } from 'lucide-react';
import { Button } from '../../ui/button';

interface EarningsSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  pendingPayout: number;
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: 'completed' | 'pending';
  rideId: string;
}

const mockEarnings: EarningsSummary = {
  today: 12500,
  thisWeek: 78000,
  thisMonth: 245000,
  total: 1250000,
  pendingPayout: 45000,
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-12-17 10:30 AM',
    type: 'Ride Payment',
    amount: 5000,
    status: 'completed',
    rideId: 'R001',
  },
  {
    id: '2',
    date: '2025-12-17 09:15 AM',
    type: 'Ride Payment',
    amount: 3500,
    status: 'completed',
    rideId: 'R002',
  },
  {
    id: '3',
    date: '2025-12-16 05:45 PM',
    type: 'Ride Payment',
    amount: 7500,
    status: 'pending',
    rideId: 'R003',
  },
];

export function EarningsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Earnings</h2>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today</p>
              <p className="text-2xl font-bold text-gray-900">{mockEarnings.today.toLocaleString()} RWF</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{mockEarnings.thisWeek.toLocaleString()} RWF</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{mockEarnings.thisMonth.toLocaleString()} RWF</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Payout</p>
              <p className="text-2xl font-bold text-orange-600">{mockEarnings.pendingPayout.toLocaleString()} RWF</p>
            </div>
            <Badge className="bg-orange-500 text-white">Pending</Badge>
          </div>
        </Card>
      </div>

      {/* Main Earnings Display */}
      <EarningsDisplay
        thisMonth={mockEarnings.thisMonth}
        lastMonth={215000}
        currency="RWF"
      />

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ride ID</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">#{transaction.rideId}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-right text-green-600">
                    +{transaction.amount.toLocaleString()} RWF
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      className={
                        transaction.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 text-white'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
