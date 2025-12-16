export interface SearchTripsParams {
  origin: string;
  destination: string;
  date?: string;
}

export interface TripSearchResponse {
  id: string;
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  // Add other fields as needed
}

export interface BookingResponse {
  id: string;
  rideId: string;
  passengerId: string;
  seats: number;
  status: string;
  totalPrice: number;
  rating?: number;
  // Add other fields as needed
}