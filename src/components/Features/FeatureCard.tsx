import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <Card className="p-5 hover:shadow-xl hover:-translate-y-1 transition-all">
      <CardHeader>
        <div
          className={`w-14 h-14 bg-${color}-100 rounded-lg flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
