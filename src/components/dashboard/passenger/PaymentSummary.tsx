import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DollarSign } from "lucide-react";
import { Button } from "../../ui/button";

interface Props {
  thisMonth: number | string;
  pending: number | string;
  onViewDetails?: () => void;
  onPayDriver?: () => void;
}

export function PaymentSummary({ thisMonth, pending, onViewDetails, onPayDriver }: Props) {
  return (
    <Card className="bg-linear-to-br from-purple-600 to-purple-700 text-white border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs sm:text-sm opacity-80">This Month</p>
          <p className="text-2xl sm:text-3xl font-bold">{thisMonth}</p>
        </div>
        <div className="pt-3 border-t border-white/20">
          <p className="text-xs sm:text-sm opacity-80">Pending</p>
          <p className="text-lg sm:text-xl font-semibold">{pending}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          <Button
            onClick={onViewDetails}
            className="w-full bg-white text-purple-700 hover:bg-gray-100 text-sm"
          >
            View Details
          </Button>
          <Button
            onClick={onPayDriver}
            className="w-full bg-white/10 hover:bg-white/20 text-white text-sm"
          >
            Pay Driver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
