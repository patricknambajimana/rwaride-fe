import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { BookingActions } from "./BookingActions";
import { Star, MapPin, Calendar, Clock, DollarSign, AlertCircle, CheckCircle2, Phone as PhoneIcon, Mail as MailIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export interface Booking {
  id: string;
  bookingNumber?: string;
  driverId: string;
  driverName: string;
  driverPhone?: string;
  driverEmail?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  licensePlate?: string;
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  seatsBooked?: number;
  pricePerSeat?: number;
  totalPrice?: number;
  status: "confirmed" | "completed" | "cancelled" | "pending";
  bookingDate?: string;
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
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  const handleSubmitRating = () => {
    if (ratingBooking && onRate) {
      onRate(ratingBooking, selectedRating);
      setRatingBooking(null);
      setSelectedRating(0);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-12 text-center text-gray-500">
          <p className="text-base sm:text-lg font-medium">No bookings yet</p>
          <p className="text-xs sm:text-sm mt-1">Start by searching and booking a ride</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
        >
          <CardContent className="p-3 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{booking.driverName}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {booking.bookingNumber && `Booking: ${booking.bookingNumber}`}
                </p>
              </div>
            </div>

            {/* Route Info */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">FROM</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span className="truncate">{booking.fromLocation}</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">TO</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                  <span className="truncate">{booking.toLocation}</span>
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{new Date(booking.departureDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{booking.departureTime}</span>
              </div>
              {booking.seatsBooked && (
                <Badge variant="secondary" className="text-xs">
                  {booking.seatsBooked} seat{booking.seatsBooked > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Price Info */}
            {booking.totalPrice && (
              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Total Price:</span>
                <span className="text-base sm:text-lg font-bold text-blue-600 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                  {booking.totalPrice} RWF
                </span>
              </div>
            )}

            {/* Expanded Driver Contact & Actions */}
            {expandedBooking === booking.id && (
              <div className="space-y-3 sm:space-y-4 border-t pt-3 sm:pt-4">
                {/* Driver Contact Info */}
                {(booking.driverPhone || booking.driverEmail) && (
                  <div className="bg-green-50 border-2 border-green-200 p-3 sm:p-4 rounded-lg space-y-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Driver Contact:</p>
                    {booking.driverPhone && (
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <a
                          href={`tel:${booking.driverPhone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-green-600 hover:underline font-medium text-xs sm:text-sm truncate"
                        >
                          {booking.driverPhone}
                        </a>
                      </div>
                    )}
                    {booking.driverEmail && (
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <a
                          href={`mailto:${booking.driverEmail}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-green-600 hover:underline font-medium text-xs sm:text-sm truncate"
                        >
                          {booking.driverEmail}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Vehicle Info */}
                {(booking.vehicleMake || booking.vehicleModel || booking.licensePlate) && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Vehicle:</p>
                    <p className="text-sm text-gray-600">
                      {booking.vehicleMake} {booking.vehicleModel}
                    </p>
                    {booking.licensePlate && (
                      <p className="text-sm text-gray-600">
                        License: <span className="font-mono font-semibold">{booking.licensePlate}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {booking.status !== "cancelled" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContact?.(booking.id, booking.driverId);
                      }}
                      className="flex-1"
                    >
                      💬 Message
                    </Button>
                  )}
                  
                  {booking.status === "completed" && !booking.rating && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRatingBooking(booking.id);
                      }}
                      className="flex-1"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Rate Driver
                    </Button>
                  )}

                  {booking.status === "pending" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCancelingId(booking.id);
                      }}
                      className="flex-1"
                    >
                      Cancel Booking
                    </Button>
                  )}

                  {booking.rating && (
                    <div className="flex items-center gap-1 px-3 py-2 bg-yellow-50 rounded">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (booking.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {booking.rating}.0
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {expandedBooking !== booking.id && (
              <p className="text-xs text-gray-500 text-center">Click to expand details</p>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelingId} onOpenChange={(open) => !open && setCancelingId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this booking? You may be eligible for a refund based on cancellation policies.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel onClick={() => setCancelingId(null)}>
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onCancel?.(cancelingId!);
                setCancelingId(null);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Booking
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rating Dialog */}
      {ratingBooking && (
        <AlertDialog open={!!ratingBooking} onOpenChange={(open) => !open && setRatingBooking(null)}>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogTitle>Rate Your Ride</AlertDialogTitle>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">How would you rate your experience with this trip?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= selectedRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {selectedRating > 0 && (
                <p className="text-center text-sm font-medium">
                  You rated: {selectedRating} star{selectedRating > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <AlertDialogCancel onClick={() => setRatingBooking(null)}>
                Skip
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmitRating}
                disabled={selectedRating === 0}
              >
                Submit Rating
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
