import { Search, MapPin, Calendar, Clock, Filter, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Badge } from "../ui/badge";

export interface SearchFilters {
  from: string;
  to: string;
  date: string;
  time?: string;
  priceMax?: number;
  seatsMin?: number;
  ratingMin?: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
  showAdvanced?: boolean;
}

export function AdvancedSearchRides({
  onSearch,
  loading = false,
  showAdvanced = false,
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    from: "",
    to: "",
    date: "",
  });
  const [expanded, setExpanded] = useState(showAdvanced);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.from && filters.to && filters.date) {
      onSearch(filters);
    }
  };

  const handleSwap = () => {
    setFilters((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Validation checks
  const isFromFilled = filters.from.trim() !== "";
  const isToFilled = filters.to.trim() !== "";
  const isDateFilled = filters.date !== "";
  const isFormValid = isFromFilled && isToFilled && isDateFilled;

  return (
    <Card className="w-full border-2 border-blue-100 bg-linear-to-br from-blue-50 to-white">
      <CardHeader className="pb-4 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-600" />
              Find Your Ride
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Search for available trips from your departure point to your destination
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Location Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-600">Step 1</Badge>
              <h3 className="text-lg font-semibold text-gray-800">Where are you going?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* From Location */}
              <div className="space-y-2">
                <Label htmlFor="from" className="text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Departure Location</span>
                  </div>
                </Label>
                <Input
                  id="from"
                  placeholder="e.g., Kigali, Huye, Musanze..."
                  value={filters.from}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, from: e.target.value }))
                  }
                  required
                  className="text-sm border-2 border-gray-200 focus:border-green-500"
                />
                {isFromFilled && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Location selected
                  </p>
                )}
                {!isFromFilled && (
                  <p className="text-xs text-gray-500">Where do you start your journey?</p>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  className="h-10 w-10 border-2 hover:bg-blue-50"
                  title="Swap departure and destination"
                >
                  <ArrowRight className="w-5 h-5 text-blue-600 rotate-90" />
                </Button>
              </div>

              {/* To Location */}
              <div className="space-y-2">
                <Label htmlFor="to" className="text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-red-600" />
                    </div>
                    <span>Destination</span>
                  </div>
                </Label>
                <Input
                  id="to"
                  placeholder="e.g., Kigali, Huye, Musanze..."
                  value={filters.to}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, to: e.target.value }))
                  }
                  required
                  className="text-sm border-2 border-gray-200 focus:border-red-500"
                />
                {isToFilled && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Destination selected
                  </p>
                )}
                {!isToFilled && (
                  <p className="text-xs text-gray-500">Where do you want to go?</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time */}
          <div className="space-y-3 pt-4 border-t-2 border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-600">Step 2</Badge>
              <h3 className="text-lg font-semibold text-gray-800">When do you want to travel?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Travel Date</span>
                  </div>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, date: e.target.value }))
                  }
                  required
                  min={minDate}
                  className="text-sm border-2 border-gray-200 focus:border-blue-500"
                />
                {isDateFilled && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Date selected
                  </p>
                )}
                {!isDateFilled && (
                  <p className="text-xs text-gray-500">Select your departure date</p>
                )}
              </div>

              {/* Time (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Departure Time (Optional)</span>
                  </div>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={filters.time || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="text-sm border-2 border-gray-200 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500">Leave blank to see all times</p>
              </div>
            </div>
          </div>

          {/* Advanced Filters Section */}
          <div className="space-y-3 pt-4 border-t-2 border-blue-100">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-600">Step 3</Badge>
                <h3 className="text-lg font-semibold text-gray-800">Refine Your Search (Optional)</h3>
              </div>
              <div className="transform transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                <Filter className="w-5 h-5 text-gray-600" />
              </div>
            </button>

            {expanded && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border-2 border-gray-200">
                <p className="text-sm text-gray-600">Narrow down your options by price, seats, and driver ratings</p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {/* Time */}
                  <div className="space-y-2">
                    <Label htmlFor="filter-time" className="text-sm font-semibold text-gray-700">
                      <Clock className="inline w-4 h-4 mr-1 text-orange-600" />
                      Departure Time
                    </Label>
                    <Input
                      id="filter-time"
                      type="time"
                      value={filters.time || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, time: e.target.value }))
                      }
                      className="text-sm border-2 border-gray-300"
                    />
                  </div>

                  {/* Max Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                      💰 Max Price (RWF)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="No limit"
                      value={filters.priceMax || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceMax: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }))
                      }
                      className="text-sm border-2 border-gray-300"
                      min="0"
                      step="500"
                    />
                  </div>

                  {/* Min Seats */}
                  <div className="space-y-2">
                    <Label htmlFor="seats" className="text-sm font-semibold text-gray-700">
                      👥 Available Seats
                    </Label>
                    <Select
                      value={String(filters.seatsMin || "")}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          seatsMin: value ? Number(value) : undefined,
                        }))
                      }
                    >
                      <SelectTrigger className="text-sm border-2 border-gray-300">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any (1+ seats)</SelectItem>
                        <SelectItem value="1">1+ seat</SelectItem>
                        <SelectItem value="2">2+ seats</SelectItem>
                        <SelectItem value="3">3+ seats</SelectItem>
                        <SelectItem value="4">4+ seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Rating */}
                  <div className="space-y-2">
                    <Label htmlFor="rating" className="text-sm font-semibold text-gray-700">
                      ⭐ Minimum Driver Rating
                    </Label>
                    <Select
                      value={String(filters.ratingMin || "")}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          ratingMin: value ? Number(value) : undefined,
                        }))
                      }
                    >
                      <SelectTrigger className="text-sm border-2 border-gray-300">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Rating</SelectItem>
                        <SelectItem value="3">3.0+ ⭐</SelectItem>
                        <SelectItem value="3.5">3.5+ ⭐</SelectItem>
                        <SelectItem value="4">4.0+ ⭐</SelectItem>
                        <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Status & Submit */}
          <div className="space-y-3 pt-4 border-t-2 border-blue-100">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Search Summary:</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className={`p-2 rounded flex items-center gap-2 ${isFromFilled ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                  {isFromFilled && <CheckCircle2 className="w-4 h-4" />}
                  {!isFromFilled && <AlertCircle className="w-4 h-4" />}
                  <span><strong>From:</strong> {filters.from || 'Not set'}</span>
                </div>
                <div className={`p-2 rounded flex items-center gap-2 ${isToFilled ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                  {isToFilled && <CheckCircle2 className="w-4 h-4" />}
                  {!isToFilled && <AlertCircle className="w-4 h-4" />}
                  <span><strong>To:</strong> {filters.to || 'Not set'}</span>
                </div>
                <div className={`p-2 rounded flex items-center gap-2 ${isDateFilled ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
                  {isDateFilled && <CheckCircle2 className="w-4 h-4" />}
                  {!isDateFilled && <AlertCircle className="w-4 h-4" />}
                  <span><strong>Date:</strong> {filters.date || 'Not set'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 h-12 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base flex items-center justify-center gap-2 rounded-lg"
              >
                <Search className="w-5 h-5" />
                {loading ? "Searching..." : "Search Available Rides"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFilters({
                    from: "",
                    to: "",
                    date: "",
                  });
                  setExpanded(false);
                }}
                className="px-6 border-2"
              >
                Clear All
              </Button>
            </div>

            {!isFormValid && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-sm text-amber-800">
                <AlertCircle className="inline w-4 h-4 mr-2" />
                Please fill in all required fields (From, To, and Date) to search
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
