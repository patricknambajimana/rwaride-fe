import { Star } from "lucide-react";
import { Booking } from "./BookingsList";

interface RatingDisplayProps {
  booking: Booking;
}

export function RatingDisplay({ booking }: RatingDisplayProps) {
  if (!booking.rating) return null;

  return (
    <div className="mt-3 pt-3 border-t flex items-center gap-2">
      <span className="text-sm font-medium">Your rating:</span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < booking.rating!
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
