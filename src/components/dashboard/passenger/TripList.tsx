import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Star, MapPin, Calendar, Clock, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";

export interface Trip {
  id: string;
  driver_name?: string;
  driver_rating?: number;
  driver_phone?: string;
  driver_email?: string;
  from_location?: string;
  to_location?: string;
  departure_date?: string;
  departure_time?: string;
  available_seats?: number;
  driver_id?: string;
  price_per_seat?: number;
  match_type?: 'exact' | 'partial' | 'nearby';
  origin?: string;
  destination?: string;
}

interface Props {
  trips: Trip[];
  onBookTrip: (id: string) => void;
  openChat: (trip: Trip) => void;
}

export function TripList({ trips, onBookTrip, openChat }: Props) {
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);

  if (!trips || trips.length === 0) return null;

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card 
          key={trip.id}
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                {/* Driver Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {trip.driver_name?.[0] || "D"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{trip.driver_name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {trip.driver_rating || "New"} rating
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {trip.available_seats} seats
                  </Badge>
                </div>

                {/* Route Info */}
                <div className="space-y-2">
                  {trip.match_type && (
                    <Badge 
                      variant={trip.match_type === 'exact' ? 'default' : 'secondary'}
                      className={trip.match_type === 'exact' ? 'bg-green-600' : 'bg-blue-500'}
                    >
                      {trip.match_type === 'exact' ? '✓ Exact Match' : trip.match_type === 'partial' ? 'Similar Route' : 'Nearby Route'}
                    </Badge>
                  )}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded">
                    <div className="text-gray-600 flex gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">FROM</p>
                        <p className="text-sm font-medium">{trip.from_location || trip.origin}</p>
                      </div>
                    </div>
                    <div className="text-gray-600 flex gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">TO</p>
                        <p className="text-sm font-medium">{trip.to_location || trip.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time & Price */}
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(trip.departure_date || "").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{trip.departure_time}</span>
                  </div>
                  {trip.price_per_seat && (
                    <Badge variant="secondary">
                      {trip.price_per_seat} RWF/seat
                    </Badge>
                  )}
                </div>

                {/* Expanded Driver Contact Info */}
                {expandedTrip === trip.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-blue-50 p-3 rounded space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Driver Contact:</p>
                    {trip.driver_phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <a href={`tel:${trip.driver_phone}`} className="text-blue-600 hover:underline">
                          {trip.driver_phone}
                        </a>
                      </div>
                    )}
                    {trip.driver_email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href={`mailto:${trip.driver_email}`} className="text-blue-600 hover:underline">
                          {trip.driver_email}
                        </a>
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-2">Click the card to hide contact info</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 ml-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookTrip(trip.id);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Book Ride
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openChat(trip);
                  }}
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
