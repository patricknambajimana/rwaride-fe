import { Button } from "../ui/button";
import { Star, MessageCircle } from "lucide-react";
import { Booking } from "./BookingsList";

interface BookingActionsProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
  onRate?: (bookingId: string) => void;
  onContact?: (bookingId: string, driverId: string) => void;
  onViewReceipt?: (bookingId: string) => void;
}

export function BookingActions({
  booking,
  onCancel,
  onRate,
  onContact,
  onViewReceipt,
}: BookingActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
      {booking.status === "completed" && !booking.rating && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRate?.(booking.id)}
          className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
        >
          <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Rate Driver
        </Button>
      )}

      {booking.status !== "cancelled" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onContact?.(booking.id, booking.driverId)}
          className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
        >
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Contact
        </Button>
      )}

      {onViewReceipt && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewReceipt(booking.id)}
          className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
        >
          Receipt
        </Button>
      )}

      {booking.status === "confirmed" && onCancel && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onCancel(booking.id)}
          className="flex-1 text-xs sm:text-sm h-8 sm:h-10"
        >
          Cancel Booking
        </Button>
      )}
    </div>
  );
}
