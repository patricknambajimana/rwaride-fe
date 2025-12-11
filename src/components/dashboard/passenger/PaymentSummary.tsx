import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DollarSign } from "lucide-react";
import { Button } from "../../ui/button";

interface Props {
  thisMonth: number | string;
  pending: number | string;
  onViewDetails?: () => void;
}

export function PaymentSummary({ thisMonth, pending, onViewDetails }: Props) {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs opacity-80">This Month</p>
          <p className="text-2xl font-bold">{thisMonth}</p>
        </div>
        <div className="pt-3 border-t border-white/20">
          <p className="text-xs opacity-80">Pending</p>
          <p className="text-lg font-semibold">{pending}</p>
        </div>
        <Button
          onClick={onViewDetails}
          className="w-full bg-white text-purple-600 hover:bg-gray-100 text-sm mt-4"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
