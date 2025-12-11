import { Card, CardContent } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface NavigationScreenProps {
  progress: number;
}

export function NavigationScreen({ progress }: NavigationScreenProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-100 p-6 rounded-full">
            <Navigation className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Heading to Pickup</h2>
        <p className="text-gray-600 mb-8">Follow the directions on your GPS</p>
        <div className="space-y-3">
          <div className="text-4xl font-bold text-blue-600">{progress}%</div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600">en route to passenger</p>
        </div>
      </CardContent>
    </Card>
  );
}
