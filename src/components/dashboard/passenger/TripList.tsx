import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock, MessageCircle } from "lucide-react";

export interface Trip {
  id: string;
  driver_name?: string;
  driver_rating?: number;
  from_location?: string;
  to_location?: string;
  departure_date?: string;
  departure_time?: string;
  available_seats?: number;
  driver_id?: string;
}

interface Props {
  trips: Trip[];
  onBookTrip: (id: string) => void;
  openChat: (trip: Trip) => void;
}

export function TripList({ trips, onBookTrip, openChat }: Props) {
  if (!trips || trips.length === 0) return null;

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {trip.driver_name?.[0] || "D"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{trip.driver_name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {trip.driver_rating || "New"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600 flex gap-2">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="text-sm">From</p>
                      <p>{trip.from_location}</p>
                    </div>
                  </div>
                  <div className="text-gray-600 flex gap-2">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="text-sm">To</p>
                      <p>{trip.to_location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(trip.departure_date || "").toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{trip.departure_time}</span>
                  </div>
                  <Badge variant="secondary">
                    {trip.available_seats} seats
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => onBookTrip(trip.id)}>Book Ride</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openChat(trip)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
