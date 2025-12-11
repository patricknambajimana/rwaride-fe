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
    <div className="flex flex-col md:flex-row gap-2 pt-4 border-t">
      {booking.status === "completed" && !booking.rating && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRate?.(booking.id)}
          className="flex-1"
        >
          <Star className="w-4 h-4 mr-1" />
          Rate Driver
        </Button>
      )}

      {booking.status !== "cancelled" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onContact?.(booking.id, booking.driverId)}
          className="flex-1"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          Contact
        </Button>
      )}

      {onViewReceipt && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewReceipt(booking.id)}
          className="flex-1"
        >
          Receipt
        </Button>
      )}

      {booking.status === "confirmed" && onCancel && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onCancel(booking.id)}
          className="flex-1"
        >
          Cancel Booking
        </Button>
      )}
    </div>
  );
}
