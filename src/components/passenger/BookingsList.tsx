import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { BookingCard } from "./BookingCard";
import { BookingActions } from "./BookingActions";
import { RatingDisplay } from "./RatingDisplay";
import { CancelDialog } from "./CancelDialog";
import { RatingDialog } from "./RatingDialog";

export interface Booking {
  id: string;
  bookingNumber: string;
  driverId: string;
  driverName: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  seatsBooked: number;
  pricePerSeat: number;
  totalPrice: number;
  status: "confirmed" | "completed" | "cancelled";
  bookingDate: string;
  rating?: number;
  notes?: string;
}

interface BookingListProps {
  bookings: Booking[];
  onCancel?: (bookingId: string) => void;
  onRate?: (bookingId: string, rating: number) => void;
  onContact?: (bookingId: string, driverId: string) => void;
  onViewReceipt?: (bookingId: string) => void;
}

export function BookingsList({
  bookings,
  onCancel,
  onRate,
  onContact,
  onViewReceipt,
}: BookingListProps) {
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [ratingBooking, setRatingBooking] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmitRating = () => {
    if (ratingBooking && onRate) {
      onRate(ratingBooking, selectedRating);
      setRatingBooking(null);
      setSelectedRating(0);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No bookings yet</p>
          <p className="text-sm mt-1">Start by searching and booking a ride</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id}>
          <BookingCard booking={booking} />
          <Card key={`${booking.id}-actions`} className="mt-0 rounded-t-none border-t-0">
            <CardContent className="p-4 md:p-6">
              <BookingActions
                booking={booking}
                onCancel={() => setCancelingId(booking.id)}
                onRate={() => setRatingBooking(booking.id)}
                onContact={onContact}
                onViewReceipt={onViewReceipt}
              />
              <RatingDisplay booking={booking} />
            </CardContent>
          </Card>
        </div>
      ))}

      <CancelDialog
        open={!!cancelingId}
        onOpenChange={(open) => !open && setCancelingId(null)}
        onConfirm={() => {
          onCancel?.(cancelingId!);
          setCancelingId(null);
        }}
      />

      <RatingDialog
        open={!!ratingBooking}
        onOpenChange={(open) => !open && setRatingBooking(null)}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}
