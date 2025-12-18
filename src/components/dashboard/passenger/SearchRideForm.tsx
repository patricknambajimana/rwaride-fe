import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Search, Settings2, Loader } from "lucide-react";

interface Props {
  from: string;
  to: string;
  date: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDate: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAdvanced?: () => void;
  loading: boolean;
}

export function SearchRideForm({
  from,
  to,
  date,
  setFrom,
  setTo,
  setDate,
  onSubmit,
  onAdvanced,
  loading,
}: Props) {
  // Loading is controlled by parent via `loading` prop
  const isLoading = loading;

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;

    // Delegate actual search to parent handler
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Input
            type="text"
            placeholder="From (e.g., Kigali, Huye)"
            value={from}
            onChange={handleFromChange}
            className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="To (e.g., Rubavu, Musanze)"
            value={to}
            onChange={handleToChange}
            className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="bg-white border-2 border-gray-200 text-black focus:border-blue-500 focus:outline-none"
            disabled={isLoading}
          />
        </div>
        <div>
          <Button 
            type="submit" 
            disabled={isLoading || !from || !to}
            className="bg-black text-white hover:bg-green-700 disabled:bg-gray-400 w-full"
          >
            {isLoading ? (
              <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Searching...
              </>
            ) : (
              <>
          <Search className="w-4 h-4 mr-2" />
          Search Rides
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <p className="text-xs text-white/80">
          💡 We'll show trips matching or passing through your route
        </p>
        {onAdvanced && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdvanced}
            disabled={isLoading}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        )}
      </div>
    </form>
  );
}
