import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Search, Settings2 } from "lucide-react";

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
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <Input
            placeholder="From (From City)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-white border-0"
          />
        </div>
        <div>
          <Input
            placeholder="To (Destination)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-white border-0"
          />
        </div>
        <div>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white border-0"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-white text-blue-600 hover:bg-gray-100">
          <Search className="w-4 h-4 mr-2" />
          Search Rides
        </Button>
      </div>
      <div className="flex gap-2">
        {onAdvanced && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdvanced}
            className="border-white text-white hover:bg-white/10"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        )}
      </div>
    </form>
  );
}
