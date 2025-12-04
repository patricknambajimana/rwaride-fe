import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Props {
  from: string;
  to: string;
  date: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDate: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function SearchForm({
  from,
  to,
  date,
  setFrom,
  setTo,
  setDate,
  onSubmit,
  loading,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label>From</Label>
          <Input value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <Label>To</Label>
          <Input value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        <Search className="w-4 h-4 mr-2" />
        {loading ? "Searching..." : "Search Trips"}
      </Button>
    </form>
  );
}
