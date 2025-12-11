import { Card, CardContent } from "../../ui/card";

interface StatsItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface Props {
  stats: StatsItem[];
}

export function DashboardStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-xs text-gray-600">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
