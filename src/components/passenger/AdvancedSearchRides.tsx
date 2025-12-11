import { Search, MapPin, Calendar, Clock, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

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

  return (
    <Card className="w-full">
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From */}
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium">
                <MapPin className="inline w-4 h-4 mr-1" />
                From
              </Label>
              <Input
                id="from"
                placeholder="Departure location"
                value={filters.from}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, from: e.target.value }))
                }
                required
                className="text-sm"
              />
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium">
                <MapPin className="inline w-4 h-4 mr-1" />
                To
              </Label>
              <div className="relative">
                <Input
                  id="to"
                  placeholder="Destination"
                  value={filters.to}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, to: e.target.value }))
                  }
                  required
                  className="text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSwap}
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  title="Swap locations"
                >
                  ⇅
                </Button>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                <Calendar className="inline w-4 h-4 mr-1" />
                Date
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
                className="text-sm"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setExpanded(!expanded)}
                className="h-10 w-10"
                title="Toggle filters"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {expanded && (
            <div className="pt-4 border-t space-y-4">
              <h4 className="text-sm font-semibold text-gray-700">
                Advanced Filters
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Time */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Departure Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={filters.time || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="text-sm"
                  />
                </div>

                {/* Max Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Max Price ($)
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
                    className="text-sm"
                    min="0"
                    step="5"
                  />
                </div>

                {/* Min Seats */}
                <div className="space-y-2">
                  <Label htmlFor="seats" className="text-sm font-medium">
                    Min Seats
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
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Min Rating */}
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-sm font-medium">
                    Min Rating ★
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
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="3">3.0+</SelectItem>
                      <SelectItem value="3.5">3.5+</SelectItem>
                      <SelectItem value="4">4.0+</SelectItem>
                      <SelectItem value="4.5">4.5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFilters((prev) => ({
                      from: prev.from,
                      to: prev.to,
                      date: prev.date,
                    }));
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
