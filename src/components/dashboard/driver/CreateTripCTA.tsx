import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface CreateTripCTAProps {
  onClick: () => void;
}

export function CreateTripCTA({ onClick }: CreateTripCTAProps) {
  return (
    <Card className="border-2 border-blue-500">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create a New Trip</CardTitle>
        <CardDescription>Start earning by offering rides to passengers</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button size="lg" onClick={onClick} className="w-full max-w-md">
          <Plus className="w-5 h-5 mr-2" />
          Create Trip
        </Button>
      </CardContent>
    </Card>
  );
}
